var  path = require('path');
var users = require(__dirname + '/../controller/user.controller');
var mongoose = require("mongoose");
// importing model
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Card = mongoose.model('Card');
var Cardset = mongoose.model('Cardset');
// importing auth middleware
var isAuthenticate = require('../config/middleware/authenticate');


var authRequired = isAuthenticate.requireAuthentication;

module.exports = function(app,passport){

	app.route('/').get(users.index);
	app.route('/register').post(users.register);
	app.route('/login').post(users.login);
	app.route('/home').get(authRequired,users.home);



}
