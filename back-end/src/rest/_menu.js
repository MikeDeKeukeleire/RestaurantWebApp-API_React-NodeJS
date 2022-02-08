const Router = require("@koa/router");
const menuService = require("../service/menu");
const {
    requireAuthentication,
    makeRequireRole
} = require("../core/auth");
const Role = require("../core/roles");
const Joi = require("joi");
const validate = require("./_validation.js");

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Represents a deposit of all menus
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       allOf:
 *         - type: object
 *           required:
 *             - name
 *             - price
 *             - thumbnail
 *             - ingredients
 *           properties:
 *             name:
 *               type: "string"
 *             price:
 *               type: double
 *             thumbnail:
 *               type: "string"
 *             ingredients:
 *               type: object
 *           example:
 *             $ref: "#/components/examples/Menu"
 *     MenusList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Menu"
 *   examples:
 *     Menu:
 *       id: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e"
 *       name: "Spaghetti"
 *       price: 12
 *       thumbnail: "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_960_720.jpg"
 *       ingredients:
 *         id: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e"
 *         ingredients: "Spaghetti, bolognaisesaus, kaas"
 *   requestBodies:
 *     Menu:
 *       description: The menu info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: string
 *               price:
 *                 type: number
 */


/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all menus (paginated)
 *     tags:
 *     - Menus
 *     responses:
 *       200:
 *         description: List of menus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MenusList"
 */
const getAllMenus = async (ctx) => {
    ctx.body = await menuService.getAll();
};

getAllMenus.validationScheme = {
    query: Joi.object({
        limit: Joi.number().integer().positive().max(1000).optional(),
        offset: Joi.number().min(0).optional(),
    }).and("limit", "offset"),
}

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Updates an existing menu
 *     parameters:
 *       - $ref: "#/components/parameters/idParamMenu" 
 *     description: Updates an existing menu.
 *     tags:
 *      - Menus
 *     requestBody:
 *       $ref: "#/components/requestBodies/Menu"
 *     responses:
 *       200:
 *     security:
 *       - bearerAuth: []
 */
const updateMenu = async (ctx) => {
    ctx.body = await menuService.updateById(ctx.params.id, ctx.request.body);
};

updateMenu.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    },
    body: {
        price: Joi.number(),
        ingredients: Joi.string(),
    },
};

module.exports = (app) => {
    const router = new Router({
        prefix: "/menus",
    });

    //publieke routes
    router.get("/", validate(getAllMenus.validationScheme), getAllMenus);

    const requireAdmin = makeRequireRole(Role.ADMIN);

    //private routes
    router.put("/:id", validate(updateMenu.validationScheme), requireAuthentication, requireAdmin, updateMenu);

    app.use(router.routes()).use(router.allowedMethods());
};