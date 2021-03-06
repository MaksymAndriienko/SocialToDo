var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskShema = new Schema({
    user: String,
    userId: String,
    title: String,
    proces: String,
    content: String,
    image: {
        type: String,
        default: '/assets/image/italian.jpg'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    data: {
        type: Date,
        default: Date.now
    },
    isFavourite:{
        type: Boolean,
        default: false
    }
}) 

var Task = mongoose.model('Task', taskShema);
module.exports = Task;