const express =require ("express")
const router= express.Router()
const StaticPageController=require('../controllers/StaticPageController')

router.post('/create', StaticPageController.createStaticPage)
router.put('/update/:id', StaticPageController.updateStaticPage)
router.get('/get-detail/:id',StaticPageController.getDetailStaticPage)
router.delete('/delete/:id',StaticPageController.deleteStaticPage)
router.get('/get-all',StaticPageController.getAllStaticPage)

module.exports=router