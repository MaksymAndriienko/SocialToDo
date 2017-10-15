var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');

module.exports.addTask = function(req, res){
    var decode = jwt.decode(req.body.token, config.secret);
    User.findOne({
        _id: decode._id
    }, function(err, user){
        if(err) throw err;

        else{
            var newTask = new Task({
                user: decode.firstname,
                userId: decode._id,
                content: req.body.content
            });
            newTask.save(function(err){
                if (err) {
                    return res.json({success: false, msg: 'Error save a new task'});
                }
                res.json({success: true, msg: 'Successful created new task.'});
            });
        }
    })
}