FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY src/* ./
COPY .env .

EXPOSE 3000

CMD npm start
