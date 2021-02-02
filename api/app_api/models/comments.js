var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    author: {
        type: String, 
        
    },
    description: {
        type: String, 
   
    },
    date: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true}
);

module.export = {
    CommentSchema
}

//mongoose.model('Comment', CommentSchema, 'comments');