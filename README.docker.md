# Docker instructions for the API service

This file contains minimal, copy-paste commands to build and run the API service with Docker and Docker Compose.

## Build image for the API (local)

```powershell
# From repository root
npm run docker:build-api
```

This builds image `tourist-guides-api:latest` using `Dockerfile.api`.

## Run the API + DB services locally with Docker Compose

```powershell
# From repository root
docker-compose -f docker-compose.api.yml up --build
```

This brings up `api`, `mongodb` and `postgres` and maps ports:
- API -> http://localhost:4000
- MongoDB -> 27017
- PostgreSQL -> 5432

## Push the image to a registry

```powershell
# tag and push to Docker Hub (example)
docker tag tourist-guides-api your-dockerhub-username/tourist-guides-api:latest
docker push your-dockerhub-username/tourist-guides-api:latest
```

## Deploy to any cloud

- Build and push the image to your registry (Docker Hub, ECR, GCR, ACR).
- Create the cloud service/container using the pushed image and set env vars:
  - NODE_ENV=production
  - PORT=4000
  - MONGODB_URI
  - POSTGRES_URL
- If using managed DBs, update `MONGODB_URI` and `POSTGRES_URL` to point to the managed endpoints.

## Notes
- The Dockerfile.api builds the TypeScript API into `dist/` and runs `node dist/api/server.js`.
- `tsconfig.api.json` compiles only `src/api` into `dist`.
