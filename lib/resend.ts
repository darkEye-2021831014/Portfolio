/**
 * Resend email client — optional.
 *
 * The contact form works without Resend. If `RESEND_API_KEY` is set we
 * additionally forward a copy of the submission to the address configured
 * in `RESEND_TO_EMAIL` (defaulting to CONTACT.email from /content) using
 * the free tier (3,000 emails / month, 100 / day).
 *
 * Errors are swallowed: the contact submission itself is already persisted
 * to Supabase, so a Resend outage must not block the user-facing success
 * path. We log the error to the server console instead.
 */

import { Resend } from "resend";

let cached: Resend | null = null;

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getClient(): Resend | null {
  if (!isResendConfigured()) return null;
  if (cached) return cached;
  cached = new Resend(process.env.RESEND_API_KEY!);
  return cached;
}

type ContactEmail = {
  from: string;
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Send the notification email. Returns true on success, false on any
 * failure (including "not configured" — caller treats both the same).
 */
export async function sendContactNotification(
  payload: ContactEmail,
): Promise<boolean> {
  const client = getClient();
  if (!client) return false;

  try {
    const result = await client.emails.send({
      from: payload.from,
      to: payload.to,
      replyTo: payload.email,
      subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : `[Portfolio] New message from ${payload.name}`,
      text: [
        `From: ${payload.name} <${payload.email}>`,
        payload.subject ? `Subject: ${payload.subject}` : "",
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return !result.error;
  } catch (err) {
    // Don't surface this to the client — the message is already saved.
    // eslint-disable-next-line no-console
    console.error("[resend] notification failed:", err);
    return false;
  }
}
