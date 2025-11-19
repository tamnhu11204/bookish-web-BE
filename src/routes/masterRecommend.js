// routes/recommend.js
const express = require('express');
const router = express.Router();
const MasterRecommendController = require('../controllers/MasterRecommendController');

// FE gọi POST → route cũng phải POST
router.post('/master/:userId', MasterRecommendController.getRecommend);

module.exports = router;