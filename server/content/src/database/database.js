const mongoose = require("mongoose");
const { DB_URL } = require("../config");

const init = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db Connected");
    } 
	catch (error) {
        console.log("Error ============");
        console.log(error);
    }
};

const close = async () => {};

module.exports = {
    init,
    close,
};
