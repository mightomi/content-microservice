const { PORT } = require("../config")

const express = require("express");
const cors = require("cors");

const database = require("../database/database");
const { user } = require("../api");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

console.log("port is ", PORT);

// init everything
const start = () => {

    const app = express();
    app.use(cors());
    app.use(express.json());

    database.init();

    // listen to user API
    user(app);

    // swagger config
    const swaggerOptions = {
        swaggerDefinition: {
          info: {
            version: "1.0.0",
            title: "User API",
            description: "User API Information",
            contact: {
              name: "swaastick"
            },
            servers: ["http://localhost:8001"]
          }
        },
        apis: ["./src/api/user.js"]
    };
    
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


    const server = app.listen(PORT, () => {
        console.log(`user listening on port ${PORT}`);
    });
}


module.exports = {
    start
}