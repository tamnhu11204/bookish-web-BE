const express =require ("express")
const router= express.Router()
const promotionController=require('../controllers/PromotionController')

router.post('/create', promotionController.createPromotion)
router.put('/update/:id', promotionController.updatePromotion)
router.get('/get-detail/:id',promotionController.getDetailPromotion)
router.delete('/delete/:id',promotionController.deletePromotion)
router.get('/get-all',promotionController.getAllPromotion)

module.exports=router