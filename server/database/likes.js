var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likesShema = new Schema({
    idUser: String,
    idTask: String
}) 

var Likes = mongoose.model('Likes', likesShema);
module.exports = Likes;