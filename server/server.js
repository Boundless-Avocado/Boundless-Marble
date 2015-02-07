var express = require('express');
var mongoose = require('mongoose');
var reloader = require('connect-livereload');
var sqldb = require('./db/index.js');
var app = express();
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server now listening on port ' + port);

var MONGO_IP = process.env.MONGO_HOST || 'localhost';

mongoose.connect('mongodb://' + MONGO_IP + '/guac'); // connect to mongo database named guac

// configure server with middleware and routing
require('./middleware.js')(app, express);

// export app for testing and flexibility
module.exports = app;


/* Walkthrough of the server

Express and our server are initialized here.
Next, we then inject the server and express into our config/middlware.js file for setup.
We also exported our server for easy testing.

middleware.js requires all express middlware and sets it up
We also create individual routers for our main features: users, groups, and clients
each feature has it's own folder with a model, controller, and route file
  the respective file is required in middlware.js and injected with its mini router
  that route file then requires the respective controller and sets up all the routes
  that controller then requires the respective model and sets up all our endpoints which respond to request */
