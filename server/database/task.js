var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskShema = new Schema({
    user: String,
    userId: String,
    content: String,
    data: {
        type: Date,
        default: Date.now
    }
}) 

var Task = mongoose.model('Task', taskShema);
module.exports = Task;