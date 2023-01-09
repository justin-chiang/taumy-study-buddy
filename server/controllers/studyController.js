const jwt = require('jsonwebtoken');
const Session = require('../models/studyModel');
const User = require('../models/userModel');
require("dotenv").config();

// @desc    Create new study session (for Pi)
// @route   POST api/study/createSession
const createSession = async (req, res) => {
    const { userId, duration, success, start, end } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        const session = await Session.create({
            user: user.name,
            userId,
            duration,
            success,
            start,
            end
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
// @route   GET api/study/getStudiedToday
const getStudiedToday = async (req, res) => {
    try {
        let today = new Date();
        console.log(today.toISOString());
        today.setHours(today.getHours() - 8);
        console.log(today.toISOString());
        today.setUTCHours(0, 0, 0, 0);
        console.log(today.toISOString());

        const todaysSessions = await Session.find({ userId: req.user._id, start: { $gte: today } });

        return res.status(200).json({
            todaysSessions,
            compareDate: today.toISOString(),
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
        const allSessions = await Session.find({ userId: req.user._id, success: true });

        const overallTotalSessions = allSessions.length;
        const overallTotalTime = allSessions.reduce((accumulator, session) => accumulator + session.duration, 0);
        let longestTotalSession = 0;
        if (allSessions.length !== 0) {
            longestTotalSession = Math.max(...allSessions.map(session => session.duration));
        }

        let currStreak = 0;
        let tempDate = new Date();
        tempDate.setHours(tempDate.getHours() - 8);
        tempDate.setUTCHours(0, 0, 0, 0);
        const studiedPrevDay = (currDay) => {
            let yesterday = new Date(currDay.getTime() - (24 * 60 * 60 * 1000));
            // console.log(currDay.toISOString());
            // console.log(yesterday.toISOString());
            if (allSessions.some((session) => ((yesterday <= session.start) && (session.start <= currDay)))) {
                tempDate = yesterday;
                return true;
            }
            else {
                return false;
            }
        }

        while(studiedPrevDay(tempDate)) {
            currStreak++;
        }

        const allSessionsByDay = allSessions.map((session) => (session.start.toString().substring(0, 15)));
        console.log(allSessionsByDay);
        const totalDaysStudied = [...new Set(allSessionsByDay)].length;

        const today = new Date();
        today.setHours(tempDate.getHours() - 8);

        const todayDay = today.getDay();
        const begOfWeek = new Date(today.setDate(today.getDate() - todayDay));
        begOfWeek.setUTCHours(0, 0, 0, 0);

        const currDay = new Date();
        currDay.setHours(currDay.getHours() - 8);

        console.log(currDay.toISOString());
        console.log(begOfWeek.toISOString());

        const weekSessions = await Session.find({ userId: req.user._id, success: true, start: { $gte: begOfWeek, $lte: currDay } });
        const weekTotalSessions = weekSessions.length;
        const weekTotalTime = weekSessions.reduce((accumulator, session) => accumulator + session.duration, 0);

        const pstToday = currDay.toString().substring(0, 15);
        const todaysSessions = weekSessions.filter((session) => {
            const isoString = session.start.toString().substring(0, 15);
            return isoString === pstToday;
        });
        const todayTotalTime = todaysSessions.reduce((accumulator, session) => accumulator + session.duration, 0);

        if (todaysSessions.length > 0) {
            currStreak++;
        }

        return res.status(200).json({
            currStreak: currStreak,
            weekTotalSessions: weekTotalSessions,
            weekTotalTime: Math.floor(weekTotalTime / 60) + 'h ' + weekTotalTime % 60 + 'm',
            todayTotalTime: Math.floor(todayTotalTime / 60) + 'h ' + todayTotalTime % 60 + 'm',
            totalDaysStudied: totalDaysStudied,
            overallTotalSessions: overallTotalSessions,
            overallTotalTime: Math.floor(overallTotalTime / 60) + 'h ' + overallTotalTime % 60 + 'm',
            longestTotalSession: Math.floor(longestTotalSession / 60) + 'h ' + longestTotalSession % 60 + 'm',
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