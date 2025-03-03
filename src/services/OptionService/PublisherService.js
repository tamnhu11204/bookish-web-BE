const Publisher = require('./../../models/PublisherModel');
const bcrypt = require("bcrypt");

const createPublisher = (newPublisher) => {
    return new Promise(async (resolve, reject) => {
        const {name, note, img, code} = newPublisher;
        try {
            const checkPublisher = await Publisher.findOne({
                name: name
            })
            if (checkPublisher !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên nhà cung cấp đã tồn tại! Vui lòng chọn tên khác.'
                })
            }
            const createdPublisher = await Publisher.create({name, note,img, code});
            if (createdPublisher) {
                resolve({
                    status: 'OK',
                    message: 'Publisher created successfully',
                    data: createdPublisher
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updatePublisher = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPublisher = await Publisher.findOne({ _id: id })
            if (checkPublisher === null) {
                resolve({
                    status: 'OK',
                    message: 'The Publisher is not defined'
                })
            }
            const checkPublisher2 = await Publisher.findOne({
                name: checkPublisher.n
            })
            if (checkPublisher2 !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên nhà cung cấp đã tồn tại! Vui lòng chọn tên khác.'
                })
            }

            

            const updatedPublisher = await Publisher.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedPublisher
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deletePublisher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPublisher = await Publisher.findOne({ _id: id })
            if (checkPublisher === null) {
                resolve({
                    status: 'OK',
                    message: 'The Publisher is not defined'
                })
            }
            await Publisher.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllPublisher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allpublisher=await Publisher.find()
           
            resolve({
                status: 'OK',
                message: 'Success',
                data: allpublisher,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailPublisher = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const publisher = await Publisher.findOne({ _id: id })
            if (publisher === null) {
                resolve({
                    status: 'OK',
                    message: 'The Publisher is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Publisher sucessfully',
                data: publisher
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createPublisher, updatePublisher, deletePublisher, getAllPublisher, getDetailPublisher};
