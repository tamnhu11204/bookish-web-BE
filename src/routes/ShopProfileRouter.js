const express =require ("express")
const router= express.Router()
const shopProfileController=require('../controllers/ShopProfileController')

router.post('/create', shopProfileController.createShopProfile)
router.put('/update/:id', shopProfileController.updateShopProfile)
router.get('/get-detail/:id',shopProfileController.getDetailShopProfile)
router.get('/get-all',shopProfileController.getAllShopProfile)

module.exports=router