const express = require("express");
const router = express.Router();

// controllers
const { registerUser, loginUser, getWho } = require('../controllers/userController');

// middleware
const { authenticateToken } = require('../middleware/userAuth');

// routes

// register new user
router.post('/register', registerUser);
// login with existing user
router.post('/login', loginUser);
// obtain user data
router.get('/whoami', authenticateToken, getWho)

module.exports = router;