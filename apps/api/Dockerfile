# Use base Turborepo image as builder
FROM node:23-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy necessary files for dependency installation
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies with cache optimization
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client (no database connection needed for this)
RUN cd apps/api && npx prisma generate

# Build the API app
RUN cd apps/api && pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install runtime dependencies
RUN apk add --no-cache dumb-init wget

# Copy the entire app directory from builder to maintain workspace structure
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy the shared configs
COPY --from=builder /app/packages ./packages

# Copy the built API app
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Install only production dependencies (including workspace packages)
RUN pnpm install --prod --frozen-lockfile

# Move to the API directory to run the app
WORKDIR /app/apps/api

# Create a simple health check endpoint if it doesn't exist
RUN if [ ! -f ./dist/health.js ]; then echo 'module.exports = (req, res) => { res.status(200).send("OK"); }' > ./dist/health.js; fi

EXPOSE 3000

# Use dumb-init to handle signals properly and run migrations when container starts
ENTRYPOINT ["dumb-init", "--"]
CMD /bin/sh -c "npx prisma db push && node dist/main.js"