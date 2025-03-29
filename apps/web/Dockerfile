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
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies with cache optimization
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the web app with pnpm
RUN cd apps/web && pnpm build

# Production image, copy all the files and run web
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy built static files
COPY --from=builder /app/apps/web/dist .

# Create a proper NGINX configuration with debugging
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    # Enable error logging for debugging \
    error_log /var/log/nginx/error.log debug; \
    access_log /var/log/nginx/access.log; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # API proxying with detailed logging \
    location /api/ { \
        proxy_pass http://api:3000/; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        \
        # Debug headers \
        add_header X-Debug-Message "Proxying to $upstream_addr" always; \
        \
        # Longer timeouts \
        proxy_connect_timeout 60s; \
        proxy_send_timeout 60s; \
        proxy_read_timeout 60s; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Install debugging tools
RUN apk add --no-cache curl wget

# Create a simple health check page
RUN echo "OK" > /usr/share/nginx/html/health.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]