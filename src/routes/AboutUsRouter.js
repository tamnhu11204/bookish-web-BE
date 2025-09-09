const express = require("express");
const router = express.Router();
const AboutUsController = require('../controllers/AboutUsController');
const uploadCloudinary = require("../Helper/UploadCloudinary");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.get('/get-config', AboutUsController.getConfig);

router.put(
    '/update-config',
    authMiddleWare,
    uploadCloudinary.fields([
        { name: 'bannerImage1', maxCount: 1 },
        { name: 'bannerImage2', maxCount: 1 },
    ]),
    AboutUsController.updateConfig
);


module.exports = router;