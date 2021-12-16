FROM node:latest

# USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY /build .

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR ./build

CMD node src/app.js

