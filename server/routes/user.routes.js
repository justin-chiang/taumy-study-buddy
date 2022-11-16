const express = require("express");
const router = express.Router();

// controllers
const { createUser, userLogin } = require('../controllers/user.controller');

// middleware
// const { authenticateToken } = require('../middleware/userauth')

// router.use(authenticateToken);

// routes
router.post('/register', createUser);
router.post('/login', userLogin);

module.exports = router;