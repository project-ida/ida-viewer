FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV="production"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build:web
RUN pnpm run build:api

FROM base
# only the API needs runtime dependencies, copy all anyway (TODO: figure out why)
COPY --from=prod-deps /app/api/node_modules /app/api/node_modules
COPY --from=prod-deps /app/web/node_modules /app/web/node_modules
COPY --from=prod-deps /app/node_modules /app/node_modules

COPY --from=build /app/web/dist /app/web/dist
COPY --from=build /app/api/dist /app/api/dist
EXPOSE 8080

CMD ["pnpm", "start:api"]