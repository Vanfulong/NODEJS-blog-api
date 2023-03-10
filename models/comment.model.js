const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Please add a comment']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Comment', CommentSchema);