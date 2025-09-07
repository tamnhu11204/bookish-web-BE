const Author = require('../models/AuthorModel');

const createAuthor = (newAuthor) => {
    return new Promise(async (resolve, reject) => {
        const { name, info, img, code } = newAuthor;
        try {
            const checkAuthor = await Author.findOne({ name });
            if (checkAuthor) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên tác giả đã tồn tại! Vui lòng nhập tên khác.'
                });
            }

            const createdAuthor = await Author.create({ name, info, img, code });
            if (createdAuthor) {
                resolve({
                    status: 'OK',
                    message: 'Tạo tác giả mới thành công!',
                    data: createdAuthor
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateAuthor = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkAuthor = await Author.findOne({ _id: id });
            if (!checkAuthor) {
                return resolve({
                    status: 'ERR',
                    message: 'Tác giả không tồn tại!'
                });
            }

            const updatedAuthor = await Author.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'Cập nhật tác giả thành công!',
                data: updatedAuthor
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkAuthor = await Author.findById(id);
            if (!checkAuthor) {
                return resolve({
                    status: 'ERR',
                    message: 'Tác giả không tồn tại!'
                });
            }
            await Author.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Xóa tác giả thành công.',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllAuthor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allAuthor = await Author.find().sort({ name: 'asc' });
            resolve({
                status: 'OK',
                message: 'Lấy tất cả tác giả thành công!',
                data: allAuthor,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const author = await Author.findById(id);
            if (!author) {
                return resolve({
                    status: 'ERR',
                    message: 'Tác giả không tồn tại!'
                });
            }
            resolve({
                status: 'OK',
                message: 'Lấy chi tiết tác giả thành công!',
                data: author
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthor,
    getDetailAuthor
};