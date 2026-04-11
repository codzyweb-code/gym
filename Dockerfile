# ── Build stage ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install ALL deps (including devDeps for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build Next.js
COPY . .
RUN npm run build

# ── Production stage ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package files and install production deps only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the built Next.js output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Copy the Express server
COPY --from=builder /app/server ./server

# Ensure database.json exists (empty state for first deploy)
RUN echo '{"users":[],"accessRequests":[]}' > server/database.json

EXPOSE 3000

CMD ["node", "server/index.js"]
