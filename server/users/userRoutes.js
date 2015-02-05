var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  //USER PARAM IS THE USER'S PHONE NUMBER
  app.param('user', userController.parseUserUrl);

  app.get('/', userController.browse);
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);

  app.get('/:user/groups', userController.groups);
  // app.post('/signin', userController.signin);
  // app.get('/signedin', userController.checkAuth);
};
