const Format = require('../../models/FormatModel');
const FormatService = require('../../services/OptionService/FormatService');

const createFormat = async (req, res) => {
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
        const lastFormat = await Format.findOne().sort({ code: -1 }).select('code');
        let newCode = 'F0001'; 

        if (lastFormat && lastFormat.code) {
            const lastNumber = parseInt(lastFormat.code.slice(1)); 
            newCode = `F${String(lastNumber + 1).padStart(4, '0')}`; 
        }
        const newFormat = { code: newCode, name, note };
        const response = await FormatService.createFormat(newFormat);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateFormat = async (req, res) => {
    try {
        const FormatID=req.params.id
        const data=req.body
        if (!FormatID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FormatID is required'
            });
        }

        const response = await FormatService.updateFormat(FormatID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteFormat = async (req, res) => {
    try {
        const FormatID=req.params.id
        if (!FormatID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FormatID is required'
            });
        }

        const response = await FormatService.deleteFormat(FormatID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllFormat = async (req, res) => {
    try {
        const response = await FormatService.getAllFormat();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailFormat = async (req, res) => {
    try {
        const FormatID=req.params.id
        if (!FormatID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FormatID is required'
            });
        }
        const response = await FormatService.getDetailFormat(FormatID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createFormat, updateFormat, deleteFormat, getAllFormat, getDetailFormat};
