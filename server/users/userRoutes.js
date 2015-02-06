var userController = require('./userController.js');
var groupController = require('../groups/groupController.js');
var jwt = require('../jwtAuth.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  //USER PARAM IS THE USER'S PHONE NUMBER
  app.param('user', userController.parseUserUrl);
  app.param('group', groupController.parseGroupUrl);

  app.get('/', [jwt.decodeToken, userController.browse]);
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);

  app.get('/:user/groups', [jwt.decodeToken, userController.groups]);


  //TODO - protect this route
  app.delete('/:user/groups/:group', userController.leaveGroup);
  // app.post('/signin', userController.signin);
  // app.get('/signedin', userController.checkAuth);
};