const Commune = require('../models/CommuneModel');

// Hàm tạo xã
const createCommune = (newCommune) => {
    return new Promise(async (resolve, reject) => {
        const { name, district } = newCommune;
        try {
            // Tạo xã mới mà không kiểm tra trùng tên
            const createdCommune = await Commune.create({ name, district });
            if (createdCommune) {
                resolve({
                    status: 'OK',
                    message: 'Commune created successfully',
                    data: createdCommune
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm cập nhật xã
const updateCommune = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCommune = await Commune.findOne({ _id: id });
            if (checkCommune === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Commune is not defined'
                });
            }

            const updatedCommune = await Commune.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedCommune
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm xóa xã
const deleteCommune = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCommune = await Commune.findOne({ _id: id });
            if (checkCommune === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Commune is not defined'
                });
            }
            await Commune.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Deleted successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm lấy tất cả xã
const getAllCommune = async (district) => {
    try {
        console.log("district received:", district);

        const communes = await Commune.find({ district });

        if (communes.length === 0) {
            return { status: 'ERR', message: 'No districts found' };
        }

        return { status: 'OK', message: 'Districts retrieved successfully', data: communes };
    } catch (error) {
        console.error('Error:', error);  // Xem lỗi
        return { status: 'ERR', message: error.message };
    }
};

// Hàm lấy chi tiết xã
const getDetailCommune = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commune = await Commune.findOne({ _id: id });
            if (commune === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Commune is not defined'
                });
            }
            resolve({
                status: 'OK',
                message: 'Get detail Commune successfully',
                data: commune
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createCommune, updateCommune, deleteCommune, getAllCommune, getDetailCommune };
