FROM node:12

WORKDIR /app

COPY package.json ./
# COPY package-lock.json ./

COPY ./ ./

RUN npm install -qyg nodemon@2.0.7 --silent

RUN npm install --silent

# COPY . .

EXPOSE 3000

CMD [ "npm", "start"]