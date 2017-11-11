var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;   
var config = require('../config/database');
var User = require('../database/users');
var decodeInformation = require('../services/decodeInformation');
var following = require('../database/following');
var Task = require('../database/task');

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

module.exports.getCountByName = function(req, res){
    console.log(req.params);
    var count = {
        countFollower: Number,
        countFollowing: Number,
        countGoals:Number
    }

    User.find({
        username: req.params.name
    }, function(err, user){
        if(err) throw err;
        
        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            following.find({
                idFollower: user[0]._id
            }, function(err, data){
                if(err) throw err;
                else{
                    count.countFollower = data.length;
                }
            });
            following.find({
                idFollowering: user[0]._id
            }, function(err, data){
                if(err) throw err;
                else{
                    count.countFollowing = data.length;
                }
            })
            Task.find({
                userId: user[0]._id
            }, function(err, data){
                if(err) throw err;
                else{
                    count.countGoals = data.length;
                    res.send(count);
                }
            })
        }
    });
}