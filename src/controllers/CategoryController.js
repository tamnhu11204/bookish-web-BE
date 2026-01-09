const Category = require('../models/CategoryModel');
const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
    try {
        const { name, note, parent, slug } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu tên danh mục!' });
        }

        if (!req.file && !req.body.existingImg) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh danh mục!' });
        }

        // Kiểm tra slug có bị trùng không
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({ status: 'ERR', message: 'Slug đã tồn tại!' });
        }

        // Kiểm tra parent có hợp lệ không (nếu có)
        let parentId = null;
        if (parent && parent !== '' && parent !== 'null' && parent !== 'Không có') {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                return res.status(400).json({ status: 'ERR', message: 'Danh mục cha không tồn tại!' });
            }
            parentId = parent;
        }

        // Lấy mã danh mục lớn nhất
       const lastCategory = await Category.findOne().sort({ code: -1 }).select('code');
let newCode = 'CT000001';

if (lastCategory && lastCategory.code) {
 
    const lastNumber = parseInt(lastCategory.code.replace('CT', '')); 
    
    if (!isNaN(lastNumber)) {
        newCode = `CT${String(lastNumber + 1).padStart(6, '0')}`;
    }
}

        const img = req.file ? req.file.path : req.body.existingImg;
        const newCategory = {
            code: newCode,
            name,
            note,
            img,
            parent: parentId, // Use parentId (null or valid ObjectId)
            slug,
        };

        const response = await CategoryService.createCategory(newCategory);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in createCategory:", e.message);
        return res.status(500).json({ message: e.message });
    }
};


const getCategoryTree = async (req, res) => {
    try {
        const response = await CategoryService.getCategoryTree();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};




const updateCategory = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, note, slug, parent } = req.body;
        let updatedImg = req.body.existingImg;

        if (req.file) {
            updatedImg = req.file.path;
        }

        // Kiểm tra parent có hợp lệ không (nếu có)
        if (parent) {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                return res.status(400).json({ status: 'ERR', message: 'Danh mục cha không tồn tại!' });
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, note, slug, img: updatedImg, parent: parent || null }, // Convert empty string to null
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
        const categoryID = req.params.id;
        if (!categoryID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CategoryID is required'
            });
        }

        const response = await CategoryService.deleteCategory(categoryID);
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
        const CategoryID = req.params.id
        if (!CategoryID) {
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


module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getDetailCategory, getCategoryTree };