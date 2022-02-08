const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).delete();
    await knex(tables.user).insert(mockdata.USER);
  },
};