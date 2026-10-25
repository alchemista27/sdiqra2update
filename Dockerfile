FROM node:22.23.4-alpine AS base
RUN apk add --no-cache libc6-compat openssl \
  && corepack enable pnpm \
  && corepack prepare pnpm@11.24.0 --activate
ENV NEXT_TELEMETRY_DISABLED=1 \
    TURBO_TELEMETRY_DISABLED=1 \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Layer 1: Dependencies installation
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
COPY apps/backend/prisma apps/backend/prisma
RUN pnpm install --frozen-lockfile

# Layer 2: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
COPY . .
# Generate Prisma Client & compile both apps
RUN pnpm --filter backend exec prisma generate
RUN pnpm build

# Layer 3: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    RUN_LOCAL=true \
    PORT=5000 \
    NEXT_PUBLIC_APP_URL="https://sditiqra2.alfida.or.id" \
    NEXT_PUBLIC_API_URL="/api" \
    INTERNAL_API_URL="http://127.0.0.1:5000/api" \
    HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app ./

COPY <<-'SCRIPT' /app/start.sh
#!/bin/sh

echo "==> Syncing database schema with Prisma (non-blocking)..."
(cd /app/apps/backend && npx prisma db push --skip-generate) || echo "Warning: prisma db push failed or skipped"

echo "==> Starting NestJS Backend on port 5000..."
node /app/apps/backend/dist/main.js &

echo "==> Starting Next.js Frontend on port 3000..."
cd /app/apps/frontend && exec node node_modules/next/dist/bin/next start -p 3000 -H 0.0.0.0
SCRIPT

RUN chmod +x /app/start.sh

USER nextjs

EXPOSE 3000 5000

CMD ["/app/start.sh"]
