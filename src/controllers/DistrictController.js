const DistrictService = require('../services/DistrictService');
const Province = require('../models/ProvinceModel');

const createDistrict = async (req, res) => {
    try {
        const { name, province } = req.body;

        console.log('req.body', req.body);

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
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const updateDistrict = async (req, res) => {
    try {
        const DistrictID=req.params.id
        const data=req.body
        if (!DistrictID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The DistrictID is required'
            });
        }

        const response = await DistrictService.updateDistrict(DistrictID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteDistrict = async (req, res) => {
    try {
        const DistrictID=req.params.id
        if (!DistrictID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The DistrictID is required'
            });
        }

        const response = awaitDistrictService.deleteDistrict(DistrictID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllDistrict = async (req, res) => {
    try {
        const response = await DistrictService.getAllDistrict();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailDistrict = async (req, res) => {
    try {
        const DistrictID=req.params.id
        if (!DistrictID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The DistrictID is required'
            });
        }
        const response = await DistrictService.getDetailDistrict(DistrictID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createDistrict, updateDistrict, deleteDistrict, getAllDistrict, getDetailDistrict};
