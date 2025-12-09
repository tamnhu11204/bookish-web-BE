// controllers/MasterRecommendController.js
const MasterRecommendService = require('../services/MasterRecommendService');

const getRecommend = async (req, res) => {
  try {
    const { userId } = req.params; // có thể là ObjectId hoặc 'guest'
    const { session_id } = req.body; // ← FE gửi session_id trong body

    console.log('[CONTROLLER] Nhận được:', { userId, session_id: session_id || 'không có' });

    // Nếu cả 2 đều null → vẫn cho qua (sẽ fallback trong service)
    const result = await MasterRecommendService.getMasterRecommendations(
      userId && userId !== 'guest' ? userId : null,
      session_id || null
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error('[CONTROLLER ERROR]', error.message);
    return res.status(500).json({
      status: 'ERR',
      message: 'Lỗi hệ thống gợi ý',
      details: error.message
    });
  }
};

module.exports = { getRecommend };