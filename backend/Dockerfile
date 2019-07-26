FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./package.json
RUN yarn install

COPY .env ./.env
COPY dist ./dist
RUN ls
