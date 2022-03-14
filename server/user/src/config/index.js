const dotEnv  = require("dotenv");

dotEnv.config();

module.exports = {

    PORT: process.env.PORT,
    DB_URL: `${process.env.MONGODB_URL}/${process.env.COLLECTION_NAME}`,
    APP_SECRET: process.env.APP_SECRET
}