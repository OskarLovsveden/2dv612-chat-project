FROM node:latest

# USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . .

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENTRYPOINT npm run $NODE_ENV