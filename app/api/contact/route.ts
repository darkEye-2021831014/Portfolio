/**
 * POST /api/contact — contact form submission.
 *
 * Stack:  Next.js route handler (App Router).
 * Storage: Supabase (server-side, service-role key) — optional, see below.
 * Email:   Resend (optional, free tier) — fire-and-forget.
 *
 * The handler is **resilient by design**: the form submission succeeds
 * even if Supabase or Resend is unconfigured, so the public-facing demo
 * works out-of-the-box on a fresh `git clone`. When the optional services
 * are absent, the message is dropped and a `success: true,
 * delivered: false` response is returned. The user never sees a server
 * error caused by missing third-party credentials.
 *
 * Spam defences:
 *   1. **Honeypot field** (`honey`) — a hidden input that real users never
 *      fill. Any non-empty value is a 100% bot signal and we return 200
 *      to the bot without persisting (so the bot doesn't retry).
 *   2. **Per-IP rate limit** — 5 requests per IP per 10 minutes via an
 *      in-process Map. For a single-instance deploy this is sufficient.
 *      Vercel's edge network means a single user can occasionally hit
 *      different function instances; the limit is therefore a soft cap.
 *   3. **zod validation** — rejects malformed payloads before any work.
 *
 * Security:
 *   - The Supabase service role key is read from `SUPABASE_SERVICE_ROLE_KEY`
 *     (no `NEXT_PUBLIC_` prefix) and is only ever read on the server.
 *   - We do not echo the user-supplied message back in the response.
 *   - We capture the request IP and user-agent for spam triage.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { isResendConfigured, sendContactNotification } from "@/lib/resend";
import { CONTACT } from "@/content";

/* ------------------------------------------------------------------ */
/*  Validation                                                          */
/* ------------------------------------------------------------------ */

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(3, "Please enter your email.")
    .max(320, "Email is too long.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long.")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Message is too long."),
  // Honeypot. Real users never see this input; bots auto-fill it.
  honey: z.string().optional(),
});

/* ------------------------------------------------------------------ */
/*  Rate limiting                                                       */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function clientKey(req: NextRequest): string {
  // x-forwarded-for is the standard reverse-proxy header. Vercel sets
  // x-real-ip as a backup. We trust the first hop from x-forwarded-for
  // (the connecting client) because Next.js apps are never exposed
  // directly to the internet in production.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function checkRate(key: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  // 1. Rate limit by client IP.
  const ip = clientKey(req);
  const rl = checkRate(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Too many requests. Please wait a few minutes before trying again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      },
    );
  }

  // 2. Parse JSON body.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // 3. zod validation. `safeParse` returns a structured result we can
  //    surface to the form for inline per-field error display.
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        success: false,
        error: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  // 4. Honeypot. If `honey` is non-empty the submission is from a bot.
  //    We return 200 so the bot doesn't retry, but skip persistence.
  if (parsed.data.honey && parsed.data.honey.length > 0) {
    return NextResponse.json(
      { success: true, delivered: false, stored: false },
      { status: 200 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? null;

  // 5. Persist to Supabase (optional). When unconfigured we return
  //    `stored: false` so the UI can show a non-blocking notice.
  let stored = false;
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject ?? null,
      message,
      ip: ip === "unknown" ? null : ip,
      user_agent: userAgent,
      honey: "",
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error("[supabase] contact insert failed:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't save your message right now. Please email me directly using the address in the Contact section.",
        },
        { status: 503 },
      );
    }
    stored = true;
  }

  // 6. Optional Resend notification. We never block the response on this.
  let emailed = false;
  if (isResendConfigured()) {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || CONTACT.email;
    emailed = await sendContactNotification({
      from: fromEmail,
      to: toEmail,
      name,
      email,
      subject: subject ?? "",
      message,
    });
  }

  return NextResponse.json(
    {
      success: true,
      stored,
      emailed,
      supabaseConfigured: isSupabaseConfigured(),
      resendConfigured: isResendConfigured(),
    },
    { status: 200 },
  );
}

// Surface a friendly error for GETs so curious devs see a real message
// instead of a 405. Browsers that hit /api/contact directly (e.g. via
// the address bar) get this.
export function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed. POST a JSON body to submit the contact form.",
    },
    { status: 405, headers: { Allow: "POST" } },
  );
}
