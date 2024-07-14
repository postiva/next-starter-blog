FROM node:alpine as base
RUN apk update
RUN npm install -g pnpm

FROM base AS pruner
WORKDIR /app
RUN npm install turbo@1.11.3 -g
COPY . .

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/ .
COPY --from=pruner /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN export COREPACK_ENABLE_STRICT=0 && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/ .
RUN export COREPACK_ENABLE_STRICT=0 && pnpm build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
CMD export COREPACK_ENABLE_STRICT=0 && pnpm start