const mockdata = require("../mock-data");
const { tables } = require("..");

module.exports={
  seed: async (knex) => {
    await knex(tables.menu).delete();

    await knex(tables.menu).insert(mockdata.MENU);
  },
};