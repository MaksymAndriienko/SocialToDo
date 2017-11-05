var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../database/users');
var decodeInformation = require('../services/decodeInformation');

module.exports.getUserProgile = function(req, res){
    var userId = decodeInformation.getInformation(req.params.id);
    User.findOne({
        _id: mongoose.Types.ObjectId(userId._id)
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            res.send(user);
        }
    });

}

module.exports.editUserProfile = function(req, res){
    
    User.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, {$set:req.body}, function(err, user){
        if (err) throw err;

        if(!user){
            res.send({
                success: false,
                msq: 'Error, user not find'
            })
        }

        else{
            res.send({
                success: true,
                msg: 'Good'
            });
        }
        
    });
}

module.exports.getUserProgileAnother = function(req, res){
    User.findOne({
        username: req.params.username
    }, function(err, user){
        if(err) throw err;
        
        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            res.send(user);
        }
    });

}