var groupController = require('../groups/groupController.js');
var userController = require('../users/userController.js');
var multiparty = require('multiparty');

module.exports = function (app) {
  app.post('/twilio', function (req, res){
    userController.findByPhone(req.body.From.slice(2), function (user) {
      req.user = user;

      if (req.body.Body.slice(0,5).toUpperCase() === "JOIN ") {
        groupController.find({name: req.body.Body.slice(5)}, function (group) {
          req.group = group;
          req.body.phone = user.phone;
          groupController.join(req, res);
        });

      } else if (req.body.Body.slice(0,7).toUpperCase() === "CREATE ") {
        req.body = {
          'name': req.body.Body.slice(7),
          'username': req.user.username
        };
        groupController.create(req, res);

      // } else if (req.body.Body === "BROWSE"){
      //   groupController.browse(req, res);

      // } else if (req.body.body.slice(0,7).toUpperCase() === "SIGNUP ") {
      //   TODO: prompt user info via sms
      //   userController.signup(req, res);

      } else {
        var smsBody = req.body.Body.toLowerCase();
        if(req.body.Body[0] === '@') {
          var where = {name: smsBody.slice(1, smsBody.indexOf(' '))};
        } else {
          var where = {id: req.user.lastMessageGroup}
        }
        groupController.find(where, function (group) {
          req.group = group;
          groupController.ping(req, res);
        });
      }
    });
  });

  app.post('/sendgrid', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var start = fields.from[0].indexOf('<');
      var end = fields.from[0].indexOf('>');
      userController.findByEmail(fields.from[0].slice(start + 1, end), function (user) {
        req.user = user;

        if (fields.subject[0].slice(0,5).toUpperCase() === "JOIN ") {
          groupController.find({name: fields.subject[0].slice(5)}, function (group) {
            req.group = group;
            req.body.username = user.username;
            groupController.join(req, res);
          });

        } else if (fields.subject[0].slice(0,7).toUpperCase() === "CREATE ") {
          req.body = {
            'name': fields.subject[0].slice(7),
            'username': req.user.username
          };
          groupController.create(req, res);

        // } else if (fields.subject[0].slice(0,7).toUpperCase() === "BROWSE"){
        //   groupController.browse(req, res);

        } else {
          groupController.find({name: fields.subject[0].toLowerCase()}, function (group) {
            req.group = group;
            groupController.ping(req, res);
          });
        }
      })
    });
  });
};
