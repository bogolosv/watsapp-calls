ARG BUILD_FROM=ghcr.io/home-assistant/aarch64-base:latest
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm chromium

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

# s6-overlay автоматично запустить rootfs/etc/services.d/*
