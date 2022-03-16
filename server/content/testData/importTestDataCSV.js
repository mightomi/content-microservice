// const database = require("../src/database/database");
const content = require("../src/apiServices/content");

const csv = require("csv-parser");
const fs = require("fs");

// database.init();

fs.createReadStream(__dirname + "/contentData.csv")
    .pipe(csv())
    .on("data", async (data) => {

        // input date in format 31/12/2012
        let pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        let arrayDate = data["publishingDate"].match(pattern);
        let dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);

        try {
            await content.postContent({
                title: data["title"],
                storyContent: data["storyContent"],
                likes: data["likes"],
                publishingDate: dt,
                userId: data["userId"],
            });
            console.log("content with given title was added: ", data["title"]);
        } catch (err) {
            console.log("API Error", "Unable to Create content", err);
        }
    })
    .on("end", () => {
        console.log("Done");
    });
