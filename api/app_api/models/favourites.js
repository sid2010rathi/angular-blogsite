var mongoose = require('mongoose');

var favouriteSchema = new mongoose.Schema({
    userid: {
        type: String, 
        required: true
    },
    blogid: {
        type: String, 
        required: true
    }
}, {timestamps: true}
);

mongoose.model('Favourites', favouriteSchema, 'favourites');