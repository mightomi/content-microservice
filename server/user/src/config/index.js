const dotEnv  = require("dotenv");

dotEnv.config();

module.exports = {

    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    APP_SECRET: process.env.APP_SECRET
}