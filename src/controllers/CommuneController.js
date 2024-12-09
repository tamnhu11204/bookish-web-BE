const CommuneService = require('../services/CommuneService');
const District = require('../models/DistrictModel');

const createCommune = async (req, res) => {
    try {
        const { name, district } = req.body;

        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (name === null || district === null) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        // Kiểm tra xem Province ID có tồn tại không
        const districtExists = await District.findById(district);
        if (!districtExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'District does not exist',
            });
        }

        const response = await CommuneService.createCommune(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateCommune = async (req, res) => {
    try {
        const CommuneID = req.params.id
        const data = req.body
        if (!CommuneID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommuneID is required'
            });
        }

        const response = await CommuneService.updateCommune(CommuneID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteCommune = async (req, res) => {
    try {
        const CommuneID = req.params.id
        if (!CommuneID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommuneID is required'
            });
        }

        const response = awaitCommuneService.deleteCommune(CommuneID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllCommune = async (req, res) => {
    try {
        const response = await CommuneService.getAllCommune();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailCommune = async (req, res) => {
    try {
        const CommuneID = req.params.id
        if (!CommuneID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommuneID is required'
            });
        }
        const response = await CommuneService.getDetailCommune(CommuneID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createCommune, updateCommune, deleteCommune, getAllCommune, getDetailCommune };