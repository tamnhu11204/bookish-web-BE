const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');

router.post('/search', SearchController.searchBooks);

module.exports = router;
