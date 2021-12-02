FROM node:16

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

EXPOSE 3000
# CMD ["npm", "run", "start"]
# ENV CI=true
CMD ["npm", "run", "start"]
COPY --chown=node:node package* ./
# examples don't use package-lock.json to minimize updates 
RUN npm install --no-package-lock
COPY --chown=node:node . .