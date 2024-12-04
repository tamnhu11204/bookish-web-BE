const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        const {
            email, name, password, phone, birthday
        } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        if (!email || !name || !password || !phone|| !birthday) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin1.'
            });
        }

        if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ! Vui lòng nhập lại.'
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

const loginUser = async (req, res) => {
    try {
        const {
            email, password
        } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        if (!email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ! Vui lòng nhập lại.'
            });
        }

        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userID=req.params.id
        const data=req.body
        if (!userID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.updateUser(userID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userID=req.params.id
        if (!userID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.deleteUser(userID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailUser = async (req, res) => {
    try {
        const userID=req.params.id
        if (!userID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
        // Truyền dữ liệu req.body vào UserService
        const response = await UserService.getDetailUser(userID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token=req.headers.token.split(' ')[1]
        if (!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }
        // Truyền dữ liệu req.body vào UserService
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

module.exports = { createUser, loginUser, updateUser, deleteUser,getAllUser, getDetailUser, refreshToken };
