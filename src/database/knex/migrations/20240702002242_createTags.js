exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // Ligaçao com o ID de notes
    table.integer("user_id").references("id").inTable("users"); // Ligaçao com o ID do usuario
  });

exports.down = (knex) => knex.schema.dropTable("tags");
