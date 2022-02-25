const content = require("../apiServices/content");
const userAuth = require("./middleware/auth");

module.exports = (app) => {
    /**
     * @swagger
     * /content/getTopContent:
     *    get:
     *      description: Get all the content sorted by likes
     *    responses:
     *      '200':
     *        description: Successfully return the data
     */
    app.get("/getTopContent", async (req, res, next) => {
        try {
            const { data } = await content.getTopContent();
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /content/getContentById:
     *    post:
     *      description: Get full content of the post with given id
     *    parameters:
     *      - postId:
     *        in: query
     *        description: postId of the post which we want the full content of
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '200':
     *        description: Successfully return the data
     */
    app.post("/getContentById", async (req, res, next) => {
        try {
            const { postId } = req.body;
            console.log(req.body);
            const { data } = await content.getContentById(postId);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /content/postContent:
     *    post:
     *      description: post a new content from the user
     *    parameters:
     *      - title:
     *        in: query
     *        description: title of the story
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '200':
     *        description: Successfully created and saved the content
     */
    app.post("/postContent", async (req, res, next) => {
        try {
            const { title, storyContent, userId } = req.body;
            // console.log(title, storyContent, userId);
            const { data } = await content.postContent({
                title,
                storyContent,
                userId,
            });

            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /content/postLiked:
     *    post:
     *      description: post a new content from the user
     *    parameters:
     *      - postId:
     *        in: query
     *        description: Id of teh post that was liked
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - userId:
     *        in: query
     *        description: userId of the person who liked the post;
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '200':
     *        description: Successfully created and saved the content
     */
    app.post("/postLiked", async (req, res, next) => {
        try {
            const { postId, userId } = req.body;

            console.log("post that was liked ", postId, userId );

            const { data } = await content.postLiked({ postId, userId });

            return res.json(data);
        } catch (err) {
            next(err);
        }
    });
};
