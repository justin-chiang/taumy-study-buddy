const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// @desc    Create new user in db
// @route   POST /register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists',
            error: true
        })
    }

    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: 'Error creating user',
            error: err
        });
    }
}

// @desc    Login user with email and password
// @route   POST /login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET,
            { expiresIn: '30d', }
        )
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        });
    }
    else {
        return res.status(404).json({
            message: 'Unable to login',
            user: false,
            error: true
        });
    }
}

// @desc    Obtains all registered users in database (for Pi use)
// @route   GET /everyone
const getEveryone = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(404).json({
            message: 'Error fetching users',
            error: err
        });
    }
}

// @desc    Obtains user data based on generated JWT for session
// @route   GET /whoami
const getWho = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports = {
    registerUser,
    loginUser,
    getEveryone,
    getWho
}