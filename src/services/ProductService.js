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
                    message: 'Product created successfully',
                    data: createdProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id })
            console.log('checkProduct', checkProduct)
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();

            if(filter){
                const label=filter[0]
                const allProductFilter= await Product.find({[label]:{'$regex':filter[1]}}).limit(limit).skip(page*limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page+1),
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }

            if(sort){
                const objectSort={}
                objectSort[sort[0]]=sort[1]
                const allProductSort= await Product.find().limit(limit).skip(page*limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page+1),
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }

            const allProduct=await Product.find().limit(limit).skip(page*limit)
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page+1),
                totalPage: Math.ceil(totalProduct/limit)
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const product = await Product.findOne({ _id: id })
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail product sucessfully',
                data: product
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct};
