FROM node:dubnium-alpine

COPY . /usr/bin/worker/

WORKDIR /usr/bin/worker
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
    
RUN npm install
CMD ["npm", "run", "prod"]