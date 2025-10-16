const Product = require('../models/ProductModel');
const Category = require('./../models/CategoryModel');
const bcryptjs = require("bcryptjs");

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, note, img, code, parent, slug } = newCategory;
        try {
            const checkCategory = await Category.findOne({ name });
            if (checkCategory) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên danh mục đã tồn tại! Vui lòng nhập tên khác.'
                });
            }

            const createdCategory = await Category.create({ name, note, img, code, parent, slug });
            if (createdCategory) {
                resolve({
                    status: 'OK',
                    message: 'Category created successfully',
                    data: createdCategory
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({ _id: id });
            if (!checkCategory) {
                return resolve({
                    status: 'ERR',
                    message: 'Danh mục không tồn tại!'
                });
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'Cập nhật danh mục thành công!',
                data: updatedCategory
            });
        } catch (e) {
            reject(e);
        }
    });
};


const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({ _id: id });
            if (checkCategory === null) {
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                });
                return;
            }

            // Delete all products associated with the category
            await Product.deleteMany({ category: id });

            // Delete the category
            await Category.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Category and associated products deleted successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory = await Category.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCategory,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailCategory = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const category = await Category.findOne({ _id: id })
            if (category === null) {
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Category sucessfully',
                data: category
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getCategoryTree = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await Category.find().lean();

            const buildTree = (parentId = null) => {
                return categories
                    .filter(cat => String(cat.parent) === String(parentId))
                    .map(cat => ({ ...cat, children: buildTree(cat._id) }));
            };

            resolve({
                status: 'OK',
                message: 'Success',
                data: buildTree()
            });
        } catch (e) {
            reject(e);
        }
    });
};




module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getDetailCategory, getCategoryTree };