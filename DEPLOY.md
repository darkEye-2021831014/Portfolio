# DEPLOY

Deploy the portfolio to **Vercel** (free tier) with the existing **Supabase** project as the database. This guide assumes the repo is already on GitHub and you have access to both services.

> **You deploy, I don't.** This document is a step-by-step checklist. Nothing here runs anything against your accounts without you clicking the buttons.

---

## 0. TL;DR

1. Push to GitHub.
2. Run the local pre-flight checks below.
3. Run `supabase/schema.sql` in your existing Supabase project (idempotent).
4. Create a Vercel project, import the repo, paste 6 env vars.
5. Click **Deploy**. Verify the smoke-test checklist.
6. Point a custom domain (optional), update `NEXT_PUBLIC_SITE_URL`, redeploy.

---

## 1. Prerequisites

You need **all** of these before starting:

- [ ] A GitHub account with the repo pushed (default branch `main`).
- [ ] A Vercel account (free tier is enough). Sign in at <https://vercel.com>.
- [ ] An existing Supabase project. You need:
  - Project URL (looks like `https://<project-ref>.supabase.co`)
  - `service_role` key (NOT `anon`) — Settings → API → Project API keys.
- [ ] A Resend account (only required if you want the `/api/contact` form to actually send mail). Free tier = 100 emails/day.
- [ ] A custom domain (optional; otherwise you'll get a `https://<project>.vercel.app` URL).

---

## 2. Pre-flight (local)

Run these in the repo root before you do anything on Vercel:

```bash
cd /Users/ashrafulislam/Documents/myCode/MyProject/Portfolio

# 1. Install deps
npm install

# 2. Lint + typecheck + production build (mimics what CI does)
npm run lint
npm run typecheck
npm run build

# 3. Reproducible build inside a clean Node 20 container (the
#    "production build check inside Docker" deliverable).
npm run docker:build

# 4. Smoke-test the local prod server
npm run start &     # listens on http://localhost:3000
sleep 3
curl -sI http://localhost:3000/ | head -n 1     # → HTTP/1.1 200
curl -sI http://localhost:3000/dev/kit | head -n 1   # → HTTP/1.1 404 (gate is closed)
curl -sI http://localhost:3000/favicon.ico | head -n 1   # → HTTP/1.1 404 (intentional)
curl -sI http://localhost:3000/favicon.svg | head -n 1   # → HTTP/1.1 200
curl -sI http://localhost:3000/sitemap.xml | head -n 1   # → HTTP/1.1 200
kill %1
```

If any of these fail, fix locally first. CI will fail in the same way.

---

## 3. Supabase — apply the schema

The contact form writes to `contact_messages` in your existing project. The migration is idempotent — re-running it is safe.

1. Open the Supabase dashboard for your project.
2. Go to **SQL Editor** → **New query**.
3. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. Click **Run**. Expected output: `Success. No rows returned`.
5. Confirm the table exists: **Table Editor** → `contact_messages` should be listed.

Then collect the values for Vercel:

- **Project URL** → copy in Settings → **API** → "Project URL".
- **service_role key** → copy in Settings → **API** → `service_role` (secret). Treat this like a database password. Never commit it. Never use it from client code.

---

## 4. Vercel — create the project

1. Sign in to Vercel.
2. **Add New… → Project** → Import the GitHub repo.
3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `.`
   - Build Command: `next build` (default — don't override)
   - Output Directory: leave blank (default)
   - Install Command: `npm install` (default)

Don't click Deploy yet. Set the env vars first.

---

## 5. Vercel — environment variables

Set these in **Project Settings → Environment Variables**. The "Scope" column tells Vercel which environments the var is exposed to; match the table below.

| Key | Scope | Public/Server | Where the value comes from |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production, Preview, Development | **Public** (inlined into the JS bundle at build time) | Your final site URL, no trailing slash. `<your-domain>` or `https://<project>.vercel.app`. |
| `SUPABASE_URL` | Production, Preview, Development | Server-only | From step 3 — Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview, Development | Server-only | From step 3 — `service_role` key. |
| `RESEND_API_KEY` | Production, Preview, Development | Server-only | From <https://resend.com/api-keys>. Only required for the contact form. |
| `RESEND_FROM_EMAIL` | Production, Preview, Development | Server-only | The `From:` address Resend is allowed to send as (must be on a domain you've verified in Resend, or use `onboarding@resend.dev` for testing). |
| `RESEND_TO_EMAIL` | Production, Preview, Development | Server-only | Your personal inbox — where contact-form submissions land. |
| `DEV_KIT_ENABLED` | **Per-environment** (set on Preview/Development only) | Server-only | Set to `1` if you want the design-system showcase at `/dev/kit` reachable. **Leave unset in Production.** |

### Notes

- **Server-only vs `NEXT_PUBLIC_*`**: anything *not* prefixed with `NEXT_PUBLIC_` is server-only and never reaches the browser. The contact form, the Supabase client, and Resend all run server-side, so the corresponding keys are safe to set as plain env vars.
- The `DEV_KIT_ENABLED` flag is a server-only switch for the `/dev/kit` design-system reference page. The page returns a real 404 unless the flag equals `"1"`. Toggle it in Preview/Development if you want to QA it; never set it in Production.
- If you don't want the contact form, you can skip the three `RESEND_*` vars. The route will return `503` until they're set.

### CLI equivalent

If you prefer the CLI:

```bash
npm i -g vercel
vercel login
vercel link                                  # link the local repo

# Set a variable for all environments:
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SITE_URL preview
vercel env add NEXT_PUBLIC_SITE_URL development

# Repeat for the other 6 vars. Vercel will prompt for the value.
```

---

## 6. First deploy

1. Back in **Vercel → Deploy**, click **Deploy**.
2. Watch the build log. A successful build ends with a `✓ Compiled successfully` line, then the function and static-asset summaries. The whole thing should take under 90 seconds on the free tier.
3. After the build, click **Visit** to open the preview URL (`https://<project>.vercel.app`).
4. Re-run the smoke-test checklist (section 8) against the live URL.

---

## 7. Custom domain

1. **Vercel → Project → Settings → Domains** → add your domain.
2. Follow Vercel's DNS instructions (A record or `CNAME` for the apex, `CNAME` for `www`).
3. Wait for the certificate to provision (1–5 minutes).
4. After the domain is attached, update **`NEXT_PUBLIC_SITE_URL`** to the canonical `https://yourdomain` (no trailing slash). This is what the sitemap, robots.txt, and OG metadata use.
5. **Redeploy** (Deployments → ⋯ → Redeploy) so the new URL is baked into the build output.

---

## 8. Smoke-test checklist

After the first deploy (or after any env-var change), verify each of these:

```bash
DOMAIN="https://<your-domain-or-project>.vercel.app"

# Static pages
curl -sI "$DOMAIN/"                   | head -n 1   # → 200, contains <h1>Ashraful Islam
curl -sI "$DOMAIN/sitemap.xml"        | head -n 1   # → 200, XML, lists / + 4 project pages
curl -sI "$DOMAIN/robots.txt"         | head -n 1   # → 200, references sitemap, disallows /dev/ /api/
curl -sI "$DOMAIN/opengraph-image"    | head -n 1   # → 200, Content-Type: image/png

# Assets
curl -sI "$DOMAIN/favicon.svg"        | head -n 1   # → 200
curl -sI "$DOMAIN/favicon.ico"        | head -n 1   # → 404 (intentional — see troubleshooting)
curl -sI "$DOMAIN/Ashraful_Islam_Resume.pdf" | head -n 1   # → 200

# Gated route
curl -sI "$DOMAIN/dev/kit"            | head -n 1   # → 404 (gate closed in production)

# API
curl -sI -X POST "$DOMAIN/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"hi","hp":""}' \
  | head -n 1   # → 200 (or 503 if RESEND_API_KEY unset, or 429 if rate-limited)
```

If any of these fail, jump to section 10.

---

## 9. GitHub Actions — PR checks

The repo includes [`.github/workflows/ci.yml`](./.github/workflows/ci.yml). Once the file lands on `main`, every PR and every push to `main` runs three jobs in parallel:

- **Lint** — `npm run lint`
- **Typecheck** — `npm run typecheck`
- **Build** — `npm run build` (depends on lint + typecheck)

If you want to add a Vercel deploy-on-merge step later:

1. Create a Vercel deploy token: <https://vercel.com/account/tokens>.
2. Add the token to GitHub repo Settings → Secrets as `VERCEL_TOKEN`.
4. Add `ORG_ID` and `PROJECT_ID` (from `.vercel/project.json` after `vercel link`) as secrets.
5. Add a `deploy.yml` workflow using `amondnet/vercel-action@v25` — out of scope for this document.

---

## 10. Troubleshooting

### `/favicon.ico` returns 404

Expected. The repo ships `favicon.svg` only. Modern browsers (Chrome, Firefox, Safari, Edge) all support SVG favicons. If you specifically need `.ico` (some legacy crawlers), add `public/favicon.ico` and re-add the metadata entry in `app/layout.tsx`.

### `/dev/kit` returns 404

That's the gate working. To open the design-system reference, set `DEV_KIT_ENABLED=1` in the relevant Vercel environment and redeploy.

### Contact form submission silently fails

1. Open Vercel → Project → Logs. Filter for `/api/contact`.
2. The handler returns:
   - `400` — invalid payload (missing/invalid `email` etc.). Check the JSON.
   - `429` — IP rate-limit triggered. The handler allows ~5 submissions / 10 minutes / IP.
   - `503` — `RESEND_API_KEY` not set in this env, or supplier creds missing.
   - `500` — Supabase write failed. Check the `service_role` key and that the SQL ran.

### `sitemap.xml` shows the placeholder URL

`NEXT_PUBLIC_SITE_URL` wasn't updated for this env. Edit it in Vercel → Settings → Environment Variables, then redeploy.

### OG image looks unstyled

`next/og` uses Satori under the hood and falls back to the system sans-serif if web fonts can't be fetched at build time. That's intentional — keeps the build offline-safe. If you want Google Fonts in the OG image, see `app/opengraph-image.tsx` and the relevant `next/og` docs; be aware that build environments with restricted DNS may fail the font fetch.

### Supabase RLS denies writes

The migration enables RLS on `contact_messages` and adds a policy that allows inserts from `anon` and `service_role`. The contact route uses the service-role key, so the insert is allowed. If you tightened the policy, re-grant `INSERT` to `service_role`.

### Vercel build fails with "lockfile out of sync"

Run `npm install` locally and commit `package-lock.json`. Vercel's `npm ci` is strict.

---

## 11. Cost summary (free tier limits to keep an eye on)

- **Vercel Free**: 100 GB bandwidth/month, 100 deployments/day, serverless function execution 10 s/day on the free edge. The portfolio's `/api/contact` only runs when someone submits the form, so this is comfortable.
- **Supabase Free**: 500 MB database, 2 GB egress, 50,000 monthly active users. Plenty for a portfolio.
- **Resend Free**: 100 emails/day, 1 domain. Enough for an inbox of contact-form submissions.

If you outgrow any of them, the upgrade path is straightforward — Vercel Pro and Supabase Pro are paid but cheap.

---

## 12. Tear-down / rollback

- **Stop the site**: Vercel → Settings → Domains → remove the domain, OR delete the project.
- **Wipe the DB table**: Supabase → `DROP TABLE contact_messages;` in the SQL editor.
- **Remove env vars**: Vercel → Settings → Environment Variables → delete each.

Nothing here is irreversible.