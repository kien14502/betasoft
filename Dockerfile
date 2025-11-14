FROM node:22-alpine AS builder

# Install pnpm
RUN npm i -g pnpm@10.20

WORKDIR /app

# Copy dependency files
COPY package*.json pnpm-lock.yaml ./

# Configure pnpm for Docker and install dependencies
RUN pnpm config set node-linker hoisted && \
    pnpm install --ignore-scripts --frozen-lockfile

# Copy source code
COPY . .

# Disable Next.js telemetry
RUN pnpm exec next telemetry disable

# Build the application
RUN pnpm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server.js"]