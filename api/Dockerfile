FROM node:13.13.0-alpine3.10

WORKDIR /usr/app

EXPOSE 4000

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn

ADD .env .env
ADD data data
ADD src src

ENTRYPOINT ["yarn", "start"]
