FROM node:alpine
RUN mkdir -p /app/dist
WORKDIR /app
COPY ./dist/ ./dist/

RUN npm i -g serve
CMD serve -s dist/ -l 3000

