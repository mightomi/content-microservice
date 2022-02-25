FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7 --silent

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]