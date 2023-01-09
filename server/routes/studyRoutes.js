const express = require("express");
const router = express.Router();

// controllers
const { createSession, getSessions, updateSession, deleteSession, getStudiedToday, getStudyStats } = require('../controllers/studyController');

// middleware
const { authenticateToken } = require('../middleware/userAuth');

// routes
router.post('/createSession', createSession);
router.get('/getSessions', authenticateToken, getSessions);
router.put('/updateSession', updateSession); // not used
router.delete('/deleteSession', deleteSession); // not used
router.get('/getStudiedToday', authenticateToken, getStudiedToday)
router.get('/getStudyStats', authenticateToken, getStudyStats);

module.exports = router;