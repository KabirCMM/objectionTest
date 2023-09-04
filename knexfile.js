module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'user',
        database: 'user_management',
      },
      migrations: {
        directory: '/home/codemymobile/objection-crud/database/src/database/migrations',
      },
    },
  };
  