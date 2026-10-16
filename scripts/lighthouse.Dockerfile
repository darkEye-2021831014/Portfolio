# Lighthouse runner for the portfolio. Runs in a container so the
# results are reproducible across host environments.
#
# Build:   docker build -f scripts/lighthouse.Dockerfile -t portfolio-lighthouse .
# Run:     docker run --rm --network=host portfolio-lighthouse http://localhost:3103/
#
# Notes:
#   --network=host lets the container talk to a Next.js dev/prod server
#   running on the host. We're not in the official "lighthouse"
#   container because the public ones are gated behind a login or
#   blocked DNS in this environment.
FROM node:20-slim

# Chrome dependencies — Chromium needs a long list of system libs.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libnss3 \
    libpango-1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    libxshmfence1 \
    wget \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome for Testing (the official headless-stable channel).
ARG CHROME_VERSION=120.0.6099.109
RUN wget -q -O /tmp/chrome.zip \
    "https://storage.googleapis.com/chrome-for-testing-public/${CHROME_VERSION}/linux64/chrome-linux64.zip" \
 && unzip /tmp/chrome.zip -d /opt \
 && ln -sf /opt/chrome-linux64/chrome /usr/local/bin/chrome \
 && rm /tmp/chrome.zip

ENV CHROME_PATH=/usr/local/bin/chrome

WORKDIR /app

# Install lighthouse + chrome-launcher.
COPY package.json ./
RUN npm install --omit=dev --no-save \
      lighthouse@^12 chrome-launcher@^1 \
 && npm cache clean --force

# Run script (the runner is engine-agnostic — it works in either
# Chrome for Testing or system Chrome via CHROME_PATH).
COPY scripts/run-lighthouse.mjs ./scripts/run-lighthouse.mjs

# Default: run desktop Lighthouse against the local prod server.
CMD ["node", "scripts/run-lighthouse.mjs", "http://host.docker.internal:3103/"]