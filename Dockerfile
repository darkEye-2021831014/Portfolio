# Production build check for the portfolio.
#
# This image is **throwaway** — its job is to prove the build is
# reproducible in a clean Node 20 environment, with no host caches
# leaking in. It is NOT used to ship the app (Vercel handles deploys
# natively); see DEPLOY.md for the deploy story.
#
#   # Build only (CI / local verification):
#   docker build -t portfolio-buildcheck .
#
#   # Build + run a one-shot smoke test:
#   docker build -t portfolio-buildcheck .
#   docker run --rm -p 3000:3000 portfolio-buildcheck runner
#
# Stages:
#   deps     - npm ci, isolated
#   builder  - next build (the artifact we care about)
#   runner   - production server, optional smoke-test target

# ----------------------------------------------------------------------------
# 1. deps — install with a lockfile
# ----------------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# ----------------------------------------------------------------------------
# 2. builder — compile the production build
# ----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ----------------------------------------------------------------------------
# 3. runner — production server (smoke-test only)
# ----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user for the runtime image.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Pull the production build + static assets + production-only deps.
# We keep the full node_modules here rather than the `standalone` output
# because `next.config.mjs` does not set `output: 'standalone'` — Vercel
# runs the standard Next.js server. This keeps the image in lockstep with
# the deployed runtime.
COPY --from=builder --chown=nextjs:nodejs /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next             ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json      ./package.json
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules       ./node_modules

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npx", "next", "start", "-p", "3000"]
