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
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'postgres',
  },
};
