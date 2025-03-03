const express = require("express")
const router = express.Router()
const PublisherController = require('../../controllers/OptionController/PublisherController')
const uploadCloudinary = require("../../Helper/UploadCloudinary")

router.post('/create', uploadCloudinary.single('img'), PublisherController.createPublisher)
router.put('/update/:id', uploadCloudinary.single('img'), PublisherController.updatePublisher)
router.get('/get-detail/:id', PublisherController.getDetailPublisher)
router.delete('/delete/:id', PublisherController.deletePublisher)
router.get('/get-all', PublisherController.getAllPublisher)

module.exports = router