FROM node:22.23.4-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS builder
WORKDIR /app

# Copy root workspace configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN pnpm exec prisma generate

# Copy backend source and compile
WORKDIR /app
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl wget

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Install production dependencies and generate client
RUN pnpm install --prod --frozen-lockfile
WORKDIR /app/apps/backend
RUN pnpm exec prisma generate
RUN mkdir -p /app/apps/backend/public

EXPOSE 5000

CMD ["node", "dist/main.js"]
