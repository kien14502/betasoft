FROM node:22-alpine as builder
RUN npm i -g pnpm@9.11
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts
COPY . .
RUN pnpm exec next telemetry
# RUN pnpm minify-css:ci
# RUN pnpm minify-js:ci
RUN pnpm run build:ci

# Build the image as production
# So we can minimize the size

FROM node:22-alpine
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE ${PORT}

CMD ["node", "server.js"]