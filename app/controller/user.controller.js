var User = require('mongoose').model('User');
var path = require("path");
var nodemailer = require("nodemailer");
var crypto = require('crypto');
var Token = require('../helpers/token');
var env = process.env.NODE_ENV || 'development';

var util = require('util'),
    OperationHelper = require('apac').OperationHelper;

exports.index = function(req, res){
	res.send('hello index')
};
exports.home = function(req, res){
	res.send('hello home')
}

exports.register = function(req,res){
	  var query = {
	    'email': req.body.email,
	    'username': req.body.username
	  };
	  // Query in user schema
	  // By email/username
	  User.findOne(query, callback);
	  // First Callback function
	  function callback(error, found) {
	    if (error) {
	      res.status(400).send({
	        message: 'The email or username is already exists.'
	      });
	    } else {
	      const secret = req.body.email;
	      var apiKey = crypto.createHmac('sha256', secret).update(
	          'cardsetsecret').digest('hex');
	      // Get user data
	      var newUser = new User({
	        username: req.body.username.toLowerCase(),
	        email: req.body.email,
	        password: req.body.password,
	        apiKey: apiKey

	      });
	      // Attempt to save the user
	      newUser.save(function(err, user) {
	        if (err) {
	          return res.json({
	            success: false,
	            message: 'Your registration process not complete, please try again!'
	          });
	        } else {
	         // EmailTemplate.accountVerification(user); // Send email verification mail
	          Token.createSendToken(user, res); // response send token and user information
	        }
	      });
	    }
	  }
}


/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
exports.login = function(req, res) {
    req.user = req.body;
    var userEmail = req.user.email.toLowerCase();
    User.findOne({$or: [{'email': userEmail}, {'username': userEmail}] }, function(err, user) {
      if (err) console.log(err);
      if (!user) return res.status(401).send({
        message: 'Invalid_email'
      });
      user.comparePassword(req.user.password, function(err, isMatch) {
        if (err) console.log(err);
        if (!isMatch) return res.status(401).send({
          message: 'Invalid_password'
        });
        if (isMatch) {
          Token.createSendToken(user, res);
        }
      })
    })
  }

