var  path = require('path');
var users = require(__dirname + '/../controller/user.controller');
var cards = require(__dirname + '/../controller/card.controller');
var cardsets = require(__dirname + '/../controller/cardset.controller');
var groups = require(__dirname + '/../controller/group.controller');
var answers = require(__dirname + '/../controller/answer.controller');
var mongoose = require("mongoose");

// importing auth middleware
var isAuthenticate = require('../config/middleware/authenticate');


var authRequired = isAuthenticate.requireAuthentication;

module.exports = function(app,passport){

	app.route('/').get(users.index);
	app.route('/register').post(users.register);
	app.route('/login').post(users.login);
	app.route('/home').get(authRequired,users.home);
	app.route('/createCard').post(authRequired,cards.create);
	app.route('/createCardset').post(authRequired,cardsets.create);



}
