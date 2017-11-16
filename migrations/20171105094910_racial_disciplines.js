
exports.up = function(knex, Promise) {
  return Promise.resolve(knex.schema.createTableIfNotExists('racial_disciplines', function(t) {
      t.integer('race_id').references('races.id');
      t.integer('discipline_id').references('disciplines.id');
  }))
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('racial_disciplines'));
};
