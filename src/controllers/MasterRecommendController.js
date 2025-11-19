// controllers/MasterRecommendController.js
const MasterRecommendService = require('../services/MasterRecommendService');

const getRecommend = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || userId.length < 10) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId không hợp lệ'
            });
        }

        const result = await MasterRecommendService.getMasterRecommendations(userId);
        return res.status(200).json(result);

    } catch (error) {
        console.error('MasterRecommendController error:', error.message);
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi hệ thống gợi ý'
        });
    }
};

module.exports = { getRecommend };