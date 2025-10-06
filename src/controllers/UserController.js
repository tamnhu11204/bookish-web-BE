const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');
const User = require('../models/UserModel');

const createUser = async (req, res) => {
    try {
        const { email, name, password, phone, birthday, isAdmin, description } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);
        if (!email || !name || !password || !phone || !birthday) {
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
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);
        if (!email || !password) {
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
        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const data = req.body;
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
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
        const userID = req.params.id;
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
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
        const { isAdmin } = req.query;
        let isAdminBool;
        if (isAdmin === 'true') {
            isAdminBool = true;
        } else if (isAdmin === 'false') {
            isAdminBool = false;
        } else if (isAdmin !== undefined) {
            return res.status(400).json({ message: "Invalid value for isAdmin. It should be 'true' or 'false'." });
        }
        const response = await UserService.getAllUser(isAdminBool);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getAllUser:", e);
        return res.status(500).json({
            message: "Internal server error",
            error: e.message,
        });
    }
};

const getDetailUser = async (req, res) => {
    try {
        const userID = req.params.id;
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            });
        }
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
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(200).json({
                status: "ERR",
                message: "The token is required",
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Đăng xuất thành công!'
        });
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const toggleActiveStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await UserService.toggleActiveStatus(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            });
        }
        const response = await UserService.resetPassword(id, oldPassword, newPassword);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const filterUsers = async (req, res) => {
    try {
        const { name, phone, email, isAdmin } = req.query;
        const users = await UserService.filterUsers({ name, phone, email, isAdmin });
        return res.status(200).json({
            status: "OK",
            message: "Filtered users successfully.",
            data: users,
        });
    } catch (error) {
        console.error("Error filtering users: ", error);
        return res.status(500).json({
            status: "ERR",
            message: "An error occurred while filtering users.",
            error: error.message,
        });
    }
};

module.exports = {
    createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser, refreshToken, logoutUser,
    toggleActiveStatus, resetPassword, filterUsers
};