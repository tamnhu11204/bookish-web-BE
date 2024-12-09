const UnitService = require('../services/UnitService');

const createUnit = async (req, res) => {
    try {
        const {name, note} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (name === null) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        const response = await UnitService.createUnit(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateUnit = async (req, res) => {
    try {
        const UnitID=req.params.id
        const data=req.body
        if (!UnitID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The UnitID is required'
            });
        }

        const response = await UnitService.updateUnit(UnitID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteUnit = async (req, res) => {
    try {
        const UnitID=req.params.id
        if (!UnitID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The UnitID is required'
            });
        }

        const response = await UnitService.deleteUnit(UnitID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllUnit = async (req, res) => {
    try {
        const response = await UnitService.getAllUnit();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailUnit = async (req, res) => {
    try {
        const UnitID=req.params.id
        if (!UnitID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The UnitID is required'
            });
        }
        const response = await UnitService.getDetailUnit(UnitID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createUnit, updateUnit, deleteUnit, getAllUnit, getDetailUnit};
