FROM node:18

WORKDIR /usr/src/app

COPY .env ./
COPY package*.json ./
COPY /prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000