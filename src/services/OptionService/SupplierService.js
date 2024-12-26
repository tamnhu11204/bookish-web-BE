const Supplier = require('./../../models/SupplierModel');
const bcrypt = require("bcrypt");

const createSupplier = (newSupplier) => {
    return new Promise(async (resolve, reject) => {
        const {name, note, img} = newSupplier;
        try {
            const checkSupplier = await Supplier.findOne({
                name: name
            })
            if (checkSupplier !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên nhà cung cấp đã tồn tại! Vui lòng chọn tên khác.'
                })
            }
            const createdSupplier = await Supplier.create({name, note,img});
            if (createdSupplier) {
                resolve({
                    status: 'OK',
                    message: 'Supplier created successfully',
                    data: createdSupplier
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateSupplier = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSupplier = await Supplier.findOne({ _id: id })
            if (checkSupplier === null) {
                resolve({
                    status: 'OK',
                    message: 'The Supplier is not defined'
                })
            }
            const checkSupplier2 = await Supplier.findOne({
                name: checkSupplier.n
            })
            if (checkSupplier2 !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên nhà cung cấp đã tồn tại! Vui lòng chọn tên khác.'
                })
            }

            

            const updatedSupplier = await Supplier.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedSupplier
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteSupplier = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSupplier = await Supplier.findOne({ _id: id })
            if (checkSupplier === null) {
                resolve({
                    status: 'OK',
                    message: 'The Supplier is not defined'
                })
            }
            await Supplier.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllSupplier = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSupplier=await Supplier.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allSupplier,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailSupplier = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const supplier = await Supplier.findOne({ _id: id })
            if (supplier === null) {
                resolve({
                    status: 'OK',
                    message: 'The Supplier is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Supplier sucessfully',
                data: supplier
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createSupplier, updateSupplier, deleteSupplier, getAllSupplier, getDetailSupplier};
