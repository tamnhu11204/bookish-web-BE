const District = require('../models/DistrictModel');
const mongoose = require('mongoose'); // Import mongoose

const createDistrict = async (newDistrict) => {
    const { name, province } = newDistrict;
    try {
        const checkDistrict = await District.findOne({ name: name });
        if (checkDistrict) {
            return {
                status: 'ERR',
                message: 'The District name already exists'
            };
        }

        const createdDistrict = await District.create({ name, province });
        return {
            status: 'OK',
            message: 'District created successfully',
            data: createdDistrict
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const updateDistrict = async (id, data) => {
    try {
        const checkDistrict = await District.findById(id);
        if (!checkDistrict) {
            return {
                status: 'ERR',
                message: 'District not found'
            };
        }

        const updatedDistrict = await District.findByIdAndUpdate(id, data, { new: true });
        return {
            status: 'OK',
            message: 'District updated successfully',
            data: updatedDistrict
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const deleteDistrict = async (id) => {
    try {
        const checkDistrict = await District.findById(id);
        if (!checkDistrict) {
            return {
                status: 'ERR',
                message: 'District not found'
            };
        }

        await District.findByIdAndDelete(id);
        return {
            status: 'OK',
            message: 'District deleted successfully'
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getAllDistrict = async (province) => {
    try {
        // Kiểm tra giá trị của provinceId
        console.log("ProvinceId received:", province);

        const districts = await District.find({ province });

        if (districts.length === 0) {
            return { status: 'ERR', message: 'No districts found' };
        }

        return { status: 'OK', message: 'Districts retrieved successfully', data: districts };
    } catch (error) {
        console.error('Error:', error);  // Xem lỗi
        return { status: 'ERR', message: error.message };
    }
};

const getDetailDistrict = async (id) => {
    try {
        const district = await District.findById(id);
        if (!district) {
            return {
                status: 'ERR',
                message: 'District not found'
            };
        }

        return {
            status: 'OK',
            message: 'District details retrieved successfully',
            data: district
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = { createDistrict, updateDistrict, deleteDistrict, getAllDistrict, getDetailDistrict };
