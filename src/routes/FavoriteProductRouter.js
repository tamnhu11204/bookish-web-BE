const express =require ("express")
const router= express.Router()
const favoriteProductController=require('../controllers/FavoriteProductController')

router.post('/create', favoriteProductController.createFavoriteProduct)
router.put('/update/:id', favoriteProductController.updateFavoriteProduct)
router.get('/get-detail/:id',favoriteProductController.getDetailFavoriteProduct)
router.delete('/delete/:id',favoriteProductController.deleteFavoriteProduct)
router.get('/get-all',favoriteProductController.getAllFavoriteProduct)


module.exports=router