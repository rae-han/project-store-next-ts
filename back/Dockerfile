FROM node:16

ARG PORT

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]
#CMD ["node", "./app.js"]
