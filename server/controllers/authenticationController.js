var mongoose = require('mongoose');
var User = require('../database/users');

module.exports.signup = function(req, res){
    var user = new User(req.body);
    console.log(user);
    user.save(function(err){
        if(err)
            throw err;
        
        console.log('User saved successfully!');
    });

    res.json(req.body);
}