const jwt = require('jsonwebtoken');
const Session = require('../models/studyModel');
const User = require('../models/userModel');
require("dotenv").config();

// @desc    Create new study session (for Pi)
// @route   POST study/createSession
const createSession = async (req, res) => {
    const { userId, duration, success, startTime, endTime, date } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        const session = await Session.create({
            user: user.name,
            userId,
            duration,
            success,
            startTime,
            endTime,
            date,
        });
        console.log(session);
        return res.status(201).json(session);
    } catch (err) {
        return res.status(400).json({
            message: 'Error creating session',
            error: err
        });
    }
}

// @desc    Get study sessions for logged in user (for web app)
// @route   GET study/getSessions
const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user._id });
        return res.status(200).json(sessions);
    } catch (err) {
        return res.status(404).json({
            message: 'Error fetching sessions',
            error: err
        });
    }
}

// @desc    Update study session (likely not used)
// @route   PUT study/updateSession
const updateSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(400).json({
                message: 'Goal not found',
            });
        }
        if (session.user.toString() !== req._id) {
            return res.status(401).json({
                message: 'User not authorized',
            });
        }

        const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedSession);
    } catch (err) {
        return res.status(400).json({
            message: 'Error updating session',
            error: err
        });
    }
}

// @desc    Delete study session (likely not used)
// @route   DELETE study/deleteSession
const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(400).json({
                message: 'Goal not found',
            });
        }
        if (session.user.toString() !== req.user._id) {
            return res.status(401).json({
                message: 'User not authorized',
            });
        }

        await session.remove();
        return res.status(200).json({ id: req.params.id });
    } catch (err) {
        return res.status(400).json({
            message: 'Error deleting session',
            error: err
        });
    }
}

module.exports = {
    createSession,
    getSessions,
    updateSession,
    deleteSession
}