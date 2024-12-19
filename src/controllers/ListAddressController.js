const Commune = require('../models/CommuneModel');
const District = require('../models/DistrictModel');
const Province = require('../models/ProvinceModel');
const User = require('../models/UserModel');
const ListAddressService = require('../services/ListAddressService');

const createListAddress = async (req, res) => {
    try {
        const { phone, specificAddress, isDefaulth, user, province, district, commune } = req.body;

        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (phone === null, specificAddress === null, isDefaulth === null, user === null, province === null, district === null, commune === null) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        // Kiểm tra xem User ID có tồn tại không
        const userExists = await User.findById(district);
        if (!userExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Xã/Phường này không tồn tại!',
            });
        }

        // Kiểm tra xem Commune ID có tồn tại không
        const communeExists = await Commune.findById(district);
        if (!communeExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Xã/Phường này không tồn tại!',
            });
        }

        // Kiểm tra xem District ID có tồn tại không
        const districtExists = await District.findById(district);
        if (!districtExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Quận/Huyện này không tồn tại!',
            });
        }
        // Kiểm tra xem Province ID có tồn tại không
        const provinceExists = await Province.findById(province);
        if (!provinceExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tỉnh/Thành phố này không tồn tại!',
            });
        }

        const response = await ListAddressService.createListAddress(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateListAddress = async (req, res) => {
    try {
        const ListAddressID = req.params.id
        const data = req.body
        if (!ListAddressID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ListAddressID is required'
            });
        }

        const response = await ListAddressService.updateListAddress(ListAddressID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteListAddress = async (req, res) => {
    try {
        const ListAddressID = req.params.id
        if (!ListAddressID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ListAddressID is required'
            });
        }

        const response = await ListAddressService.deleteListAddress(ListAddressID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllListAddress = async (req, res) => {
    try {
        const response = await ListAddressService.getAllListAddress();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailListAddress = async (req, res) => {
    try {
        const ListAddressID = req.params.id
        if (!ListAddressID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ListAddressID is required'
            });
        }
        const response = await ListAddressService.getDetailListAddress(ListAddressID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createListAddress, updateListAddress, deleteListAddress, getAllListAddress, getDetailListAddress };
