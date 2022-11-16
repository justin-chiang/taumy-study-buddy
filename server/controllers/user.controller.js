const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// creates new user in db using name, phone, email, pw
exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(201).json({
            message: 'Success'
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: 'Error creating user',
            error: err
        });
    }
};

// login with existing user and generate jwt
exports.userLogin = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign(
            {
                name: req.body.name,
                email: req.body.email,
            },
            process.env.JWT_SECRET
        )
        console.log(token);
        return res.status(201).json({
            message: 'Success',
            user: token
        });
    }
    else {
        return res.status(404).json({
            status: 'Unable to login',
            user: false
        });
    }
};