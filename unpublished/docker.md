---
title: Docker
publish: false
tags:
---

```dockerfile
FROM node:22-alpine AS base

# step 1
FROM base AS builder
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
# https://github.com/orgs/pnpm/discussions/3938#discussioncomment-14377340
# Install all dependencies from the cached store for building.

# how to setup cache properly
# how to enable inject and have frozen lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

RUN rm -rf ./artifact
RUN pnpm deploy -F . ./artifact

# step 2
FROM base AS runner
WORKDIR /app
COPY --from=builder app/artifact /app
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
```

```sh
pnpm config set inject-workspace-packages=true
pnpm deploy -F . ./artifact


docker build -t my-app-image .
docker run -d -p 8080:3000 hehe
```

# references

https://khromov.se/dockerizing-your-sveltekit-applications-a-practical-guide/#Form_Actions

# inspect the docker

docker exec -it myapp bash
