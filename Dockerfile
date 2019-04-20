FROM node:latest

WORKDIR /app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

CMD ["npm", "install"]
