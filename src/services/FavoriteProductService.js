const FavoriteProduct = require('./../models/FavoriteProductModel');
const bcrypt = require("bcrypt");

const createFavoriteProduct = (newFavoriteProduct) => {
    return new Promise(async (resolve, reject) => {
        const {product, user} = newFavoriteProduct;
        try {
            const createdFavoriteProduct = await FavoriteProduct.create({product, user});
            if (createdFavoriteProduct) {
                resolve({
                    status: 'OK',
                    message: 'FavoriteProduct created successfully',
                    data: createdFavoriteProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateFavoriteProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFavoriteProduct = await FavoriteProduct.findOne({ _id: id })
            if (checkFavoriteProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The FavoriteProduct is not defined'
                })
            }

            const updatedFavoriteProduct = await FavoriteProduct.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedFavoriteProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFavoriteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFavoriteProduct = await FavoriteProduct.findOne({ _id: id })
            if (checkFavoriteProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The FavoriteProduct is not defined'
                })
            }
            await FavoriteProduct.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllFavoriteProduct = ({ user, product }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Khởi tạo điều kiện tìm kiếm
            const filter = {};
            if (user) {
                filter.user = user;
            }
            if (product) {
                filter.product = product;
            }

            // Tìm kiếm dựa trên filter
            const allFavoriteProduct = await FavoriteProduct.find(filter).populate('product');
            resolve({
                status: 'OK',
                message: 'Success',
                data: allFavoriteProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};




const getDetailFavoriteProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const favoriteProduct = await FavoriteProduct.findOne({ _id: id })
            if (favoriteProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The FavoriteProduct is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail FavoriteProduct sucessfully',
                data: favoriteProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createFavoriteProduct, updateFavoriteProduct, deleteFavoriteProduct, getAllFavoriteProduct, getDetailFavoriteProduct};
