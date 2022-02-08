const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.event).delete();

    await knex(tables.event).insert(mockdata.EVENT);
  },
};