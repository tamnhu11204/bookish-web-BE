const Province = require('../models/ProvinceModel');
const bcrypt = require("bcrypt");

const createProvince = (newProvince) => {
    return new Promise(async (resolve, reject) => {
        const {name} = newProvince;
        try {
            const checkProvince = await Province.findOne({
                name: name
            })
            if (checkProvince !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Province name is already'
                })
            }
            const createdProvince = await Province.create({name});
            if (createdProvince) {
                resolve({
                    status: 'OK',
                    message: 'Province created successfully',
                    data: createdProvince
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProvince = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProvince = await Province.findOne({ _id: id })
            if (checkProvince === null) {
                resolve({
                    status: 'OK',
                    message: 'The Province is not defined'
                })
            }

            const updatedProvince = await Province.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedProvince
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProvince = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProvince = await Province.findOne({ _id: id })
            if (checkProvince === null) {
                resolve({
                    status: 'OK',
                    message: 'The Province is not defined'
                })
            }
            await Province.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProvince = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProvince=await Province.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProvince,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailProvince = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const province = await Province.findOne({ _id: id })
            if (province === null) {
                resolve({
                    status: 'OK',
                    message: 'The Province is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Province sucessfully',
                data: province
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createProvince, updateProvince, deleteProvince, getAllProvince, getDetailProvince};
