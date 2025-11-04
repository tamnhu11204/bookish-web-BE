const axios = require('axios');
const Product = require('../models/ProductModel');
const ObjectId = require('mongoose').Types.ObjectId;

const searchBooks = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Query sent to AI service:', query);
            const aiResponse = await axios.post('http://localhost:8000/ai/search', { query });

            console.log('AI service response:', aiResponse.data);
            const bookIdsAsString = aiResponse.data?.product_ids || [];

            console.log('Extracted bookIds (as strings):', bookIdsAsString);

            if (!Array.isArray(bookIdsAsString) || bookIdsAsString.length === 0) {
                return resolve({
                    status: 'OK',
                    message: 'No results found from AI service',
                    data: []
                });
            }

            const bookIdsAsObjectId = bookIdsAsString
                .map(id => {
                    if (ObjectId.isValid(id)) {
                        return new ObjectId(id);
                    }
                    console.warn(`Invalid ObjectId format detected: ${id}`);
                    return null;
                })
                .filter(id => id !== null);

            console.log('Mongo IDs to query (as ObjectId):', bookIdsAsObjectId);

            if (bookIdsAsObjectId.length === 0) {
                return resolve({
                    status: 'OK',
                    message: 'No valid book IDs to query',
                    data: []
                });
            }
            const books = await Product.find({ _id: { $in: bookIdsAsObjectId } });

            console.log(`Books found in MongoDB: ${books.length} items`);

            const sortedBooks = bookIdsAsObjectId.map(id =>
                books.find(book => book._id.equals(id))
            ).filter(book => book);

            resolve({
                status: 'OK',
                message: 'Search successful',
                data: sortedBooks
            });

        } catch (e) {
            if (e.response) {
                console.error('Error from AI service:', e.response.status, e.response.data);
            } else if (e.request) {
                console.error('Error connecting to AI service:', e.message);
            } else {
                console.error('Error in SearchService logic:', e.message);
            }
            reject(e);
        }
    });
};

module.exports = { searchBooks };
