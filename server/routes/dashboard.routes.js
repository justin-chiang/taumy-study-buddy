const express = require("express");
const router = express.Router();

// controllers
const { showHome } = require('../controllers/dashboard.controller');

// middleware

// routes
router.get('/home', showHome);

module.exports = router;