var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followingShema = new Schema({
    idFollower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idFollowering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
}) 

var Following = mongoose.model('Following', followingShema);
module.exports = Following;