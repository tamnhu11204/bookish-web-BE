const Language = require('./../../models/LanguageModel');
const bcrypt = require("bcrypt");

const createLanguage = (newLanguage) => {
    return new Promise(async (resolve, reject) => {
        const {name, note} = newLanguage;
        try {
            const checkLanguage = await Language.findOne({
                name: name
            })
            if (checkLanguage !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên ngôn ngữ đã tồn tại! Vui lòng chọn tên khác.'
                })
            }
            const createdLanguage = await Language.create({name, note});
            if (createdLanguage) {
                resolve({
                    status: 'OK',
                    message: 'Language created successfully',
                    data: createdLanguage
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateLanguage = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkLanguage = await Language.findOne({ _id: id })
            if (checkLanguage === null) {
                resolve({
                    status: 'OK',
                    message: 'The Language is not defined'
                })
            }

            const updatedLanguage = await Language.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedLanguage
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteLanguage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkLanguage = await Language.findOne({ _id: id })
            if (checkLanguage === null) {
                resolve({
                    status: 'OK',
                    message: 'The Language is not defined'
                })
            }
            await Language.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllLanguage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allLanguage=await Language.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allLanguage,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailLanguage = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const language = await Language.findOne({ _id: id })
            if (language === null) {
                resolve({
                    status: 'OK',
                    message: 'The Language is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Language sucessfully',
                data: language
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { createLanguage, updateLanguage, deleteLanguage, getAllLanguage, getDetailLanguage};
