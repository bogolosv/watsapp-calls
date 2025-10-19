ARG BUILD_FROM=ghcr.io/home-assistant/aarch64-base:latest
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm chromium

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x /usr/src/app/run.sh

CMD [ "/usr/src/app/run.sh" ]
