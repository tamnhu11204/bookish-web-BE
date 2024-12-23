const Promotion = require('../models/PromotionModel');
const bcrypt = require("bcrypt");

const createPromotion = (newPromotion) => {
    return new Promise(async (resolve, reject) => {
        const {value, start, finish, condition, quantity} = newPromotion;
        try {
            const createdPromotion = await Promotion.create({value, start, finish, condition, quantity});
            if (createdPromotion) {
                resolve({
                    status: 'OK',
                    message: 'Promotion created successfully',
                    data: createdPromotion
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updatePromotion = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPromotion = await Promotion.findOne({ _id: id })
            if (checkPromotion === null) {
                resolve({
                    status: 'OK',
                    message: 'The Promotion is not defined'
                })
            }

            const updatedPromotion = await Promotion.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedPromotion
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deletePromotion = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPromotion = await Promotion.findOne({ _id: id })
            if (checkPromotion === null) {
                resolve({
                    status: 'OK',
                    message: 'The Promotion is not defined'
                })
            }
            await Promotion.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllPromotion = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allPromotion=await Promotion.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allPromotion,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailPromotion = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const promotion = await Promotion.findOne({ _id: id })
            if (promotion === null) {
                resolve({
                    status: 'OK',
                    message: 'The Promotion is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Promotion sucessfully',
                data: promotion
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createPromotion, updatePromotion, deletePromotion, getAllPromotion, getDetailPromotion};
