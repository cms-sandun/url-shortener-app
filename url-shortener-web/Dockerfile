FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 8080

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 8080