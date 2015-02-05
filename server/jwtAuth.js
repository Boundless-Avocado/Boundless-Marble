var jwt = require('jwt-simple');
var User = require('./userModel.js');

var secret = 'BoundlessMarble';

module.exports = {
  decodeToken: function(req, res, next){
    var token = req.headers['x-access-token'];

    if(token){
      var decoded = jwt.decode(token, secret);

      User.findOne({where: decoded})
        .then(function(user){
          if(user){
            next();
          } else {
            next(new Error('user does not exist'));
          }
        })

    } else {
      next(new Error('No token'));
    }
  },

  createToken: function(phone){
    return jwt.encode({phone: phone}, secret);
  }
}