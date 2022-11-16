const express = require("express");
const router = express.Router();

// controllers
const { createUser, userLogin } = require('../controllers/user.controller');

// middleware

// routes
// test route
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Success',
    });
});

// register new user
router.post('/register', createUser);
// login with existing user
router.post('/login', userLogin);

module.exports = router;