const express = require("express");
const router = express.Router();
const importController = require('../controllers/ImportController');
const { authMiddleWare } = require("../middleware/authMiddleware");

// Tạo một lần nhập hàng mới
router.post('/create', importController.createImport);

// Lấy chi tiết một lần nhập hàng
router.get('/get-detail/:id', importController.getImportById);

// Lấy tất cả các lần nhập hàng
router.get('/get-all', importController.getAllImports);

// Cập nhật trạng thái của lần nhập hàng
router.put('/update-status/:id', importController.updateImportStatus);

// Xóa một lần nhập hàng
router.delete('/delete/:id', importController.deleteImport);

module.exports = router;