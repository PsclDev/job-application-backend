FROM node:18-alpine AS development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update

RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn prebuild
RUN yarn build

FROM node:18-alpine As production

ARG NODE_ENV=production
ARG DOCKER_TAG
ENV app_version=$DOCKER_TAG

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update

RUN apk add --no-cache --virtual .gyp \
      python3 \
      make \
      g++

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]