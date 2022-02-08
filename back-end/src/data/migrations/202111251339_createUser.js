const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid("id").primary().notNullable();
      table.string("username").notNullable();
      table.string("password_hash").notNullable();
      table.jsonb("roles").notNullable();
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};