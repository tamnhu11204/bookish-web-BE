const Unit = require('./../../models/UnitModel');
const bcrypt = require("bcrypt");

const createUnit = (newUnit) => {
    return new Promise(async (resolve, reject) => {
        const {name, note, code} = newUnit;
        try {
            const checkUnit = await Unit.findOne({
                name: name
            })
            if (checkUnit !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên đơn vị đã tồn tại! Vui lòng nhập tên khác.'
                })
            }
            const createdUnit = await Unit.create({name, note,code});
            if (createdUnit) {
                resolve({
                    status: 'OK',
                    message: 'Unit created successfully',
                    data: createdUnit
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUnit = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUnit = await Unit.findOne({ _id: id })
            if (checkUnit === null) {
                resolve({
                    status: 'OK',
                    message: 'The Unit is not defined'
                })
            }

            const updatedUnit = await Unit.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedUnit
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUnit = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUnit = await Unit.findOne({ _id: id })
            if (checkUnit === null) {
                resolve({
                    status: 'OK',
                    message: 'The Unit is not defined'
                })
            }
            await Unit.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUnit = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUnit=await Unit.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUnit,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailUnit = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const unit = await Unit.findOne({ _id: id })
            if (unit === null) {
                resolve({
                    status: 'OK',
                    message: 'The Unit is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Unit sucessfully',
                data: unit
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createUnit, updateUnit, deleteUnit, getAllUnit, getDetailUnit};
