
var request = require('request');
var config = require('../config/database');
var User = require('../database/users');
var mongoose = require('mongoose');

function generateInfo(users){
    users.forEach(function(element, index) {
        
        var newUser = new User({
            username: element.login.username,
            password: element.login.password,
            firstname: element.name.first,
            lastname: element.name.last,            
            gender: element.gender,
            email: element.email,
            avatar: element.picture.large
        });
        console.log(newUser);
        newUser.save(function(err){
            if (err) {
                return console.log('Error save a new user');
            }
            console.log('Successful created new user.' + index);
        })
    });
}

module.exports.generate = function(req, res){
    request.get({
        url: 'https://randomuser.me/api/?results=100',
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if(err){
            console.log(err);
        }
        else if(res.statusCode != 200){
            console.log(res.statusCode);
        }
        else{
            var users = data.results;
            generateInfo(users);
        }
    })
}