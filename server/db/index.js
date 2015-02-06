var Sequelize = require('sequelize');

var db = new Sequelize('avocado', 'guacman', process.env.DB_PASS, {
  dialect: 'mysql',
});

module.exports = db;