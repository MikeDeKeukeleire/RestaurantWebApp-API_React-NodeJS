const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.menu).delete();
    await knex(tables.ingredients).delete();
    await knex(tables.user).delete();
  },
};