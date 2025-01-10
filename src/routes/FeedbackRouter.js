const express =require ("express")
const router= express.Router()
const feedbackController=require('../controllers/FeedbackController')

router.post('/create', feedbackController.createFeedback)
router.put('/update/:id', feedbackController.updateFeedback)
router.get('/get-detail/:id',feedbackController.getDetailFeedback)
router.delete('/delete/:id',feedbackController.deleteFeedback)
router.get('/get-all',feedbackController.getAllFeedback)


module.exports=router