FROM node:alpine

WORKDIR /app
COPY . /app

RUN npm install --omit=dev
RUN npm install --save-dev vite
CMD npm run dev
#CMD serve -s build -l 3000

