var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
var Task = require('../database/task');
var Likes = require('../database/likes');

module.exports.addTask = function(req, res){
    var decode = jwt.decode(req.body.token, config.secret);
    User.findOne({
        _id: decode._id
    }, function(err, user){
        if(err) throw err;

        else{
            var newTask = new Task({
                user: decode.username,
                userId: decode._id,
                title: req.body.title,
                proces: req.body.proces,
                imgage: req.body.image,
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

module.exports.getTasks = function(req, res){
    var decode = jwt.decode(req.params.id, config.secret);
    var itemToShow = 5;
    var skipItem = (req.params.page * itemToShow) - itemToShow;
    Task.find({
        userId: decode._id
    }, null, { skip: skipItem, limit: 5 }, function(error, data){
        if(error){
            throw error;
        }
        else if(!data){
            res.send({
                success: false,
                msg: 'Not found tasks'
            })
        }
        else{
            res.send(data);
        }
    })
}

module.exports.setLikes = function(req, res){
    var like = new Likes({
        idUser: '1',
        idTask: '2'
    });
    like.save(function(error){
        if (error) {
            return res.json({success: false, msg: 'Error save a new like'});
        }
        res.json({success: true, msg: 'Successful created new like.'});
    });
}

module.exports.getTasksAnother = function(req, res){
    var itemToShow = 5;
    var skipItem = (req.params.page * itemToShow) - itemToShow;
    Task.find({
        user: req.params.username
    }, null, { skip: skipItem, limit: 5 }, function(error, data){
        if(error){
            throw error;
        }
        else if(!data){
            res.send({
                success: false,
                msg: 'Not found tasks'
            })
        }
        else{
            res.send(data);
        }
    })
}