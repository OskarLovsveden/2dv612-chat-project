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

# USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app


WORKDIR /usr/src/app

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install dependencies first, as they change less often than code.
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

RUN echo $NODE_ENV

CMD ts-node src/app.ts