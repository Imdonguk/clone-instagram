const dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV || 'development'

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    cookiename: process.env.COOKIE_NAME,
    cookieSecret: process.env.COOKIE_SECRET,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: 'woogieboogie',
    password: 'woogieboogie',
    database: 'woogieboogie',
    host: 'woogieboogie',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: 'woogieboogie',
    password: 'woogieboogie',
    database: 'woogieboogie',
    host: 'woogieboogie',
    dialect: 'mysql',
    operatorsAliases: false,
  },
}[env]
