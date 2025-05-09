const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        req.user = null;
        return next();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            console.warn('Invalid or expired token:', err);
            req.user = null; // Tiếp tục như guest
            return next();
        }
        req.user = user;
        next();
    });
};

module.exports = optionalAuth;