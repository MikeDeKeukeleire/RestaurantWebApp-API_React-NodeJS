const Router = require("@koa/router");
const eventService = require("../service/event");
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
 *   name: Events
 *   description: Represents a deposit of all events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       allOf:
 *         - type: object
 *           required:
 *             - date
 *             - title
 *             - description
 *           properties:
 *             date:
 *               type: "string"
 *             title:
 *               type: "string"
 *             description:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Event"
 *     EventsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Event"
 *   examples:
 *     Event:
 *       id: "0ccc7190-d664-4843-b97a-5b63e5b0d43e"
 *       date: "2021-12-25"
 *       title: "Kerstdiner"
 *       description: "Geen zin om alleen te zijn op kerstdag? Kom mee genieten van ons overheerlijk kerstdiner. Vooraf inschrijven vereist."
 *   requestBodies:
 *     Event:
 *       description: The event info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 */


/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events (paginated)
 *     tags:
 *     - Events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EventsList"
 */
const getAllEvents = async (ctx) => {
  ctx.body = await eventService.getAll();
};

getAllEvents.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event.
 *     tags:
 *      - Events
 *     requestBody:
 *       $ref: "#/components/requestBodies/Event"
 *     responses:
 *       201:
 *     security:
 *       - bearerAuth: []
 */
const createEvent = async (ctx) => {
  const newEvent = await eventService.create(ctx.request.body);
  ctx.body = newEvent;
  ctx.status = 201;
};

createEvent.validationScheme = {
  body: {
    date: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
  }
}

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Updates an existing event
 *     parameters:
 *       - $ref: "#/components/parameters/idParam" 
 *     description: Updates an existing event.
 *     tags:
 *      - Events
 *     requestBody:
 *       $ref: "#/components/requestBodies/Event"
 *     responses:
 *       200:
 *     security:
 *       - bearerAuth: []
 */
const updateEvent = async (ctx) => {
  ctx.body = await eventService.updateById(ctx.params.id, ctx.request.body);
};

updateEvent.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
  body: {
    date: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
  },
};

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Deletes an  event
 *     parameters:
 *       - $ref: "#/components/parameters/idParam" 
 *     description: Deletes an event.
 *     tags:
 *      - Events
 *     responses:
 *       204:
 *     security:
 *       - bearerAuth: []
 */
const deleteEvent = async (ctx) => {
  await eventService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteEvent.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/events",
  });

  //publieke routes
  router.get("/", validate(getAllEvents.validationScheme), getAllEvents);

  const requireAdmin = makeRequireRole(Role.ADMIN);
  //private routes
  router.post("/", validate(createEvent.validationScheme), requireAuthentication, requireAdmin, createEvent);
  router.put("/:id", validate(updateEvent.validationScheme), requireAuthentication, requireAdmin, updateEvent);
  router.delete("/:id", validate(deleteEvent.validationScheme), requireAuthentication, requireAdmin, deleteEvent);

  app.use(router.routes()).use(router.allowedMethods());
};