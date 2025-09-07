const express = require("express");
const router = express.Router();
const HomePageConfigController = require('../controllers/HomepageConfigController');
const uploadCloudinary = require("../Helper/UploadCloudinary");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.get('/get-config', HomePageConfigController.getConfig);

router.put(
    '/update-config',
    authMiddleWare,
    uploadCloudinary.fields([
        { name: 'bannerImage1', maxCount: 1 },
        { name: 'bannerImage2', maxCount: 1 },
        { name: 'bannerPromotion', maxCount: 1 }
    ]),
    HomePageConfigController.updateConfig
);


module.exports = router;