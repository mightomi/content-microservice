const content = require("../apiServices/content");
const userAuth = require("./middleware/auth");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {

    /**
     * @swagger
     * components:
     *   schemas:
     *     Content:
     *       type: object
     *       properties:
     *         _id:
     *           type: alphaNumeric
     *           description: Unique id of that content(i.e story)
     *           example: 6232f1e6e2ce8911828e0432
     *         title:
     *           type: string
     *           description: the title of the content(i.e story)
     *           example: The Monarch of the Dead
     *         storyContent:
     *           type: string
     *           description: The text part of the story
     *           example: This is a part of the story. A story....End
     *         likes:
     *           type: integer
     *           description: The number of likes for that content
     *           example: 11
     *         publishingDate:
     *           type: Date
     *           description: The date when the content was published
     *           example: 2022-03-17T08:31:34.629Z
     *         userId:
     *           type: alphaNumeric
     *           description: Unique id of the person who posted that content(i.e story)
     *           example: yw53je6e2ce8911828e112
     */



    /**
     * @swagger
     * /getTopContent:
     *   get:
     *     summary: Retrive a array of the top content sorted by likes
     *     description: Retrive a array of the top content sorted decending by likes from the database. Story of each content capped at 400 char
     *     responses:
     *       '200':
     *          description: Array of all the contents sorted by likes
     *          content: 
     *            application/json:
     *              schema: 
     *                items:
     *                  $ref: '#components/schemas/Content'
     */
    app.get("/getTopContent", async (req, res, next) => {
        console.log("got top content request");
        try {
            const { data } = await content.getTopContent();
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });


     /**
     * @swagger
     * /getContentById:
     *   post:
     *     summary: Get the content JSON by its unique id
     *     description: Get full content JSON of the post with given id
     *     
     *     requestBody:
     *       description: JSON input
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               postId:
     *                 anyof:
     *                   - type: string
     *                   - type: integer
     *                 description: The post id of the content to fetch
     *     responses:
     *       200:
     *        description: JSON of the content request
     *        content: 
     *          application/json:
     *            schema: 
     *             $ref: '#components/schemas/Content'
     *       403:
     *         description: The user is not logged in so is not authorized
     *       404: 
     *         description: No content exist by the given id
    */
    app.get("/getContentById", async (req, res, next) => {
        try {
            const { postId } = req.body;
            console.log("the id got in ", req.body);
            const { data } = await content.getContentById(postId);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });


    /**
     * @swagger
     * /postContent:
     *   post:
     *     summary: post a new content from the user
     *     description: post a new content from the user
     *     requestBody:
     *       description: JSON input
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: The title of the content
     *               storyContent:
     *                 type: string
     *                 description: The test of the story
     *               userId:
     *                 type: string
     *                 description: Unique userId of the person who posted the content
     *     responses:
     *       201:
     *         description: The request succeeded, content was posted
     *       400:
     *         description: The content can not be posted
     *       403:
     *         description: The user is not logged in so is not authorized
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
     * /postLiked:
     *    post:
     *      summary: increase the likes by one for the given post
     *      description: increase the likes by one for the given post. A user can like a post only once
     *
     *    responses:
     *      '200':
     *        description: The post was likesd successfully
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



    
    /**
     * 
     * /postCSV:
     *   post:
     *     summary: post a CSV which contains various contents. For testing only
     *     description: post a CSV which contains various contents. For testing only
     *     requestBody:
     *       description: JSON input
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               file:
     *                 type: file
     *                 description: The CSV file which contails the content
     *     responses:
     *       201:
     *         description: The request succeeded, all content were posted
     *       400:
     *         description: Error while posting all the contents
     */

        
    /**
     * @swagger
     * /postContentCSV:
     *   post:
     *     summary: post a CSV which contains various contents. For testing only
     *     description: post a CSV which contains various contents. For testing only
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               file:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *     responses:
     *       200:
     *         description: The request succeeded, all content were posted
     *       400:
     *         description: Error while posting all the contents
     */
     app.post('/postContentCSV', upload.single('csvFile'), async (req, res, next) => {
      console.log("csv post route");
      console.log(req.body);
      return res.json({st: "ok"});
  });

};
