var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

//setup the mongoose models for a user
var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//custom save function to encrypt the password
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//compare the password so we never see the real password
UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

//export the user model
module.exports = mongoose.model('User', UserSchema);
