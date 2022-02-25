const { FormateData } = require('../utils');

const contentDb = require("../database/services/content");

let action = {};


action.getTopContent = async () => {
    try {
        const topContent = await contentDb.getTopContent();

        let topContentLimitedStory = JSON.parse(JSON.stringify(topContent));

        for(let i=0; i<topContentLimitedStory.length; i++) {
            topContentLimitedStory[i].storyContent = topContent[i].storyContent.substring(0, 400);
        }

        return FormateData(topContentLimitedStory);
    } catch (err) {
        console.log("Error in ", err);
    }
};

action.getContentById = async (postId) => {
    try {
        const fullContent = await contentDb.getContentById(postId);

        return FormateData(fullContent);
    } catch (err) {
        console.log("Error in ", err);
    }
};

action.postContent = async ({title, storyContent, userId}) => {
    try {
        // console.log(title, storyContent, userId);
        const postContentData = await contentDb.postContent({title, storyContent, userId});
        return FormateData(postContentData);
    } catch (err) {
        console.log("Error in ", err);
    }
};

action.postLiked = async ({postId, userId}) => {
    try {
        // console.log(title, storyContent, userId);
        const postWithUpdatedLikes = await contentDb.postLiked({postId, userId});
        return FormateData(postWithUpdatedLikes);
    } catch (err) {
        console.log("Error in ", err);
    }
};

module.exports = action;
