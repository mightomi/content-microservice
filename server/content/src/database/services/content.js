const { ContentModel } = require('../models');

//Dealing with data base operations
let action = {};



action.getTopContent = async () => {

    try {
        const topContent = await ContentModel.find({}).sort({likes: -1});
        
        return topContent;
    } catch (err) {
        console.log('API Error', 'Unable to get topcontent');
    }
}

action.getContentById = async (_id) => {

    try {
        const fullContent = await ContentModel.findById(_id);
        // console.log("content by id ", _id, fullContent);
        return fullContent;
    } catch (err) {
        console.log('API Error', 'Unable to Find content');
    }
}


action.postContent = async ({title, storyContent, userId}) => {
    // console.log("post called ", title, storyContent);
    try {
        const content = new ContentModel({
            title,
            storyContent,
            likes: 0,
            userLiked: [],
            publishingDate: new Date(),
            userId: userId
        })
        const contentResult = await content.save();
        return contentResult;
    } catch(err) {
        console.log('API Error', 'Unable to Create content', err)
    }
};

action.postLiked = async ({postId, userId}) => {

    try {
        console.log("postId, userid", postId, userId);
        const content = await action.getContentById(postId);
        if(content.userLiked.includes(userId)) {
            return {success: false, error: "post was already liked by you"};
        }
        else {
            const postWithUpdatedLikes = await ContentModel.findOneAndUpdate(
                {_id :postId}, 
                {$inc : {'likes' : 1} , $push: { userLiked: userId } }
            );
            console.log("updated post", postWithUpdatedLikes);
            return {success: true};
        }
    } catch (err) {
        console.log('API Error', ' in postLiked', err);
    }
}

module.exports = action;