FROM node:16.13.2


COPY package*.json ./

RUN npm i -g @nestjs/cli@8.2.0

RUN npm install


USER node

WORKDIR /home/node/app
