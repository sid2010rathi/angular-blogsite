var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = mongoose.model('User');
const { JWT_SECRET } = require('../utility/utility');

async function createUser(req, res) {
    
    const { name, email, password: plainTextPassword,
         dob, address, city, province, 
         zipcode, phone, image } = req.body;

    // validation code goes here, make utility function

    const password = await bcrypt.hash(plainTextPassword, 5);

    try {
        const response = await User.create({
            name,
            email,
            password,
            dob,
            address,
            city,
            province,
            zipcode,
            phone,
            image
        });
        console.log("User Created: ", response);
        return res.json({status: 'ok', data: response});
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error:"User is already register"});
        }
        throw error;
    }
}

async function login(req, res) {
    const {email, password} = req.body;
    
    // validation code goes here, make utility function

    const user = await User.findOne({email}).lean();

    if(!user) {
        return res.json({status:"error", error:"User not found"});
    }
    
    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET)
        return res.json({status: 'ok', data:{token: token}});
    }
    return res.json({status: 'error', error:"Invalid username/password"});
}

async function updateUser(req, res) {
    
    const { dob, address, city, province, 
         zipcode, phone, image } = req.body;
    const userid = req.params.userid;

    // validation code goes here, make utility function

    try {
        const response = await User.updateOne({ _id: userid }, {
            dob,
            address,
            city,
            province,
            zipcode,
            phone,
            image
        });
        console.log("User Created: ", response);
        return res.json({status: 'ok', data: response});
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error:"User is already register"});
        }
        throw error;
    }
}

async function getUser(req, res) {
    console.log(req.params)
    const { token } = req.params;

    // validation code goes here, make utility function

    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        if(user) {
            const {_id, email} =  user;
            const userData = await User.findOne({email}).lean();
            console.log(userData);
            return res.json({status: 'ok', data: userData});
        } else {
            return res.json({status: 'error', data: "User not found"});
        }
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error:"User is already register"});
        }
        throw error;
    }
}

module.exports = {
    createUser,
    updateUser,
    login,
    getUser
}