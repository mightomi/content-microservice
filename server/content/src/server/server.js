const { PORT } = require("../config")

const express = require("express");
const cors = require("cors");

const database = require("../database/database");
const { content } = require("../api");


console.log("port is ", PORT);

// init everything
const start = () => {

    const app = express();
    app.use(cors());
    app.use(express.json());

    database.init();

    // listen to user API
    content(app);


    const server = app.listen(PORT, () => {
        console.log(`content listening on port ${PORT}`);
    });
}


module.exports = {
    start
}