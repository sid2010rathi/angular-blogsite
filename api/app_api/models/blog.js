var mongoose = require('mongoose');
var CommentSchema = require('./comments');

var blogSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    favourites: {
        type: Boolean,
        default: false
    
    },
    comments: [CommentSchema]
}, {timestamps: true}
);

mongoose.model('Blog', blogSchema, 'blogs');