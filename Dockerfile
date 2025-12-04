FROM node:22-alpine AS builder

# Install pnpm
RUN npm i -g pnpm@10.20

WORKDIR /app

# Copy dependency files
COPY package*.json pnpm-lock.yaml ./

# Configure pnpm for Docker and install dependencies
RUN pnpm config set node-linker hoisted && \
    pnpm install --ignore-scripts --no-frozen-lockfile

# Copy source code
COPY . .

# Disable Next.js telemetry
RUN pnpm exec next telemetry disable

# Build the application
RUN pnpm run build

# --------------------------
# PRODUCTION IMAGE
# --------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# ⭐ Quan trọng:
# Next.js không cần HOSTNAME trong docker (gây lỗi đôi khi)
# và cũng không ảnh hưởng đến cookie
# nên bỏ luôn dòng ENV HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch user
USER nextjs

EXPOSE 3000

# --------------------------
# ⭐ FIX HEALTHCHECK
# Next.js cần HTTP nội bộ, không cần HTTPS
# --------------------------
# HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
#     CMD wget -qO- http://localhost:3000/health || exit 1

# Start app
CMD ["node", "server.js"]