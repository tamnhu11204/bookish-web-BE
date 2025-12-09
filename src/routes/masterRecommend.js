// routes/recommend.js
const express = require('express');
const router = express.Router();
const MasterRecommendController = require('../controllers/MasterRecommendController');

router.post('/master/:userId?', MasterRecommendController.getRecommend); // :userId? → optional

module.exports = router;