const express =require ("express")
const router= express.Router()
const OrderActiveListController=require('../controllers/OrderActiveListController')

router.post('/create', OrderActiveListController.createOrderActiveList)
router.get('/get-detail/:id',OrderActiveListController.getDetailOrderActiveList)
// router.delete('/delete/:id', productController.deleteProduct)
router.get('/get-all',OrderActiveListController.getAllOrderActiveList)
router.put('/update/:orderId',OrderActiveListController.updateOrderActiveList)

module.exports=router