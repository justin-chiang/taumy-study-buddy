const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
require("dotenv").config();

// @desc    Create new user in db
// @route   POST /register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: lowerCaseEmail });
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists',
            error: true
        })
    }

    try {
        const user = await User.create({
            name,
            email: lowerCaseEmail,
            password,
        });
        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        const message = `Hi ${user.name},\n\nThanks for registering an account to use Taumy! Click the following link to verify your account:\n\nhttps://taumy-study.onrender.com/verify/${user.id}/${token.token}`;
        await sendEmail(user.email, "Verify Email to use Taumy!", message);

        console.log(message);

        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token.token,
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
    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail, password });

    if (user) {

        if (!user.verified) {
            return res.status(403).json({
                message: 'User not verified',
                user: false,
                error: true
            });
        }

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

const verifyToken = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id });
        if (!user) {
            return res.status(400).json({
                message: "Invalid link",
                error: true
            });
        }
    
        const token = await Token.findOne({
            userId: user._id,
            token: req.body.token,
        });
        if (!token) {
            return res.status(400).json({
                message: "Invalid link",
                error: true
            });
        }
    
        await User.updateOne({ _id: user._id }, { verified: true });
        await Token.findByIdAndRemove(token._id);
    
        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            verified: true
        });
    } catch (err) {
        return res.status(400).json({
            message: 'Error verifying user',
            error: err
        })
    }
};

// @desc    Obtains all registered users in database (for Pi use)
// @route   GET /everyone
const getEveryone = async (req, res) => {
    try {
        const allUsers = await User.find({ verified: true });
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
    try {
        res.status(200).json(req.user);
    } catch (err) {
        return res.status(404).json({
            message: 'Error obtaining user',
            error: err
        });
    }
    
}

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    getEveryone,
    getWho
}