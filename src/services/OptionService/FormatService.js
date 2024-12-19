const Format = require('./../../models/FormatModel');
const bcrypt = require("bcrypt");

const createFormat = (newFormat) => {
    return new Promise(async (resolve, reject) => {
        const {name, note} = newFormat;
        try {
            const checkFormat = await Format.findOne({
                name: name
            })
            if (checkFormat !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên hình thức đã tồn tại! Vui lòng chọn tên khác.'
                })
            }
            const createdFormat = await Format.create({name, note});
            if (createdFormat) {
                resolve({
                    status: 'OK',
                    message: 'Format created successfully',
                    data: createdFormat
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateFormat = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFormat = await Format.findOne({ _id: id })
            if (checkFormat === null) {
                resolve({
                    status: 'OK',
                    message: 'The Format is not defined'
                })
            }

            const updatedFormat = await Format.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedFormat
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFormat = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFormat = await Format.findOne({ _id: id })
            if (checkFormat === null) {
                resolve({
                    status: 'OK',
                    message: 'The Format is not defined'
                })
            }
            await Format.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllFormat = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allFormat=await Format.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allFormat,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailFormat = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const format = await Format.findOne({ _id: id })
            if (format === null) {
                resolve({
                    status: 'OK',
                    message: 'The Format is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Format sucessfully',
                data: format
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createFormat, updateFormat, deleteFormat, getAllFormat, getDetailFormat};
