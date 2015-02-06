var db = require('../db/index.js');
var Sequelize = require('sequelize');

var User = db.define('Users', {
  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  lastMessageGroup: Sequelize.INTEGER
});

User.sync()
  .complete(function(err){
    if(!!err) {
      console.log('An error occurred while createing the User table: ', err);
    } else {
      console.log('User table created');
    }
  });

module.exports = User;
