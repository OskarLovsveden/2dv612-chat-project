FROM node as nodeBase

# USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app


WORKDIR /usr/src/app

# Install dependencies first, as they change less often than code.
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

FROM nodeBase as production

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NODE_PATH=./build

RUN echo $NODE_ENV

RUN npm run build
CMD npm run production