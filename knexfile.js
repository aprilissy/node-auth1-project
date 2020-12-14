module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // this prevents crashes when working with sqlite3
    connection: {
      filename: './dev.sqlite3'
    },    
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: './data/migrations' // not required
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
  },

  production: {
  }

};
