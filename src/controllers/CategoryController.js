const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
    try {
        const {name, note} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (!name) {
            resolve({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const response = await CategoryService.createCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const CategoryID=req.params.id
        const data=req.body
        if (!CategoryID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The CategoryID is required'
            });
        }

        const response = await CategoryService.updateCategory(CategoryID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const CategoryID=req.params.id
        if (!CategoryID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The CategoryID is required'
            });
        }

        const response = await CategoryService.deleteCategory(CategoryID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const response = await CategoryService.getAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailCategory = async (req, res) => {
    try {
        const CategoryID=req.params.id
        if (!CategoryID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The CategoryID is required'
            });
        }
        const response = await CategoryService.getDetailCategory(CategoryID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getDetailCategory};
