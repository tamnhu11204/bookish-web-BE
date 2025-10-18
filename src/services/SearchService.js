const axios = require('axios');
const Product = require('../models/ProductModel');

const searchBooks = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Gửi request đến AI service
            const aiResponse = await axios.post('http://localhost:8000/ai/search', { query });

            const bookIds = aiResponse.data?.book_ids || aiResponse.data || [];

            if (!Array.isArray(bookIds) || bookIds.length === 0) {
                return resolve({
                    status: 'OK',
                    message: 'No results found from AI service',
                    data: []
                });
            }

            // Truy vấn MongoDB lấy chi tiết sách
            const books = await Book.find({ _id: { $in: bookIds } });

            resolve({
                status: 'OK',
                message: 'Search successful',
                data: books
            });
        } catch (e) {
            console.error('Error in SearchService:', e.message);
            reject(e);
        }
    });
};

module.exports = { searchBooks };
