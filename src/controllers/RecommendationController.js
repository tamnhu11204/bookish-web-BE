const RecommendationService = require('../services/RecommendationService');

const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recommendedBooks = await RecommendationService.getRecommendations(userId);
    res.status(200).json({
      status: "OK",
      recommendedBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi gợi ý sách",
      error: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
};