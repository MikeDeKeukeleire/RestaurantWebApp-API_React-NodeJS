const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.event, (table) => {
      table.uuid("id").primary().notNullable();
      table.string("date").notNullable();
      table.string("title", 250).notNullable();
      table.string("description", 250).notNullable();
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.event);
  },
};