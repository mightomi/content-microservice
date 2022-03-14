FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7 --silent

RUN npm install --silent

COPY . .

EXPOSE 8002

CMD [ "npm", "start"]