const Author = require('../models/AuthorModel');
const AuthorService = require('../services/AuthorService');

const createAuthor = async (req, res) => {
    try {
        const { name, info } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu tên tác giả!' });
        }
        if (!req.file) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh tác giả!' });
        }

        // Tự động tạo mã tác giả mới
        const lastAuthor = await Author.findOne().sort({ code: -1 }).select('code');
        let newCode = 'A0001';
        if (lastAuthor && lastAuthor.code) {
            const lastNumber = parseInt(lastAuthor.code.slice(1));
            newCode = `A${String(lastNumber + 1).padStart(4, '0')}`;
        }

        const newAuthorData = {
            code: newCode,
            name,
            info,
            img: req.file.path,
        };

        const response = await AuthorService.createAuthor(newAuthorData);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in createAuthor:", e.message);
        return res.status(500).json({ message: e.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const data = req.body;

        if (req.file) {
            data.img = req.file.path;
        }

        if (!authorId) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ID tác giả!' });
        }

        const response = await AuthorService.updateAuthor(authorId, data);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in updateAuthor:", e.message);
        return res.status(500).json({ message: e.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        if (!authorId) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ID tác giả!' });
        }
        const response = await AuthorService.deleteAuthor(authorId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAllAuthor = async (req, res) => {
    try {
        const response = await AuthorService.getAllAuthor();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getDetailAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        if (!authorId) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ID tác giả!' });
        }
        const response = await AuthorService.getDetailAuthor(authorId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthor,
    getDetailAuthor
};