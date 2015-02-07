var Sequelize = require('sequelize');

var db = new Sequelize('avocado', 'guacman', process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.SQL_HOST || 'localhost',
  port: process.env.SQL_PORT || 3306
});

module.exports = db;
