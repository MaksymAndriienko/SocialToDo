var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      default: ''
    },
    birthday: {
      type: String,
      default: ''
    },
    languages: {
      type: String,
      default: ''
    },
    lives: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    email: String,
    avatar: {
      type: String,
      default: ''
    },
    reletions:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Following'
    }]
  });

userSchema.pre('save', function(next){
  var user = this;
  if(this.isNew){
    bcrypt.genSalt(10, function(err, salt){
      if(err){
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }
  else{
    return next();
  }
});

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
  
module.exports = User;