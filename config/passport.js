var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

//load up the user models
var User = require('../app/models/user');
var config = require('../config/database'); //get the db config file

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  //define how passport tries to find a user using jtw_payload.id
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
