const user = require("../apiServices/user");
const UserAuth = require("./middleware/auth");

module.exports = (app) => {

/**
 * @swagger
 * /user/signup:
 *    post:
 *      description: Used to register user
 *    parameters:
 *      - name:
 *        in: query
 *        description: Name of our user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - email:
 *        in: query
 *        description: email of our user
 *        required: true
 *        schema:
 *          type: string
 *          format: string 
 *      - password:
 *        in: query
 *        description: password of our user
 *        required: true
 *        schema:
 *          type: string
 *          format: string 
 *    responses:
 *      '200':
 *        description: Successfully created user
 */
  app.post("/signup", async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      // console.log(name, email, password);

      const { data } = await user.SignUp({ name, email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
 * @swagger
 * /user/login:
 *    post:
 *      description: Used to register user
 *    parameters:
 *      - email:
 *        in: query
 *        description: email of our user
 *        required: true
 *        schema:
 *          type: string
 *          format: string 
 *      - password:
 *        in: query
 *        description: password of our user
 *        required: true
 *        schema:
 *          type: string
 *          format: string 
 *    responses:
 *      '200':
 *        description: Successfully created user
 */
  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await user.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await user.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

};
