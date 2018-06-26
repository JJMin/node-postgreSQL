exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("milestones", function(table) {
      table.increments("id");
      table.string("description");
      table.string("date_achieved");
      table.integer("famous_person_id").notNullable();
      table.foreign("famous_person_id").references("id").inTable("famous_people");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("milestones")]);
};
