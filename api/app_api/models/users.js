var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:true
    },
    email: {
        type: String, 
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    dob: {
        type: Date
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    zipcode: {
        type: String
    },
    phone: {
        type: Number
    },
    image: {
        type: String
    }
}, {timestamps: true}
);

mongoose.model('User', UserSchema, 'users');