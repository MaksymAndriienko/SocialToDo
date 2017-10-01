var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    avatar: String
  });

var User = mongoose.model('User', userSchema);
  
module.exports = User;