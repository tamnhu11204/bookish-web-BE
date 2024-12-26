const Active = require('./../../models/ActiveModel');
const bcrypt = require("bcrypt");

const createActive = (newActive) => {
    return new Promise(async (resolve, reject) => {
        const {name, note} = newActive;
        try {
            const checkActive = await Active.findOne({
                name: name
            })
            if (checkActive !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên ngôn ngữ đã tồn tại! Vui lòng chọn tên khác.'
                })
            }
            const createdActive = await Active.create({name, note});
            if (createdActive) {
                resolve({
                    status: 'OK',
                    message: 'Active created successfully',
                    data: createdActive
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateActive = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkActive = await Active.findOne({ _id: id })
            if (checkActive === null) {
                resolve({
                    status: 'OK',
                    message: 'The Active is not defined'
                })
            }

            const updatedActive = await Active.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedActive
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteActive = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkActive = await Active.findOne({ _id: id })
            if (checkActive === null) {
                resolve({
                    status: 'OK',
                    message: 'The Active is not defined'
                })
            }
            await Active.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllActive = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allActive=await Active.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allActive,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailActive = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const active = await Active.findOne({ _id: id })
            if (active === null) {
                resolve({
                    status: 'OK',
                    message: 'The Active is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Active sucessfully',
                data: active
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createActive, updateActive, deleteActive, getAllActive, getDetailActive};
