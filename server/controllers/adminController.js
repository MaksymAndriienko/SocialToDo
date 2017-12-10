var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var emailController = require('../controllers/emailController');

module.exports.changeBlockingUser = function(req, res){

    User.findByIdAndUpdate({
        _id: req.body._id
    }, {isActive: req.body.isActive}, {new: true}, function(error, user){
        if(error)
            throw error;
        else if(!user){
            res.send({
                msg: 'User not found',
                success: false
            });
        }
        else{
            res.send({
                success: true,
                isActive: user.isActive
            });
            emailController.sendMessage(user.email, 'Delete account', 'Delete account ' + user.username);
        }
    });

}

module.exports.deleteGoal = function(req, res){

    Task.findByIdAndRemove({
        _id: req.body._id
    }, function(error, task){
        if(error)
            throw error;
        else if(!task){
            res.send({
                success: false,
                msg: 'Goal not found'
            })
        }
        else{
            res.send({
                success: true,
                msg: 'Goal is deleted'
            })
        }
    });

}