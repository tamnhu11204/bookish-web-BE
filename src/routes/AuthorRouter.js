const express = require("express");
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const uploadCloudinary = require("../Helper/UploadCloudinary");

router.post('/create', uploadCloudinary.single('img'), AuthorController.createAuthor);
router.put('/update/:id', uploadCloudinary.single('img'), AuthorController.updateAuthor);
router.get('/get-detail/:id', AuthorController.getDetailAuthor);
router.delete('/delete/:id', AuthorController.deleteAuthor);
router.get('/get-all', AuthorController.getAllAuthor);

module.exports = router;