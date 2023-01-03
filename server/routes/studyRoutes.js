const express = require("express");
const router = express.Router();

// controllers
const { createSession, getSessions, updateSession, deleteSession, getStudiedToday, getStudyStats } = require('../controllers/studyController');

// middleware
const { authenticateToken } = require('../middleware/userAuth');

// routes

// Create study session given user id, study session params (for Pi use)
router.post('/createSession', createSession);

// Gets all study sessions for a user by generated JWT (for web app use)
router.get('/getSessions', authenticateToken, getSessions);

// Updates study session (unused)
router.put('/updateSession', updateSession);

// Deletes study session (unused)
router.delete('/deleteSession', deleteSession);

router.get('/getStudiedToday', authenticateToken, getStudiedToday)

// Gets study data displayed on dashboard stats page
router.get('/getStudyStats', authenticateToken, getStudyStats);

module.exports = router;