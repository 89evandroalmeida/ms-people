FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY src/* ./
COPY src/controllers ./controllers
COPY src/models ./models
COPY src/routers ./routers
COPY src/services ./services
COPY .env .

EXPOSE 3000

CMD npm start
