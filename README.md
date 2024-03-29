# content-microservice

Dockerized backend microservices in Nodejs, with a simple RectJs Frontend

User microservice API endpoint:
1. /login
2. /signup

Content microservice API endpoint:
1. /getTopContent
2. /getContentById
3. /postContent
4. /PostContentCSV
5. /postLiked


## Tech-Stack

#### Backend
NodeJs, Express, bcrypt, swagger-jsdoc
#### Database
MongoDB, Mongoose
#### Frontend
ReactJs


## How to Run
0. Run `sudo systemctl stop mongod` to stop mongod if running on port 27017.
1. Open the terminal in the project directory and write `docker-compose up --build`
2. React frontend will run on port 3000
3. apiGateway will run on port 8000, user microservice on port 8001, and content microservice on port 8002

## Test
1. Postman API collection link: https://www.getpostman.com/collections/edc3d1950efc31a9a18c
2. Swagger Doc for user API working running in http://localhost:8001/api-docs/#/
3. Swagger Doc for content API working running in http://localhost:8002/api-docs/#/
