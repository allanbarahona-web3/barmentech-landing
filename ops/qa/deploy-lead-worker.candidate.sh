#!/usr/bin/env bash
set -euo pipefail

# Candidate only; do not install or invoke from the automatic QA workflow without approval.
: "${DEPLOY_SHA:?missing DEPLOY_SHA}"
: "${QA_MIGRATION_APPROVED_SHA:?the migration must be approved for this exact SHA first}"
: "${BARMENTECH_API_IMAGE:?missing immutable API image reference}"
: "${BARMENTECH_WORKER_RUNTIME_ENV:?missing protected worker runtime env file}"

test "$DEPLOY_SHA" = "$QA_MIGRATION_APPROVED_SHA"
case "$BARMENTECH_API_IMAGE" in *"$DEPLOY_SHA"*) ;; *) echo "API image does not identify DEPLOY_SHA" >&2; exit 1;; esac

docker compose --project-name barmentech-qa \
  --file compose.qa.yml \
  --file compose.lead-worker.candidate.yml \
  up --detach --no-deps lead-email-worker
