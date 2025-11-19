// services/MasterRecommendService.js
const axios = require('axios');
const Product = require('../models/ProductModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getMasterRecommendations = async (userId) => {
    try {
        console.log(`[MASTER] Gọi AI Pipeline cho user: ${userId}`);

        const aiResponse = await axios.post('http://localhost:8000/ai/recommend/master', {
            user_id: userId
        }, { timeout: 30000 });

        const dynamicMenu = aiResponse.data?.dynamic_menu || [];

        if (!Array.isArray(dynamicMenu) || dynamicMenu.length === 0) {
            return {
                status: 'OK',
                message: 'Chưa có gợi ý',
                data: { combos: [], books: [] }
            };
        }

        // Gom tất cả book_ids
        const allBookIds = [];
        const seen = new Set();
        dynamicMenu.forEach(combo => {
            combo.book_ids?.forEach(id => {
                const strId = id.toString();
                if (!seen.has(strId)) {
                    seen.add(strId);
                    allBookIds.push(strId);
                }
            });
        });

        const validIds = allBookIds.filter(ObjectId.isValid).map(id => new ObjectId(id));
        const books = await Product.find({ _id: { $in: validIds } });

        const sortedBooks = allBookIds
            .map(id => books.find(b => b._id.toString() === id))
            .filter(Boolean);

        return {
            status: 'OK',
            message: 'Lấy gợi ý thành công',
            data: {
                combos: dynamicMenu,
                books: sortedBooks
            }
        };

    } catch (error) {
        console.error('[MASTER SERVICE] Lỗi:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { getMasterRecommendations };