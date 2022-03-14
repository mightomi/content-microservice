FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7 --silent

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start"]