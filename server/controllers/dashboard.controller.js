const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// test api to read auth'd user and display message
exports.showHome = async (req, res) => {
    console.log(req.user);
    try {
        const user = await User.findOne({ email: req.user.email });
        res.status(200).json({
            user: user.name,
            email: user.email,
            welcomeMessage: `Welcome, ${user.name}!`,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Could not find user',
            error: err
        });
    }
};