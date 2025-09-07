const express = require("express")
const router = express.Router()
const feedbackController = require('../controllers/FeedbackController')
const uploadCloudinary = require("../Helper/UploadCloudinary");

router.post('/create', uploadCloudinary.single('img'), feedbackController.createFeedback)
router.put('/update/:id', uploadCloudinary.single('img'), feedbackController.updateFeedback)
router.get('/get-detail/:id', feedbackController.getDetailFeedback)
router.delete('/delete/:id', feedbackController.deleteFeedback)
router.get('/get-all', feedbackController.getAllFeedback)


module.exports = router
