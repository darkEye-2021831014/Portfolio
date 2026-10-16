# Ashraful Islam — Portfolio

A single, statically-renderable Next.js 14 (App Router, TypeScript, Tailwind CSS)
portfolio for **Ashraful Islam (darkEye)**. Designed from the screens and tokens in
`design/DESIGN.md` and content sourced strictly from `design/resume.pdf`.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** (no UI library, no component kit)
- **Static output** — no Docker, no separate backend service
- **Optional integrations** (free tiers only): Supabase (contact storage),
  Resend (email notifications), Codeforces public API (live CP stats)

## Requirements

- Node.js **>= 18.17** (Next.js 14 baseline)
- npm **>= 9** (ships with the supported Node versions)

> The project is intentionally deployment-friendly to free static hosts such as
> Vercel (Hobby), Netlify, GitHub Pages (via `out/`), or Cloudflare Pages.

## Install

```bash
npm install
```

Create your local env file (optional — the app runs with safe defaults):

```bash
cp .env.example .env.local
```

## Develop

Run the local dev server on `http://localhost:3000`:

```bash
npm run dev
```

## Build & preview

```bash
npm run build
npm run start
```

## Project layout

```
app/                          Next.js App Router routes
  layout.tsx                  Root layout, fonts, metadata
  page.tsx                    Home page (composes the 7 sections)
  globals.css                 Tailwind entry + global resets
  (home)/sections/            Home page sections (Hero, About, CP, …)
  projects/[slug]/page.tsx    Statically-generated project deep-dive
  api/contact/route.ts        POST handler for the contact form
  not-found.tsx               Friendly 404
components/                   Reusable UI primitives (Button, Card, …)
content/                      Typed content sourced from resume.pdf
  site.ts, about.ts, cp.ts, projects.ts, skills.ts, achievements.ts, contact.ts
lib/
  cn.ts, nav.ts, section.ts   Tiny utilities (no extra deps)
  supabase.ts                 Server-side Supabase client (optional)
  resend.ts                   Server-side Resend client (optional)
  codeforces.ts               Cached Codeforces stats fetch
supabase/
  schema.sql                  Idempotent migration for contact_messages
design/                       Design references (DESIGN.md, screen.png, code.html)
  resume.pdf                  Single source of truth for content
public/                       Static assets served at /
.env.example                  Documented environment variables
AGENTS.md                     Agent operating rules
```

## Optional integrations

Every optional integration is **off by default** and degrades gracefully when
its env vars are not set. You can ship the portfolio with an empty
`.env.local`.

### Contact form backend (Supabase)

The contact form lives at `POST /api/contact` (`app/api/contact/route.ts`).
It validates the payload with zod, runs a per-IP rate limit (5 requests /
10 minutes), and rejects any submission where the hidden honeypot field is
non-empty. With Supabase configured, accepted submissions are persisted to a
`contact_messages` table. Without Supabase, the form still works — the API
returns `success: true, stored: false` and the UI surfaces a non-blocking
note that storage is disabled.

To enable durable storage:

1. **Create a free project** at <https://supabase.com> (the free tier is
   plenty: 500 MB storage, unlimited rows).
2. **Run the migration.** Open the project → SQL Editor → New query →
   paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql)
   → click **Run**. The script is idempotent and creates the
   `contact_messages` table with Row Level Security **enabled** and no
   public policies (only the service role bypasses RLS).
3. **Copy the credentials.** Project Settings → API:
   - `SUPABASE_URL` ← "Project URL"
   - `SUPABASE_SERVICE_ROLE_KEY` ← "service_role" secret (⚠️ server-only,
     never expose to the browser; the env var is intentionally **not**
     prefixed with `NEXT_PUBLIC_`).
4. **Add them to `.env.local`** (see `.env.example`).
5. **Restart `npm run dev`**. Submissions now appear in the Supabase
   Table Editor (`contact_messages`).

### Email notification (Resend) — optional

When `RESEND_API_KEY` is set, every accepted submission is also forwarded
as a plain-text email. Resend's free tier is 3,000 emails / month, 100 / day.

1. Create a free account at <https://resend.com>.
2. **API Keys → Create API key**, paste into `RESEND_API_KEY`.
3. `RESEND_FROM_EMAIL` defaults to `onboarding@resend.dev` (the verified
   sandbox sender). To send from your own domain, verify it in the
   Resend dashboard and put the address here.
4. `RESEND_TO_EMAIL` is optional — it defaults to `CONTACT.email` from
   `content/contact.ts`.

Errors from Resend are logged server-side but never surfaced to the user;
the message is already in Supabase by the time the notification fires.

### Codeforces live stats

The Codeforces card on the home page pulls its rating and tier from
`https://codeforces.com/api/user.info?handles=darkEye`. The response is
cached by Next.js's Data Cache for **6 hours** (configured in
`lib/codeforces.ts` via `next: { revalidate: 6 * 60 * 60 }`).

On any failure (network error, non-200, malformed response) the section
falls back to the resume-canonical values in `content/cp.ts`, so the page
**never breaks** when the upstream is unreachable. A small "Live" or
"Cached" pill in the card's top-right indicates which path served the
current render.

No env var or account is required.

## Notes

- All UI must be authored against the design tokens in `design/DESIGN.md`.
- All copy must originate from `design/resume.pdf` — no invented metrics,
  links, employers, or claims.
- No Docker, no paid services, no separate backend service.
- Server-only secrets are never exposed to the browser. The build process
  will refuse to inline any `process.env.X` reference that is not
  explicitly `NEXT_PUBLIC_*` in the client bundle.
