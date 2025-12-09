// services/MasterRecommendService.js
const axios = require('axios');
const Product = require('../models/ProductModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getMasterRecommendations = async (userId = null, sessionId = null) => {
  try {
    console.log(`[SERVICE] Gọi AI với user_id=${userId || 'null'}, session_id=${sessionId || 'null'}`);

    const payload = {
      user_id: userId,
      session_id: sessionId
    };
    console.log('[SERVICE] Payload gửi đi:', payload);

    const aiResponse = await axios.post('http://localhost:8000/ai/recommend/master', payload, {
      timeout: 30000
    });

    console.log('[SERVICE] AI trả về thành công');

    const dynamicMenu = aiResponse.data?.dynamic_menu || [];

    if (!Array.isArray(dynamicMenu) || dynamicMenu.length === 0) {
      return {
        status: 'OK',
        message: 'Chưa có gợi ý',
        data: { combos: [], books: [] }
      };
    }

    // ... (phần gom book_ids và query DB giữ nguyên như cũ)
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
    const books = await Product.find({ _id: { $in: validIds } }).lean();

    const sortedBooks = allBookIds
      .map(id => books.find(b => b._id.toString() === id))
      .filter(Boolean);

    return {
      status: 'OK',
      message: 'Thành công',
      data: { combos: dynamicMenu, books: sortedBooks }
    };

  } catch (error) {
    console.error('[MASTER SERVICE ERROR]', error.response?.data || error.message);
    throw error; // ném lỗi để controller bắt
  }
};

module.exports = { getMasterRecommendations };