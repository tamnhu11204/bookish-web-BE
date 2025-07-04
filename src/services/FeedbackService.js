const Feedback = require('./../models/FeedbackModel');
const bcryptjs = require("bcryptjs");

const createFeedback = (newFeedback) => {
    return new Promise(async (resolve, reject) => {
        const { product, img, content, star, user } = newFeedback;
        try {
            const createdFeedback = await Feedback.create({ product, img, content, star, user });
            if (createdFeedback) {
                resolve({
                    status: 'OK',
                    message: 'Feedback created successfully',
                    data: createdFeedback
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateFeedback = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFeedback = await Feedback.findOne({ _id: id })
            if (checkFeedback === null) {
                resolve({
                    status: 'OK',
                    message: 'The Feedback is not defined'
                })
            }

            const updatedFeedback = await Feedback.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedFeedback
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFeedback = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFeedback = await Feedback.findOne({ _id: id })
            if (checkFeedback === null) {
                resolve({
                    status: 'OK',
                    message: 'The Feedback is not defined'
                })
            }
            await Feedback.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllFeedback = ({ user, product }) => {
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
            const allFeedback = await Feedback.find(filter);
            resolve({
                status: 'OK',
                message: 'Success',
                data: allFeedback,
            });
        } catch (e) {
            reject(e);
        }
    });
};




const getDetailFeedback = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const feedback = await Feedback.findOne({ _id: id })
            if (feedback === null) {
                resolve({
                    status: 'OK',
                    message: 'The Feedback is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Feedback sucessfully',
                data: feedback
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createFeedback, updateFeedback, deleteFeedback, getAllFeedback, getDetailFeedback };
