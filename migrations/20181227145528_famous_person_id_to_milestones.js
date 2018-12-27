exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table) {
      table.integer('famous_person_id');
      table.foreign('famous_person_id').references('famous_people.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table) {
      table.dropColumn('famous_person_id');
    })
  ]);
};