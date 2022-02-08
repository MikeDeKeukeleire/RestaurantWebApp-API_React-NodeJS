const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.ingredients, (table) => {
      table.uuid("id").primary().notNullable();
      table.string("ingredients", 250);
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.ingredients);
  },
};