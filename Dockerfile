# Install dependencies only when needed
FROM node:18-alpine3.17 AS deps
WORKDIR /opt/app
COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install 

FROM node:18-alpine3.17 AS builder
WORKDIR /opt/app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN pnpm run api:prisma:generate
RUN pnpm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.17 AS runner
RUN apk --update add bash
WORKDIR /opt/app
COPY --from=builder /opt/app/apps/admin apps/admin
COPY --from=builder /opt/app/dist/apps/admin dist/apps/admin
COPY --from=builder /opt/app/libs libs
COPY --from=builder /opt/app/package.json /opt/app/nx.json /opt/app/tsconfig.base.json ./
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["npx", "nx", "serve", "admin"]