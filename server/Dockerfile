FROM node as nodebase

# USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app


WORKDIR /usr/src/app

# Install dependencies first, as they change less often than code.
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

FROM nodebase as production

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN echo $NODE_ENV

RUN npm run build
ENTRYPOINT ["ts-node", "./build/app.js"]