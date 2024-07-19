FROM node:20 as base
RUN npm install -g pnpm

# Installer stage
FROM base AS installer
WORKDIR /app
COPY . .
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN export COREPACK_ENABLE_STRICT=0 && pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
RUN export COREPACK_ENABLE_STRICT=0 && pnpm build

# Runner stage
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

EXPOSE 8000
CMD export COREPACK_ENABLE_STRICT=0 && pnpm start