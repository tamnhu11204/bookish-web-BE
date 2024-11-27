const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const {
            email, name, password, phone, img, birthday, active, isAdmin, gender
        } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        if (!email || !name || !password || !phone || !img || !birthday || active == null || isAdmin == null || !gender) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }

        if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        }

        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

module.exports = { createUser };
