require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASS,
  DB_HOSTNAME,
  DB_NAME,
  DB_DIALECT
} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  }, 
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  }
}