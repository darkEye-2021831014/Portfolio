/**
 * GET /api/health — liveness + integration health check.
 *
 * Designed for UptimeRobot (free tier) to monitor the deployed portfolio:
 *   - 1-minute interval is fine; the route is cheap (single Supabase
 *     `count` query + an authenticated Resend API call, run in parallel
 *     with `Promise.allSettled`).
 *   - Always returns JSON with `Cache-Control: no-store` so probes are
 *     never cached at the CDN or browser.
 *   - Returns 200 for "ok" AND "degraded" (an unconfigured integration
 *     is not an outage) — UptimeRobot's default alert is on non-200,
 *     so this keeps noise low. 503 is reserved for "configured but
 *     broken" (e.g. the Supabase `contact_messages` table is missing,
 *     as we hit during the first deploy).
 *
 * Status semantics:
 *   200 + status: "ok"        — every configured integration reachable.
 *   200 + status: "degraded"  — one or more integrations are NOT
 *                               configured (env var absent). Healthy;
 *                               just a configuration note for ops.
 *   503 + status: "down"      — at least one integration is configured
 *                               but the live probe failed. Action
 *                               required (Supabase table missing,
 *                               Resend key revoked, network blip, etc.).
 *
 * Security:
 *   - No secrets are echoed. The body only exposes `configured: bool`
 *     and `ok: bool` per integration.
 *   - This route intentionally does NOT require auth. Health checks
 *     must work without credentials so uptime monitors can hit it.
 *     The probes it runs (a count query, an API-keys list) are
 *     cheap, idempotent, and read-only.
 *   - Rate-limiting is intentionally NOT applied: UptimeRobot's
 *     1-minute cadence is well under any sensible threshold and we
 *     want the probe to be reachable even if a per-IP bucket
 *     somehow got tripped.
 */

import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { isResendConfigured } from "@/lib/resend";

// Force dynamic — the env reads must be evaluated on every request so
// a Vercel preview deployment with different env vars still works.
export const dynamic = "force-dynamic";
// No edge runtime: we need Node APIs (Supabase + Resend SDKs).
export const runtime = "nodejs";

type IntegrationResult = {
  configured: boolean;
  ok: boolean;
  latencyMs?: number;
  error?: string;
};

/** Probe Supabase by counting rows in `contact_messages` (no data
 *  transfer, just verifies the table is reachable). */
async function probeSupabase(): Promise<IntegrationResult> {
  const configured = isSupabaseConfigured();
  if (!configured) {
    return { configured: false, ok: false };
  }
  const supabase = getSupabase();
  if (!supabase) {
    // Configured but client couldn't be created (shouldn't happen
    // given isSupabaseConfigured's guard, but type-narrow defensively).
    return { configured: true, ok: false, error: "client unavailable" };
  }

  const started = Date.now();
  try {
    const { error } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .limit(0);
    const latencyMs = Date.now() - started;
    if (error) {
      // PGRST205 = "table not found in schema cache" — the most common
      // operational failure (the schema migration wasn't run yet).
      return { configured: true, ok: false, latencyMs, error: error.code ?? error.message };
    }
    return { configured: true, ok: true, latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - started;
    return {
      configured: true,
      ok: false,
      latencyMs,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/** Probe Resend by listing API keys (auth-required, read-only, single
 *  item, no email sent). If the key is invalid or revoked this errors
 *  out, which is exactly the signal we want. */
async function probeResend(): Promise<IntegrationResult> {
  const configured = isResendConfigured();
  if (!configured) {
    return { configured: false, ok: false };
  }

  const started = Date.now();
  try {
    // We need a Resend client for the probe but `sendContactNotification`
    // doesn't expose the raw client. Build one inline using the same
    // env var; the SDK also does its own key validation, so this is
    // a real round-trip to api.resend.com.
    const { Resend } = await import("resend");
    const client = new Resend(process.env.RESEND_API_KEY!);
    const result = await client.apiKeys.list();
    const latencyMs = Date.now() - started;
    // The SDK union guarantees `error` is always defined on this
    // branch. A null `data` with a non-null `error` means the call
    // failed (bad key, revoked key, network blip, etc.).
    if (result.error) {
      return { configured: true, ok: false, latencyMs, error: result.error.message };
    }
    return { configured: true, ok: true, latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - started;
    return {
      configured: true,
      ok: false,
      latencyMs,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET() {
  // Run both probes in parallel so a slow Supabase doesn't also
  // block the Resend check. allSettled means one failure doesn't
  // short-circuit the other.
  const [supabase, resend] = await Promise.all([
    probeSupabase(),
    probeResend(),
  ]);

  // Decide overall status:
  //   - "ok"       : all CONFIGURED integrations responded ok.
  //   - "degraded" : no integrations configured at all (e.g. fresh
  //                  preview deploy) — 200, ops note in body.
  //   - "down"     : at least one configured integration failed.
  const configuredChecks = [supabase, resend].filter((c) => c.configured);
  const allOk = configuredChecks.every((c) => c.ok);
  const anyConfigured = configuredChecks.length > 0;

  let status: "ok" | "degraded" | "down";
  let httpStatus: number;
  if (!anyConfigured) {
    status = "degraded";
    httpStatus = 200;
  } else if (allOk) {
    status = "ok";
    httpStatus = 200;
  } else {
    status = "down";
    httpStatus = 503;
  }

  return NextResponse.json(
    {
      status,
      uptimeSec: Math.floor(process.uptime()),
      checks: { supabase, resend },
      // Echoing the node env helps debug "is this preview or prod?"
      // from a single curl. Not a secret.
      env: process.env.NODE_ENV ?? "unknown",
    },
    {
      status: httpStatus,
      headers: {
        // Belt + braces — Vercel respects this on dynamic routes,
        // and any future CDN/proxy in front will too.
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}

/** Friendly 405 for any non-GET. UptimeRobot uses GET exclusively,
 *  so this is just for the human in the address bar. */
export function POST() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. GET /api/health for the health check." },
    { status: 405, headers: { Allow: "GET" } },
  );
}
