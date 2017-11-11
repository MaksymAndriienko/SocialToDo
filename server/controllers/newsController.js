var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var following = require('../database/following');
var decodeInformation = require('../services/decodeInformation');

module.exports.getNews = function(req, res){
    console.log('Hello');
    idUser = decodeInformation.getInformation(req.body.id);
    following.find({
        idFollowering: idUser
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
                requestUsers.push({userId: reletions[i].idFollower});
            }
            Task.find({
                $or: requestUsers
            }, function(err, tasks){
                if(err){
                    throw err;
                }
                else{
                    res.send(tasks);
                }
            });
        }
    })
}