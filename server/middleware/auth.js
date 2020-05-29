var jwt = require('jsonwebtoken');

var auth = function (req, res, next) {
    
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.supersecret, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Invalid token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
}


module.exports = auth;
