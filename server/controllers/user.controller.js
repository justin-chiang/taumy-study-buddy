const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        return res.json({ status: 'ok' });
    } catch (err) {
        console.log(err);
        return res.json({ status: 'error', error: err });
    }
};

exports.userLogin = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign(
            {
                name: req.body.name,
                email: req.body.email,
            },
            process.env.JWT_SECRET
        )
        console.log(token);
        return res.json({ status: 'ok', user: token });
    }
    else {
        return res.json({ status: 'error', user: false });
    }
};