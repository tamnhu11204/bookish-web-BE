const ListAddress = require('../models/ListAddressModel');
const bcrypt = require("bcrypt");

const createListAddress = (newListAddress) => {
    return new Promise(async (resolve, reject) => {
        const {phone, specificAddress,isDefaulth,user,province,district,commune} = newListAddress;
        try {
            const createdListAddress = await ListAddress.create({phone, specificAddress,isDefaulth,user,province,district,commune});
            if (createdListAddress) {
                resolve({
                    status: 'OK',
                    message: 'Thêm địa chỉ mới thành công!',
                    data: createdListAddress
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateListAddress = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkListAddress = await ListAddress.findOne({ _id: id })
            if (checkListAddress === null) {
                resolve({
                    status: 'OK',
                    message: 'The ListAddress is not defined'
                })
            }

            const updatedListAddress = await ListAddress.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedListAddress
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteListAddress = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkListAddress = await ListAddress.findOne({ _id: id })
            if (checkListAddress === null) {
                resolve({
                    status: 'OK',
                    message: 'The ListAddress is not defined'
                })
            }
            await ListAddress.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllListAddress = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allListAddress=await ListAddress.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allListAddress,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailListAddress = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const listAddress = await ListAddress.findOne({ _id: id })
            if (listAddress === null) {
                resolve({
                    status: 'OK',
                    message: 'The ListAddress is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail ListAddress sucessfully',
                data: listAddress
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createListAddress, updateListAddress, deleteListAddress, getAllListAddress, getDetailListAddress};
