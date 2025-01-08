const express =require ("express")
const router= express.Router()
const productController=require('../controllers/ProductController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', productController.createProduct)
router.put('/update/:id',  productController.updateProduct)
router.get('/get-detail/:id',productController.getDetailProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/get-all',productController.getAllProduct)

module.exports=router