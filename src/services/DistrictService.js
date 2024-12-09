const District = require('../models/DistrictModel');
const bcrypt = require("bcrypt");

const createDistrict = (newDistrict) => {
    return new Promise(async (resolve, reject) => {
        const {name, province} = newDistrict;
        try {
            const checkDistrict = await District.findOne({
                name: name
            })
            if (checkDistrict !== null) {
                resolve({
                    status: 'OK',
                    message: 'The District name is already'
                })
            }
            const createdDistrict = await District.create({name, province});
            if (createdDistrict) {
                resolve({
                    status: 'OK',
                    message: 'District created successfully',
                    data: createdDistrict
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateDistrict = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDistrict = await District.findOne({ _id: id })
            if (checkDistrict === null) {
                resolve({
                    status: 'OK',
                    message: 'The District is not defined'
                })
            }

            const updatedDistrict = await District.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedDistrict
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteDistrict = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDistrict = await District.findOne({ _id: id })
            if (checkDistrict === null) {
                resolve({
                    status: 'OK',
                    message: 'The District is not defined'
                })
            }
            await District.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllDistrict = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allDistrict=await District.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allDistrict,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailDistrict = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const district = await District.findOne({ _id: id })
            if (district === null) {
                resolve({
                    status: 'OK',
                    message: 'The District is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail District sucessfully',
                data: district
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createDistrict, updateDistrict, deleteDistrict, getAllDistrict, getDetailDistrict};
