const express =require ("express")
const router= express.Router()
const orderController=require('../controllers/OrderController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', orderController.createOrder)
// router.put('/update/:id', authMiddleWare, productController.updateProduct)
router.get('/get-detail/:id',orderController.getDetailOrder)
// router.delete('/delete/:id', productController.deleteProduct)
router.get('/get-all',orderController.getAllOrder)
router.put('/update-active-now/:id',orderController.updateActiveNow)
router.put('/update-cancel/:id',orderController.updateIsCancel)
module.exports=router