var User = require('./userModel.js');
var bcrypt = require('bcrypt-nodejs');

//USERNAMES ARE PHONE NUMBERS

module.exports = {
  parseUserUrl: function (req, res, next, phone) {
    module.exports.findByPhone(phone, function (user, err) {
      req.user = user;
      next();
    });
  },

  findByPhone: function (phone, callback) {
    User.findOne({where: {phone: phone}})
    .then(function (user) {
      if (!user) {
       res.status(404).send('No user with number ' + phone + ' in database');
      } else {
        callback(user);
      }
    });
  },

  findByEmail: function (email, callback) {
    User.findOne({where: {email: email}})
    .then(function (user) {
      if (!user) {
        res.status(404).send('No user with email ' + email + ' in database');
      } else {
        callback(user);
      }
    });
  },

  browse: function (req, res) {
    User.findAll()
    .then(function (users) {
      res.status(200).send(JSON.stringify(users));
    });
  },

  signup: function (req, res, next) {
    // check to see if user already exists
    console.log(req.body.phone);
    User.findOne({where: {phone: req.body.phone}})
      .then(function(phone) {
        if(phone) {
          res.status(401).send('Phone number already exists');
        } else {
          // make a new user if not one
          var user = User.build(req.body);
          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, null, function(err, hash){
              user.password = hash;
              user.save()
                .complete(function(err){
                  if(!!err){
                    console.log('An error occurred while creating the user: ', err);
                    next(new Error('Error saving user to the database'));
                  } else {
                    console.log('The user was successfully created.');
                    res.status(201).send('User successfully created');
                  }
                });
            });
          });
        }
      })
      // .then(function (user) {
      //   // TODO: create token to send back for auth
      //   // var token = jwt.encode(user, 'secret');
      //   // res.json({token: token});
      //   res.send(req.body);
      // })
      .catch(function (error) {
        next(error);
      });
  },

  signin: function(req, res, next) {
    console.log(req.body.phone);
    User.findOne({ where: { phone: req.body.phone } })
      .then(function(phone){
        if(phone){
          bcrypt.compare(req.body.password, phone.password, function(err, result){
            if(result){
              // return jwt
              console.log(phone);
              console.log('signed in!');
              res.status(200).send(phone);
            } else {
              console.log('Login incorrect');
              res.status(401).send('Login incorrect');
            }
          });
        } else {
          res.status(401).send('Login incorrect');
        }
      })
      .catch(function(error){
        next(error);
      });
  },

  groups: function (req, res) {
    req.user.getGroups()
    .then(function (groups) {
      res.status(200).send(JSON.stringify(groups));
    });
  }
};
