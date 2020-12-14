
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, username: 'hello',password: '1212',role: 'muchness'},
        {id: 2, username: 'from',password: '1414',role: 'awesome'},
        {id: 3, username: 'here',password: '1616',role: 'doggo'}
      ]);
    });
};
