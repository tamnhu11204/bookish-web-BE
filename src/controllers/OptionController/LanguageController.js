const Language = require('../../models/LanguageModel');
const LanguageService = require('../../services/OptionService/LanguageService');

const createLanguage = async (req, res) => {
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
        const lastLanguage = await Language.findOne().sort({ code: -1 }).select('code');
        let newCode = 'L0001'; 

        if (lastLanguage && lastLanguage.code) {
            const lastNumber = parseInt(lastLanguage.code.slice(1)); 
            newCode = `L${String(lastNumber + 1).padStart(4, '0')}`; 
        }
        const newLanguage = { code: newCode, name, note };
        const response = await LanguageService.createLanguage(newLanguage);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateLanguage = async (req, res) => {
    try {
        const LanguageID=req.params.id
        const data=req.body
        if (!LanguageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The LanguageID is required'
            });
        }

        const response = await LanguageService.updateLanguage(LanguageID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const LanguageID=req.params.id
        if (!LanguageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The LanguageID is required'
            });
        }

        const response = await LanguageService.deleteLanguage(LanguageID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllLanguage = async (req, res) => {
    try {
        const response = await LanguageService.getAllLanguage();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailLanguage = async (req, res) => {
    try {
        const LanguageID=req.params.id
        if (!LanguageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The LanguageID is required'
            });
        }
        const response = await LanguageService.getDetailLanguage(LanguageID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createLanguage, updateLanguage, deleteLanguage, getAllLanguage, getDetailLanguage};
