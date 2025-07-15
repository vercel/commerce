
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile


FROM base AS dev
COPY . .
RUN pnpm install
CMD ["pnpm", "dev"]


FROM base AS build
COPY . .
RUN pnpm build


FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
