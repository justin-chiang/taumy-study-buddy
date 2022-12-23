const express = require("express");
const router = express.Router();

// controllers
const { registerUser, loginUser, getEveryone, getWho } = require('../controllers/userController');

// middleware
const { authenticateToken } = require('../middleware/userAuth');

// routes

// Register new user given name, email, password
router.post('/register', registerUser);

// Login with email and password
router.post('/login', loginUser);

// Obtain list of all registered users (for Pi use)
router.get('/everyone', getEveryone);

// Obtain user data of generated JWT
router.get('/whoami', authenticateToken, getWho)

module.exports = router;