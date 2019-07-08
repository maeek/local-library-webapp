#!/bin/bash
FROM node:10.16.0

RUN git clone https://github.com/maeek/local-library-webapp.git

WORKDIR local-library-webapp


RUN npm install

RUN KEY_PEM=;npm run start