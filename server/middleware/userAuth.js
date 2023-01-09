const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log("token auth'd");
        next();
    } catch (err) {
        console.log(err);
        return res.json({ status: 'error', error: err });
    }
}

module.exports = { authenticateToken };