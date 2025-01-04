const express =require ("express")
const router= express.Router()
const shopProfileController=require('../controllers/ShopProfileController')

router.post('/create', shopProfileController.createShopProfile)
router.put('/update/:id', shopProfileController.updateShopProfile)
router.get('/get-detail/:id',shopProfileController.getDetailShopProfile)
router.get('/get-all',shopProfileController.getAllShopProfile)
router.put('/update-img',shopProfileController.updateImage)
router.put('/update-fee/:id',shopProfileController.updatePaymentAndFee)

module.exports=router