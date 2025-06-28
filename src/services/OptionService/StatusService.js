const Status = require('../../models/ActiveModel');
//const Unit = require('../../models/ActiveModel');
const bcryptjs = require("bcryptjs");

const createStatus = (newStatus) => {
    return new Promise(async (resolve, reject) => {
        const { name, note } = newStatus;
        try {
            const checkStatus = await Status.findOne({
                name: name
            })
            if (checkStatus !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên trạng thái đã tồn tại! Vui lòng nhập tên khác.'
                })
            }
            const createdStatus = await Status.create({ name, note });
            if (createdStatus) {
                resolve({
                    status: 'OK',
                    message: 'Status created successfully',
                    data: createdStatus
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateStatus = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStatus = await Status.findOne({ _id: id })
            if (checkStatus === null) {
                resolve({
                    status: 'OK',
                    message: 'The Status is not defined'
                })
            }

            const updatedStatus = await Status.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedStatus
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteStatus = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStatus = await Status.findOne({ _id: id })
            if (checkStatus === null) {
                resolve({
                    status: 'OK',
                    message: 'The Status is not defined'
                })
            }
            await Status.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allStatus = await Status.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allStatus,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailStatus = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const status = await Status.findOne({ _id: id })
            if (status === null) {
                resolve({
                    status: 'OK',
                    message: 'The Status is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Status sucessfully',
                data: status
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createStatus, updateStatus, deleteStatus, getAllStatus, getDetailStatus };
