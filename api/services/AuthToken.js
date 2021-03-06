var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload, options) {
  var token = jwt.sign(payload, process.env.TOKEN_SECRET || sails.config.jwt.token_secret, options);
  return token;
};

module.exports.verifyToken = function(token, callback) {
  return jwt.verify(token, process.env.TOKEN_SECRET || sails.config.jwt.token_secret, {
    algo : 'HS256'
  }, callback);
};


module.exports.decodeToken = function(token) {
  return jwt.decode(token, {complete: true});
};


