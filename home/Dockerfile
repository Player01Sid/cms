FROM node:alpine
RUN mkdir -p /app/dist
WORKDIR /app
COPY ./dist/ ./dist/
COPY server.cjs ./server.cjs
COPY server-packages.json ./package.json
#RUN npm i -g serve
#CMD serve -s dist/ -l 80
#RUN npm i -g express serve-static
RUN npm i
CMD node server.cjs
