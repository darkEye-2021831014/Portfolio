# Agent Operating Rules

This file governs how coding agents (human or automated) must work in this repository.
These rules apply to **every** phase of development and override any conflicting
default behavior.

## 1. Content source of truth

All user-visible content — names, degrees, dates, CGPA, ratings, contest results,
project descriptions, tech-stack tags, contact details, and bios — **must come
exclusively from `design/resume.pdf`**.

- Do **not** invent metrics, rankings, percentile values, dates, links, employer
  names, project outcomes, or claims of any kind.
- If a value is not present in the resume, either omit it or surface it as a
  placeholder that explicitly marks itself as `TBD`.
- Treat `design/DESIGN.md`, `design/*/code.html`, and `design/*/screen.png` as
  the **visual / structural** reference only — never as a source of new facts.

## 2. Free tools and hosting only

The deployed portfolio must run on free-tier infrastructure and free tooling:

- **Static / free-hosting** deployment targets only: Vercel Hobby, Netlify,
  GitHub Pages, Cloudflare Pages, or similar free tiers.
- **No** paid SaaS, **no** managed databases, **no** paid APIs, **no** auth
  services.
- Open-source libraries and self-hosted substitutes are preferred. If a
  commercial dependency is unavoidable, surface the trade-off in the PR
  description and request explicit approval before adding it.

## 3. No separate backend

- The site is a single Next.js application with no companion server, no
  microservice, no API gateway, and no DB.
- Static generation (`output: 'export'`) is the default deployment mode.
- Any "form submission" or contact handling must use a free email-redirect
  service or be left as a placeholder until a free option is confirmed.

## 4. Commit after every phase

Each phase of work ends with **exactly one** commit.

- Use clear, imperative commit messages that name the phase, e.g.
  `chore: scaffold Next.js 14 app` or `feat(home): build hero + about sections`.
- Stage specific files by name. Avoid `git add -A` / `git add .` unless the
  user explicitly approves.
- Never amend, force-push, or skip hooks unless explicitly asked.
- The committed state after each phase must be runnable: `npm install &&
  npm run dev` must succeed.

## 5. Other guardrails

- **No Docker.** Development and deployment must not require containers.
- **No invented links.** GitHub, LinkedIn, Codeforces, CodeChef, or other URLs
  may only be referenced when the resume provides them.
- **Design fidelity.** Tailwind tokens in `tailwind.config.ts` mirror the
  palette and spacing in `design/DESIGN.md`. New components must reuse those
  tokens instead of introducing hex literals.
- **Accessibility & responsiveness.** Honour the desktop / tablet / mobile
  breakpoints called out in the design brief.
