const jwt = require('jsonwebtoken');
const Session = require('../models/studyModel');
const User = require('../models/userModel');
require("dotenv").config();

// @desc    Create new study session (for Pi)
// @route   POST api/study/createSession
const createSession = async (req, res) => {
    const { userId, duration, success, start, end, date } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        const session = await Session.create({
            user: user.name,
            userId,
            duration,
            success,
            start,
            end,
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
// @route   GET api/study/getSessions
const getSessions = async (req, res) => {
    try {
        let sessions = await Session.find({ userId: req.user._id });
        sessions = sessions.sort((a, b) => b.start - a.start);
        const sessionsData = sessions.map((session) => 
            ({
                date: session.start.toLocaleString().split(',')[0],
                startTime: session.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: session.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                success: session.success,
                duration: Math.floor(session.duration / 60) + 'h ' + session.duration % 60 + 'm',
            })
        );
        console.log(sessionsData);
        return res.status(200).json(sessionsData);
    } catch (err) {
        return res.status(404).json({
            message: 'Error fetching sessions',
            error: err
        });
    }
}

// @desc    Update study session (likely not used)
// @route   PUT api/study/updateSession
const updateSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(400).json({
                message: 'Session not found',
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
// @route   DELETE api/study/deleteSession
const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(400).json({
                message: 'Session not found',
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

// @desc    Gets whether or not user has studied today
// @route   GET api/study/deleteSession
const getStudiedToday = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log(today);
        console.log(today.toString());

        const todaysSessions = await Session.find({ userId: req.user._id, start: { $gte: today } });

        return res.status(200).json({
            studied: (todaysSessions.length !== 0) && (todaysSessions.some((e) => (e.success)))
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Error fetching data',
            error: err
        });
    }
}

// @desc    Gets study stats for this week and all time on stats page
// @route   GET api/study/deleteSession
const getStudyStats = async (req, res) => {
    try {
        const allSessions = await Session.find({ userId: req.user._id });
        const overallTotal = allSessions.reduce((accumulator, session) => accumulator + session.duration, 0);
        let longestSession = 0;
        if (allSessions.length !== 0) {
            longestSession = Math.max(...allSessions.map(session => session.duration));
        }
        console.log(longestSession);

        const today = new Date();
        const todayDay = today.getDay();
        const begOfWeek = new Date(today.setDate(today.getDate() - todayDay));
        begOfWeek.setHours(0, 0, 0, 0);
        const currDay = new Date();

        console.log(currDay.toString());
        console.log(begOfWeek.toString());

        console.log(currDay);
        console.log(begOfWeek);

        const weekSessions = await Session.find({ userId: req.user._id, start: { $gte: begOfWeek, $lte: currDay } });
        const weekTotal = weekSessions.reduce((accumulator, session) => accumulator + session.duration, 0);

        const pstToday = currDay.toString().substring(0, 15);
        const todaysSessions = weekSessions.filter((session) => {
            const isoString = session.start.toString().substring(0, 15);
            return isoString === pstToday;
        });
        const todayTotal = todaysSessions.reduce((accumulator, session) => accumulator + session.duration, 0);

        return res.status(200).json({
            weekTotal: Math.floor(weekTotal / 60) + 'h ' + weekTotal % 60 + 'm',
            todayTotal: Math.floor(todayTotal / 60) + 'h ' + todayTotal % 60 + 'm',
            overallTotal: Math.floor(overallTotal / 60) + 'h ' + overallTotal % 60 + 'm',
            longestSession: Math.floor(longestSession / 60) + 'h ' + longestSession % 60 + 'm',
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Error fetching data',
            error: err
        });
    }
}

module.exports = {
    createSession,
    getSessions,
    updateSession,
    deleteSession,
    getStudiedToday,
    getStudyStats
}