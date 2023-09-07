# Install dependencies only when needed
FROM node:18-alpine3.17 AS deps
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install 

FROM node:18-alpine3.17 AS builder
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine3.17 AS runner
WORKDIR /opt/app
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]