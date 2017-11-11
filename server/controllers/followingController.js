var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var following = require('../database/following');
var decodeInformation = require('../services/decodeInformation');

function saveRelation(){

}

module.exports.follower = function(req, res){
    var followingDB = new following;
    followingDB.idFollower = decodeInformation.getInformation(req.body.idFollower);
    User.findOne({
        username: req.body.userFollowing
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            followingDB.idFollowering = user._id;
            followingDB.save(function(err){
                if (err) {
                    return res.json({success: false, msg: 'Error'});
                }
                res.json({success: true, msg: 'Successful'});
            })
        }
    });
    
}

module.exports.testGet = function(req, res){
    following.findOne({
        _id: req.body.id
    }).populate('idFollower')
    .populate('idFollowering').exec(function(err, data){
        console.log(data);
    });
}

module.exports.cheakFollowing = function(req, res){
    var idFollower = decodeInformation.getInformation(req.body.idFollower);
    User.findOne({
        username: req.body.userFollowing
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            following.findOne({
                idFollower: idFollower,
                idFollowering: user._id
            }, function(err, data){
                if(err) throw err;
                else if(!data){
                    res.json({
                        success: false,
                        msg: 'Error'
                    })
                }
                else{
                    res.json({
                        success: true,
                        msg: 'Successful'
                    })
                }
            })
        }
    });
}

module.exports.getFollowers = function(req, res){
    var user = decodeInformation.getInformation(req.params.iduser);
    following.find({
        idFollowering: user._id
    }, function(err, data){
        if(err) throw err;
        else if(!data){
            res.send({
                success: false,
                msg: 'Error'
            })
        }
        else{
            console.log(data);
            res.send({
                success: true,
                msg: 'Successful'
            })
        }
    });
}