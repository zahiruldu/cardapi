var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config/config');

/*
 |--------------------------------------------------------------------------
 | Middleware authentication
 |--------------------------------------------------------------------------
 */
exports.requireAuthentication = function(req, res, next) {
  var token = req.headers.token;
  if(!token) {
    return res.status(401).send({message: 'token not found'});
  }

  var payload = null;
  try { 
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }
  // Token Expiration Check
  if (payload.expire <= Date.now()) {
    return res.status(401).send({
      message: 'Token has expired'
    });
  }
  req.user = payload.sub;
  next();
}
