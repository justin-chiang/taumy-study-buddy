const express = require("express");
const router = express.Router();

// controllers
const { createSession,
    getSessions,
    updateSession,
    deleteSession } = require('../controllers/studyController');

// middleware
const { authenticateToken } = require('../middleware/userAuth');
router.use(authenticateToken);

// routes
router.post('/createSession', createSession);
router.get('/getSessions', getSessions);
router.put('/updateSession', updateSession);
router.delete('/deleteSession', deleteSession);

module.exports = router;