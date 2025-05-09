const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Vui lòng cung cấp token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.warn('Invalid token:', error);
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = requireAuth;