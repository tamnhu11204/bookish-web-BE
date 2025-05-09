const express = require('express');
const router = express.Router();
const RecommendationController = require('../controllers/RecommendationController');

router.get('/recommend/:userId', RecommendationController.getRecommendations);

module.exports = router;