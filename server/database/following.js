var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followingShema = new Schema({
    idFollower: {
        type: String,
        required: true
    },
    idFollowering: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
}) 

var Following = mongoose.model('Following', followingShema);
module.exports = Following;