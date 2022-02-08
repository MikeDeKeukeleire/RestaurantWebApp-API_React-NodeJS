const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.menu, (table) => {
      table.uuid("id").primary().notNullable();
      table.string("name", 250).notNullable();
      table.double("price").notNullable();
      table.uuid("ingredientsId").notNullable();
      table.string("thumbnail", 250).notNullable();

      table.foreign("ingredientsId", "fk_menu_ingredients")
        .references(`${tables.ingredients}.id`)
        .onDelete("CASCADE")
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.menu);
  },
};