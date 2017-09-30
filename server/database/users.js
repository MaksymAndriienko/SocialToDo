var mongoose = require(mongoose);

module.exports = mongoose.module('User', {

    username: String,
    password: String,
    firstname: String,
    lastname: String,
    gender: String,
    avatar: String

});