const Router = require("@koa/router");
const installMenuRouter = require("./_menu");
const installUserRouter = require("./_user");
const installEventRouter = require("./_event");

/**
 * @swagger
 * components:
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       description: id of an event
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *     idParamMenu:
 *       in: path
 *       name: id
 *       description: id of a menu
 *       required: true
 *       schema:
 *         type: string   
 *         format: uuid
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Base:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           format: "uuid"
 *       example:
 *         id: "6d560fca-e7f9-4583-af2d-b05ccd1a0c58"
 *     ListResponse:
 *       required:
 *         - limit
 *         - offset
 *       properties:
 *         limit:
 *           type: integer
 *           description: Limit actually used
 *           example: 1
 *         offset:
 *           type: integer
 *           description: Offset actually used
 *           example: 1
 */

module.exports = (app) => {
    const router = new Router({
        prefix: "/api",
    });

    installMenuRouter(router);
    installUserRouter(router);
    installEventRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
};