var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var following = require('../database/following');
var decodeInformation = require('../services/decodeInformation');

module.exports.follower = function(req, res){
    var followingDB = new following;
    followingDB.idFollower = decodeInformation.getInformation(req.body.idFollower);
    User.findOne({
        username: req.body.userFollowing
    }) 
    .populate({
        path: 'reletions',
        match: {idFollower: followingDB.idFollower}
    })
    .exec(function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            followingDB.idFollowering = user._id;
            followingDB.save(function(err, data){
                if (err) {
                    return res.json({success: false, msg: 'Error'});
                }
                else{
                    User.update({
                        $or:[{_id: user._id}, {_id: followingDB.idFollower}]
                    }, {$push: {reletions: data._id}}, {upsert: true, multi: true}, function(err, data){
                        if(err){
                            res.send({
                                success: false,
                                msg: err
                            })
                        }
                        else{
                            User.findOne({
                                username: req.body.userFollowing
                            }).populate({
                                path: 'reletions',
                                match: {idFollower: followingDB.idFollower}
                            }).exec(function(err, user){
                                res.send({
                                    user: user,
                                    success: true,
                                    msg: 'Successful'
                                }) 
                            });
                        }
                    })
                }
            })
        }
    });
}

module.exports.unfollowing = function(req, res){
    var followingDB = new following;
    idFollower = decodeInformation.getInformation(req.body.idFollower);
    User.findOne({
        _id: idFollower
    })
    .populate({
        path: 'reletions',
        match: {idFollowering: req.body._id},
        populate: {
            path: 'idFollowering',
            model: 'User'
          }
    })
    .exec(function(error, data){
        following.remove({
            _id: mongoose.Types.ObjectId(data.reletions[0]._id)
        }).exec(function(error, dataR){
            if(error)
                throw error;
            else{
                User.update({
                    $or:[{_id: idFollower}, {_id: req.body._id}]
                },
                {$pull: {reletions: data.reletions[0]._id}}, {upsert: true, multi: true}, function(err, data){
                    if(err){
                        res.send({
                            success: false,
                            msg: err
                        })
                    }
                    else{
                        User.findOne({
                            _id: req.body._id
                        }).populate({
                            path: 'reletions',
                            match: {idFollower: idFollower}
                        }).exec(function(error, user){
                            res.send({
                                user: user,
                                success: true,
                                msg: 'Successful'
                            }) 
                        });
                    }
                });
            }
        });
    });
}

module.exports.testGet = function(req, res){
    User.find().limit(300).populate({
        path: 'reletions',
        match: {idFollower: "59fee47e6f22e00cc89fb728"}
    }).exec(function(error, data){
        res.send(data);
    });
    // following.find().populate({
    //     path: 'idFollower',
    //     match: {_id: "59fee47e6f22e00cc89fb728"}
    // })
    // .populate('idFollowering').exec(function(err, data){
    //     res.send(data);
    // });
}

module.exports.cheakFollowing = function(req, res){
    var idFollower = decodeInformation.getInformation(req.body.idFollower);
    User.findOne({
        username: req.body.userFollowing
    })
    .populate({
        path: 'reletions',
        match: {idFollower: idFollower}
    }) 
    .exec(function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            if(user.reletions.length == 1){
                res.json({
                    success: true,
                    msg: 'Successful'
                })
            }
            else{
                res.json({
                    success: false,
                    msg: 'Error'
                })
            }
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
            res.send({
                success: true,
                msg: 'Successful'
            })
        }
    });
}

module.exports.getUsers = function(req, res){
    var user = decodeInformation.getInformation(req.body.token);
    User.find().limit(10).populate({
        path: 'reletions',
        match: {idFollower: user._id}
    }).exec(function(error, data){
        res.send(data);
    });
}