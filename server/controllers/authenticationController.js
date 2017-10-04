var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
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
            gender: req.body.gender,
            email: req.body.email,
            avatar: req.body.avatar
        });

        console.log(newUser);

        newUser.save(function(err){
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        })
    }
}