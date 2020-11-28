require('dotenv').config();

module.exports = {

  development: {
    database: 'epic_mail_dev',
    username: 'epic',
    password: 'password',
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  test: {
    database: 'epic_mail_test',
    username: 'epic',
    password: 'password',
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
};
