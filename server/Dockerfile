FROM node:latest

# USER node

COPY . .

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

CMD npm run $NODE_ENV