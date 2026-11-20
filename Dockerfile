FROM node:26-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:26-slim
ENV NODE_ENV=production
WORKDIR /app
RUN chown node:node /app
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3019
CMD ["npm", "start", "--", "-p", "3019"]
