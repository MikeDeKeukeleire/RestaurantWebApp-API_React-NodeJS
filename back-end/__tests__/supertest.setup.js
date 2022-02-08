const supertest = require("supertest");

const createServer = require("../src/createServer");
const {
  getKnex
} = require("../src/data");

/**
 * Sign in using the admin test user.
 *
 * @param {supertest.SuperTest<supertest.Test>} supertest - The supertest agent to use
 *
 * @returns {Promise<string>} The Authorization header to use.
 */
const loginAdmin = async (supertest) => {
  const response = await supertest.post("/api/user/login")
    .send({
      username: "Mike test",
      password: "12345678",
    });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  loginAdmin,
  withServer,
};