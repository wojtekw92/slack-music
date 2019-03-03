FROM node:dubnium-alpine as builder

COPY . /usr/bin/page/

WORKDIR /usr/bin/page

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/bin/page/dist/ /usr/share/nginx/html