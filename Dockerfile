FROM node:8-alpine

RUN mkdir -p /usr/src/app
RUN addgroup -S prerender && adduser -S -G prerender -h /usr/src/app prerender
USER prerender
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY server.js /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]

