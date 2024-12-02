const Product = require('../models/ProductModel');
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {
            name, author, publishDate, weight, height, width, length, page, description, price, priceEntry,
            discount, stock, img, star, favorite, score, hot, view
        } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The product name is already'
                })
            }
            const createdProduct = await Product.create({
                name, author, publishDate, weight, height, width, length, page, description, price, priceEntry,
            discount, stock, img, star, favorite, score, hot, view
            });
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createdProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createProduct};
