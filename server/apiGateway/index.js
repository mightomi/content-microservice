const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const StartServer = async() => {

    const app = express(); 
    app.use(cors());
    app.use(express.json());

    app.use('/user', proxy('http://localhost:8001'))
    app.use('/content', proxy('http://localhost:8002'))
    // app.use('/', proxy('http://localhost:8001'))


    const swaggerOptions = {
        swaggerDefinition: {
          info: {
            version: "1.0.0",
            title: "User API",
            description: "User API Information",
            contact: {
              name: "swaastick"
            },
            servers: ["http://localhost:8000"]
          }
        },
        // apis: ['*.js']
        apis: ["../content/src/api/content.js", "../user/src/api/user.js"]
    };
      
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(8000, () => {
        console.log(('gateway port running on 8000'))
    })
}

StartServer();