/**
 * Supabase client for server-side use only.
 *
 * Uses the SERVICE_ROLE key which BYPASSES Row Level Security. This means
 * a leaked key would expose the entire project database, so it must NEVER
 * be exposed to the client bundle. The env var is intentionally NOT
 * prefixed with NEXT_PUBLIC_ and this file must only be imported from
 * server-only contexts (route handlers, server components, server actions).
 *
 * The free Supabase tier is sufficient for the contact form (500 MB storage,
 * unlimited rows). If `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is not
 * set, the contact form still works — submissions are accepted and the
 * admin sees a "delivery disabled" warning instead of an error.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;
  cached = createClient(
    // The non-null assertions are safe: isSupabaseConfigured() guards both.
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  return cached;
}
