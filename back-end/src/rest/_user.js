const Router = require("@koa/router");
const userService = require("../service/user");
const Joi = require("joi");
const validate = require("./_validation");

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login to get the bearer token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       allOf:
 *         - type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: "string"
 *             password:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Login"
 *   examples:
 *     Login:
 *       id: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e"
 *       username: "xxx"
 *       password: "xxx"
 *       token: "xxx"
 *   requestBodies:
 *     Login:
 *       description: The credentials to login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login to get the bearer token
 *     description: Returns the bearer token
 *     tags:
 *      - Login
 *     requestBody:
 *       $ref: "#/components/requestBodies/Login"
 *     responses:
 *       200:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               username:
 *                 type: string
 *               roles:
 *                 type: array
 *               token:
 *                 type: string
 */
const login = async (ctx) => {
    const {
        username,
        password
    } = ctx.request.body;
    const session = await userService.login(username, password);
    ctx.body = session;
};
login.validationScheme = {
    body: {
        username: Joi.string(),
        password: Joi.string(),
    },
};

module.exports = function installUsersRoutes(app) {
    const router = new Router({
        prefix: "/user",
    });

    //publieke routes
    router.post("/login", validate(login.validationScheme), login);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};