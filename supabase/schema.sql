-- ============================================================================
-- Portfolio contact form — Supabase schema
-- ----------------------------------------------------------------------------
-- Run this in the Supabase project's SQL Editor
-- (Project → SQL → New query → paste → Run). Idempotent: safe to re-run.
--
-- Storage: free Supabase tier is plenty (500 MB / unlimited rows for our use
-- case). No public read or write access — only the server-side route handler
-- using the SERVICE_ROLE key can insert. RLS is enabled and no policy is
-- granted to anon or authenticated.
-- ============================================================================

create extension if not exists "pgcrypto";

-- Drop in dependency order so the script is idempotent. We don't drop the
-- table itself on re-run because that would lose messages; only the policy.
drop policy if exists contact_messages_no_public_read on public.contact_messages;
drop policy if exists contact_messages_no_public_write on public.contact_messages;

create table if not exists public.contact_messages (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null check (char_length(name) between 1 and 120),
  email       text        not null check (char_length(email) between 3 and 320),
  subject     text                 check (subject is null or char_length(subject) <= 200),
  message     text        not null check (char_length(message) between 1 and 5000),
  -- Operational metadata captured for spam review only.
  ip          inet,
  user_agent  text,
  -- `honey` is the honeypot field. Real submissions leave it blank; bots
  -- auto-fill every input, so any non-null value is a 100% bot signal.
  honey       text                 default '' check (honey = ''),
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- Row-level security on. The service role bypasses RLS by design, so the
-- Next.js route handler can still insert. Anon/authenticated keys cannot.
alter table public.contact_messages enable row level security;

-- Belt + braces: explicitly deny any client-side access. The service role
-- bypasses RLS so inserts from /api/contact still work.
create policy contact_messages_no_public_read
  on public.contact_messages
  for select
  to anon, authenticated
  using (false);

create policy contact_messages_no_public_write
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (false);

-- Convenience view for the portfolio owner to read messages in the Supabase
-- Table Editor. Not queryable by anon/authenticated (RLS on the underlying
-- table prevents that).
comment on table public.contact_messages is
  'Contact form submissions. RLS is ON with no client policies. Insert via the service role only.';
