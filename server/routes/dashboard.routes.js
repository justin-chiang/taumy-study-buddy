const express = require("express");
const router = express.Router();

// controllers
const { showHome } = require('../controllers/dashboard.controller');

// middleware
const { authenticateToken } = require('../middleware/auth');
router.use(authenticateToken);

// routes
router.get('/home', showHome);

module.exports = router;