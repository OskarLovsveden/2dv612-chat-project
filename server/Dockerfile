# FROM node

# USER node
# RUN mkdir /home/node/app
# WORKDIR /home/node/app

# EXPOSE 5000
# ARG ENV=production
# ENV NODE_ENV $ENV
# CMD npm run $NODE_ENV

# COPY --chown=node:node package*.json ./
# # examples don't use package-lock.json to minimize updates 
# RUN npm install --no-package-lock
# COPY --chown=node:node . .



FROM node

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Copy files as a non-root user. The `node` user is built in the Node image.
WORKDIR /usr/src/app
RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install dependencies first, as they change less often than code.
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD npm run $NODE_ENV