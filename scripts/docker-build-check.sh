#!/usr/bin/env bash
#
# Reproducible production build check.
#
# Builds the app in a clean Node 20 container to prove the build is
# independent of the host's node_modules / caches. Mirrors the CI
# step and the manual pre-deploy smoke test from DEPLOY.md.
#
# Usage:
#   ./scripts/docker-build-check.sh            # builds to the `builder` stage only
#   ./scripts/docker-build-check.sh run      # builds + runs runner stage locally
#
# Requires: docker.

set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-portfolio-buildcheck}"

echo "==> Building $IMAGE_NAME (target: builder)"
docker build --target builder -t "$IMAGE_NAME" .

echo "==> Build OK. Image: $IMAGE_NAME"
echo "    Run smoke test with:  ./scripts/docker-build-check.sh run"
echo "    Or:                   docker run --rm -p 3000:3000 $IMAGE_NAME"

if [ "${1:-}" = "run" ]; then
  echo "==> Starting runner stage on http://localhost:3000"
  docker run --rm -p 3000:3000 "$IMAGE_NAME" runner
fi