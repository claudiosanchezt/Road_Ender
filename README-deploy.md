# Deployment notes

This repo contains two runtime concerns: the Next.js frontend and the API backend.

Quick notes to deploy:

- API-only image: use `Dockerfile.api` which builds TypeScript and copies `dist` into a runtime image. This is the recommended approach for deploying the backend separately.
- Full image (frontend + backend): `Dockerfile` expects a built Next app with `.next/standalone` present. Before `docker build` ensure `npm run build` has run and produced `.next/standalone`.

Common fixes when `docker build` fails copying `.next/standalone`:
- Run `npm run build` locally to produce `.next/standalone`.
- Alternatively build the frontend in CI and publish the static artifact, or split frontend and backend into separate images.

Backing up databases:
- Use `scripts/backup-local.ps1` to create local backups for Postgres and Mongo and a zip of the backend code.

Restore smoke test:
- See `scripts/restore-smoke.ps1` for a helper to restore Postgres dump into a temporary container for validation.

Security:
- Keep `JWT_SECRET` and DB credentials out of the repo and inject them via environment or secret manager in production.
