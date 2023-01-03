const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    content: {
        type: String,
        required: [true, 'Please add a body']
    },
    thumbnail: {
        type: String,
        required: [true, 'Please add a thumbnail']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    categorys: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { 
        timestamps: true
    }
);
module.exports = mongoose.model('Post', PostSchema);