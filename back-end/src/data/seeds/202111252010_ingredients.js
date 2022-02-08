const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.ingredients).delete();

    await knex(tables.ingredients).insert(mockdata.INGREDIENTS);
  },
};