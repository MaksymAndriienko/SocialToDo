var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');

module.exports.signup = function(req, res){
    if(!req.body.username || !req.body.password){
        res.json({
            success: false,
            msg: 'Please pass name and password.'
        });
    } else{
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            about: req.body.about,
            birthday: req.body.birthday,
            languages: req.body.languages,
            lives: req.body.lives,
            from: req.body.from,
            gender: req.body.gender,
            email: req.body.email,
            avatar: req.body.avatar
        });
        newUser.save(function(err){
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        })
    }
}

module.exports.signin = function(req, res){
    console.log(req.body);
    User.findOne({
        username: req.body.username
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false, 
                msg: 'Authentication failed. User not found.'
            });
        }
        else{
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    var token = jwt.encode(user, config.secret);
                    res.json({
                        success: true,
                        msg: 'Hello ' + user.username,
                        token: token,
                        _id: user._id,
                        displayName: user.firstname + user.lastname,
                        username: user.username,
                        avatar: user.avatar
                    });
                }
                else{
                    res.send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
}