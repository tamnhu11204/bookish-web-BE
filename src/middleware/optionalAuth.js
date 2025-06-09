const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            console.warn('Invalid or expired token:', err.message); // log message ngắn gọn hơn
            console.log('Received Authorization header:', req.headers);
            console.log('Extracted token:', token);

            req.user = null;
            return next();
        }
        req.user = user;
        next();
    });
};

module.exports = optionalAuth;
