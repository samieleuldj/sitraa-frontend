FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && npm install; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_META_PIXEL_ID=1108478241547299
ARG NEXT_PUBLIC_META_PIXEL_HOOD=1108478241547299
ARG META_PIXEL_ID=1108478241547299
ARG NEXT_PUBLIC_API_URL=https://api.confortdz.shop
ARG NEXT_PUBLIC_SITE_URL=https://confortdz.shop
ARG CACHE_BUST=20260925-hood-only-no-confort-store
ENV CACHE_BUST=$CACHE_BUST
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_META_PIXEL_HOOD=$NEXT_PUBLIC_META_PIXEL_HOOD
ENV META_PIXEL_ID=$META_PIXEL_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN mkdir -p public
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ARG META_PIXEL_ID=1108478241547299
ARG NEXT_PUBLIC_META_PIXEL_ID=1108478241547299
ARG NEXT_PUBLIC_META_PIXEL_HOOD=1108478241547299
ENV META_PIXEL_ID=$META_PIXEL_ID
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_META_PIXEL_HOOD=$NEXT_PUBLIC_META_PIXEL_HOOD

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
