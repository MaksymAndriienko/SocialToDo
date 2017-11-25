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
    })
    .lean()
    .populate({
        path: "likes",
        select: '_id'
    })
        .skip(skipItem)
        .limit(5)
        .exec(function(error, data){
        if(error){
            console.log(error);
        }
        else if(!data){
            res.send({
                success: false,
                msg: 'Not found tasks'
            })
        }
        else{
            data.forEach(function(task, index){
                if(task.likes.length == 0){
                    task.isLike = false;
                }
                else{
                    task.likes.every(function(like, index){
                        if(like._id == decode._id){
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
            res.send(data);
        }
    })
}

module.exports.like = function(req, res){
    var decode = jwt.decode(req.body.id_user, config.secret);
    Task.find({
        _id: mongoose.Types.ObjectId(req.body.id),
        likes: {$in: [decode._id]}
    }, function(err, task){
        if (err) throw err;
        
        if(!task){
            res.send({
                success: false,
                msq: 'Error, task not find'
            })
        }
        else{
            if(task == ''){
                setLikes(req, res);
            }
            else{
                deleteLike(req, res);
            }
        }
    });
}

function setLikes(req, res){
    var decode = jwt.decode(req.body.id_user, config.secret);
    Task.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.body.id)
    }, {$push: {likes: decode._id}}, {new: true}) 
    .lean()
    .exec(function(err, task){
        if (err) throw err;
        
        if(!task){
            res.send({
                success: false,
                msq: 'Error, task not find'
            })
        }
        
        else{
            task.isLike = true;
            res.send({
                taskLike: task.isLike,
                success: true,
                msg: 'Good'
            });
        }
    });
}

function deleteLike(req, res){
    var decode = jwt.decode(req.body.id_user, config.secret);
    Task.update({
        _id: mongoose.Types.ObjectId(req.body.id)
    }, {"$pull": {likes: decode._id}}, {new: true}) 
    .lean()
    .exec(function(err, task){
        if (err) throw err;
        
        if(!task){
            res.send({
                success: false,
                msq: 'Error, task not find'
            })
        }
        
        else{
            task.isLike = false;
            res.send({
                taskLike: task.isLike,
                success: true,
                msg: 'Good'
            });
        }
    });
}

module.exports.getTasksAnother = function(req, res){
    var itemToShow = 5;
    var skipItem = (req.params.page * itemToShow) - itemToShow;
    var decode = jwt.decode(req.params.token, config.secret);
    Task.find({
        user: req.params.username
    }, null, { skip: skipItem, limit: 5 }) 
    .lean()
    .populate({
        path: "likes",
        select: '_id'
    })
    .exec(function(error, data){
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
            data.forEach(function(task, index){
                if(task.likes.length == 0){
                    task.isLike = false;
                }
                else{
                    task.likes.every(function(like, index){
                        if(like._id == decode._id){
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
            res.send(data);
        }
    })
}

module.exports.UpdateTask = function(req, res){
    Task.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.body._id)
    }, {$set: req.body}, function(err, task){
        if (err) throw err;

        if(!task){
            res.send({
                success: false,
                msq: 'Error, task not find'
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