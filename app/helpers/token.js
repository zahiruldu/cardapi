var config = require('../config/config'); // Called token secret key
var jwt = require('jwt-simple');
var moment = require('moment');

exports.createSendToken = function(user, res) {
  // Create Token
  var expire = moment().add(7, 'days').valueOf(); // Get current date and time
  var payload = {
    sub: user._id,
    apikey: user.api_key,
    expire: expire
  };
  var token = jwt.encode(payload, config.TOKEN_SECRET); // Encode token with payload and secret key
  // Send Response
  res.status(200).send({
    user: user.toJSON(),
    token: token,
    expire: expire
  });
};