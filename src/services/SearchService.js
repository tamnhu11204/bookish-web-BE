const axios = require('axios');
const Product = require('../models/ProductModel');
const ObjectId = require('mongoose').Types.ObjectId;

const searchBooks = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Query sent to AI service:', query);
            const aiResponse = await axios.post('http://localhost:8000/ai/search', { query });
            console.log('AI service response:', aiResponse.data);
            const bookIds = aiResponse.data?.product_ids || [];
            console.log('Extracted bookIds:', bookIds);
            if (!Array.isArray(bookIds) || bookIds.length === 0) {
                return resolve({
                    status: 'OK',
                    message: 'No results found from AI service',
                    data: []
                });
            }
            const books = await Product.find({ _id: { $in: bookIds } });
            console.log('Books found in MongoDB:', books);
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
