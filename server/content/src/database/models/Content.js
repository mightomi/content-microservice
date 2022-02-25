const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    title: String,
    storyContent: String,
    likes: Number,
    userLiked: [String],
    publishingDate: Date,
    userId: String,
});

const ContentModel = mongoose.model('content', ContentSchema);
module.exports =  ContentModel;