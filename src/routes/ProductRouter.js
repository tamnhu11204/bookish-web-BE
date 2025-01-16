const express =require ("express")
const router= express.Router()
const productController=require('../controllers/ProductController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', productController.createProduct)
router.put('/update/:id',  productController.updateProduct)
router.get('/get-detail/:id',productController.getDetailProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/get-all',productController.getAllProduct)
router.put('/update-rating/:id',  productController.updateProductRating)
router.put('/update-rating2/:id',  productController.updateProductRating2)
router.put('/delete-rating/:id',  productController.deleteRating)
router.put('/update-view/:id',  productController.updateView)
router.put('/update-stock/:id', productController.updateProductStock)

module.exports=router