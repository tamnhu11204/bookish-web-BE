const express = require("express");
const router = express.Router();
const newsController = require("../controllers/NewsController");
const uploadCloudinary = require("../Helper/UploadCloudinary");

// Tạo tin tức mới
router.post('/create', uploadCloudinary.single('image'), newsController.createNews);

// Lấy chi tiết tin tức theo ID
router.get("/get-detail/:id", newsController.getDetailNews);

// Lấy tất cả tin tức (có phân trang, sắp xếp, lọc)
router.get("/get-all", newsController.getAllNews);

// Cập nhật tin tức
router.put("/update/:id", newsController.updateNews);

// Xóa tin tức
router.delete("/delete/:id", newsController.deleteNews);

module.exports = router;
