var Sequelize = require('sequelize');

var db = new Sequelize('avocado', 'guacman', '', {
  dialect: 'sqlite',
  storage: './db.sqlite'
});

module.exports = db;
