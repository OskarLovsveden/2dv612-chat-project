FROM node:16

RUN mkdir /home/node/app
WORKDIR /home/node/app

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install dependencies first, as they change less often than code.
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD npm run build
