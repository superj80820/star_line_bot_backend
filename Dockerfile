FROM node:latest

RUN npm install gulp -g

WORKDIR /app
ADD ./package.json ./package.json
RUN npm install
