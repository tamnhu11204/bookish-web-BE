const ProvinceService = require('../services/ProvinceService');

const createProvince = async (req, res) => {
    try {
        const {name} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (name === null) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }

        const response = await ProvinceService.createProvince(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateProvince = async (req, res) => {
    try {
        const ProvinceID=req.params.id
        const data=req.body
        if (!ProvinceID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProvinceID is required'
            });
        }

        const response = await ProvinceService.updateProvince(ProvinceID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteProvince = async (req, res) => {
    try {
        const ProvinceID=req.params.id
        if (!ProvinceID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProvinceID is required'
            });
        }

        const response = await ProvinceService.deleteProvince(ProvinceID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllProvince = async (req, res) => {
    try {
        const response = await ProvinceService.getAllProvince();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailProvince = async (req, res) => {
    try {
        const ProvinceID=req.params.id
        if (!ProvinceID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProvinceID is required'
            });
        }
        const response = await ProvinceService.getDetailProvince(ProvinceID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createProvince, updateProvince, deleteProvince, getAllProvince, getDetailProvince};
