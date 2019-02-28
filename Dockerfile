FROM node:dubnium-alpine

COPY . /usr/bin/worker/

WORKDIR /usr/bin/worker

RUN npm install
CMD ["npm", "run", "prod"]