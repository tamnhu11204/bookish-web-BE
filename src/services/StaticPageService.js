const StaticPage = require('../models/StaticPageModel');
const bcrypt = require("bcrypt");

const createStaticPage = (newStaticPage) => {
    return new Promise(async (resolve, reject) => {
        const {name, content} = newStaticPage;
        try {
            const checkStaticPage = await StaticPage.findOne({
                name: name
            })
            if (checkStaticPage !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên đơn vị đã tồn tại! Vui lòng nhập tên khác.'
                })
            }
            const createdStaticPage = await StaticPage.create({name, content});
            if (createdStaticPage) {
                resolve({
                    status: 'OK',
                    message: 'StaticPage created successfully',
                    data: createdStaticPage
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateStaticPage = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStaticPage = await StaticPage.findOne({ _id: id })
            if (checkStaticPage === null) {
                resolve({
                    status: 'OK',
                    message: 'The StaticPage is not defined'
                })
            }

            const updatedStaticPage = await StaticPage.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedStaticPage
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteStaticPage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStaticPage = await StaticPage.findOne({ _id: id })
            if (checkStaticPage === null) {
                resolve({
                    status: 'OK',
                    message: 'The StaticPage is not defined'
                })
            }
            await StaticPage.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllStaticPage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allStaticPage=await StaticPage.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allStaticPage,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailStaticPage = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const staticPage = await StaticPage.findOne({ _id: id })
            if (staticPage === null) {
                resolve({
                    status: 'OK',
                    message: 'The StaticPage is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail StaticPage sucessfully',
                data: staticPage
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createStaticPage, updateStaticPage, deleteStaticPage, getAllStaticPage, getDetailStaticPage};
