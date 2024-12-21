const DistrictService = require('../services/DistrictService');
const Province = require('../models/ProvinceModel')
const mongoose = require('mongoose');

const createDistrict = async (req, res) => {
    try {
        const { name, province } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !province) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Name and Province ID are required',
            });
        }

        // Kiểm tra xem Province ID có tồn tại không
        const provinceExists = await Province.findById(province);
        if (!provinceExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Province does not exist',
            });
        }

        // Gọi service để tạo District
        const response = await DistrictService.createDistrict(req.body);
        return res.status(201).json(response); // Sử dụng mã 201 khi tạo thành công
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error',
        });
    }
};

const updateDistrict = async (req, res) => {
    try {
        const DistrictID = req.params.id;
        const data = req.body;
        
        if (!DistrictID || !mongoose.Types.ObjectId.isValid(DistrictID)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid DistrictID'
            });
        }

        const response = await DistrictService.updateDistrict(DistrictID, data);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: e.message
        });
    }
};

const deleteDistrict = async (req, res) => {
    try {
        const DistrictID = req.params.id;

        if (!DistrictID || !mongoose.Types.ObjectId.isValid(DistrictID)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid DistrictID'
            });
        }

        const response = await DistrictService.deleteDistrict(DistrictID);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: e.message
        });
    }
};

const getAllDistrict = async (req, res) => {
    try {
        const { province } = req.query;

        if (!province) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Valid provinceId is required'
            });
        }

        const result = await DistrictService.getAllDistrict(province);
        if (result.status === 'ERR') {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching districts:', error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const getDetailDistrict = async (req, res) => {
    try {
        const DistrictID = req.params.id;

        if (!DistrictID || !mongoose.Types.ObjectId.isValid(DistrictID)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid DistrictID'
            });
        }

        const response = await DistrictService.getDetailDistrict(DistrictID);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: e.message
        });
    }
};

module.exports = { createDistrict, updateDistrict, deleteDistrict, getAllDistrict, getDetailDistrict };
