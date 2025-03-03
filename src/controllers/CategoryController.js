const Category = require('../models/CategoryModel');
const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
    try {
        const { name, note } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu tên danh mục!' });
        }

        if (!req.file) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh danh mục!' });
        }

        // Lấy mã danh mục lớn nhất
        const lastCategory = await Category.findOne().sort({ code: -1 }).select('code');
        let newCode = 'C0001'; // Mặc định nếu chưa có danh mục nào

        if (lastCategory && lastCategory.code) {
            const lastNumber = parseInt(lastCategory.code.slice(1)); // Lấy số từ 'C0001'
            newCode = `C${String(lastNumber + 1).padStart(4, '0')}`; // Tăng số và format
        }

        const img = req.file.path;
        const newCategory = { code: newCode, name, note, img };

        console.log("Dữ liệu trước khi lưu:", newCategory); // Debug

        const response = await CategoryService.createCategory(newCategory);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Lỗi khi tạo danh mục:", e); // Log lỗi
        return res.status(500).json({ message: e.message });
    }
};




const updateCategory = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, note } = req.body;
        let updatedImg = req.body.img; 

        if (req.file) {
            updatedImg = req.file.path; 
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, note, img: updatedImg },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Không tìm thấy danh mục!" });
        }

        console.log("Updated Category:", updatedCategory);
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
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