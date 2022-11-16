const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.showHome = async (req, res) => {
    console.log(req.body);
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decode.email });
        res.json({
            status: 'ok',
            user: user.name,
            taumyState: 'happy',
            dashboardTest: `Welcome, ${user.name}!`
        });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
};