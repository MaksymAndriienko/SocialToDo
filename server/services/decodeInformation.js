var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');

module.exports.getInformation = function(token){
    return jwt.decode(token, config.secret);
}