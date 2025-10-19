ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base:latest
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm chromium

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x /run.sh
CMD [ "/run.sh" ]
