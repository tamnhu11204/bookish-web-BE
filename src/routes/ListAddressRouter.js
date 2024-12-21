const express =require ("express")
const router= express.Router()
const listAddressController=require('../controllers/ListAddressController')
const { authUserMiddleWareOther, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', listAddressController.createListAddress)
router.put('/update/:user/:id', authUserMiddleWareOther,listAddressController.updateListAddress)
router.get('/get-detail/:id',authUserMiddleWare,listAddressController.getDetailListAddress)
router.delete('/delete/:user/:id',authUserMiddleWareOther,listAddressController.deleteListAddress)
router.get('/get-all/:user',authUserMiddleWareOther,listAddressController.getAllListAddress)

module.exports=router
