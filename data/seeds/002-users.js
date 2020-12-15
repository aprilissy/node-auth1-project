
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'hello',password: '1212',role: 'muchness'},
        {username: 'from',password: '1414',role: 'awesome'},
        {username: 'here',password: '1616',role: 'doggo'}
      ]);
    });
};
