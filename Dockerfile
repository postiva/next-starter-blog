FROM node:20 as base
RUN npm install -g pnpm
ARG NEXT_PUBLIC_POSTIVA_API_KEY
ENV NEXT_PUBLIC_POSTIVA_API_KEY=$NEXT_PUBLIC_POSTIVA_API_KEY
ARG NEXT_PUBLIC_WORKSPACE_ID
ENV NEXT_PUBLIC_WORKSPACE_ID=$NEXT_PUBLIC_WORKSPACE_ID
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV COREPACK_ENABLE_STRICT=0

# Installer stage
FROM base AS installer
WORKDIR /app
COPY . .
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
RUN pnpm build

# Runner stage
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

EXPOSE 8000
CMD pnpm start