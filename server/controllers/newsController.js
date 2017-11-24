var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var following = require('../database/following');
var decodeInformation = require('../services/decodeInformation');

module.exports.getNews = function(req, res){
    idUser = decodeInformation.getInformation(req.body.id);
    following.find({
        idFollower: idUser
    }, function(err, reletions){
        if(err) throw err;
        
        if(!reletions){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            var requestUsers = [];
            for(var i = 0; i < reletions.length; i++){
                requestUsers.push({userId: reletions[i].idFollowering});
            }
            if(requestUsers.length == 0){
                res.send({
                    success: false,
                    msg: 'Error'
                })
            }
            else{
                Task.find({
                    $or: requestUsers
                })
                .lean()
                .populate({
                    path: "likes",
                    select: '_id'
                })
                .exec(function(err, tasks){
                    if(err){
                        throw err;
                    }
                    else{
                        tasks.forEach(function(task, index){
                            if(task.likes.length == 0){
                                task.isLike = false;
                            }
                            else{
                                task.likes.every(function(like, index){
                                    if(like._id == idUser._id){
                                        task.isLike = true;
                                        return false;
                                    }
                                    else{
                                        task.isLike = false;
                                        return true;
                                    }
                                });   
                            }
                        })
                        res.send({
                            tasks: tasks,
                            success: true,
                            msg: 'success'
                        });
                    }
                });
            }
        }
    })
}
