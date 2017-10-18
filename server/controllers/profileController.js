var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../database/users');

module.exports.getUserProgile = function(req, res){

    User.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.send({
                success: false,
                msg: 'Error, user not find'
            })
        }
        else{
            console.log(user);
        }
    });

}