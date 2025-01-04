const Category = require('./../models/CategoryModel');
const bcrypt = require("bcrypt");

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const {name, note, img} = newCategory;
        try {
            const checkCategory = await Category.findOne({
                name: name
            })
            if (checkCategory !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên danh mục đã tồn tại! Vui lòng nhập tên khác.'
                })
            }
            const createdCategory = await Category.create({name, note, img});
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
            const checkCategory = await Category.findOne({ _id: id })
            if (checkCategory === null) {
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
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
            const checkCategory = await Category.findOne({ _id: id })
            if (checkCategory === null) {
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }
            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory=await Category.find()
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



module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getDetailCategory};
