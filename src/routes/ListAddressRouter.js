const express =require ("express")
const router= express.Router()
const listAddressController=require('../controllers/ListAddressController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', listAddressController.createListAddress)
router.put('/update/:id', authUserMiddleWare,listAddressController.updateListAddress)
router.get('/get-detail/:id',authUserMiddleWare,listAddressController.getDetailListAddress)
router.delete('/delete/:id',authUserMiddleWare,listAddressController.deleteListAddress)
router.get('/get-all',authUserMiddleWare,listAddressController.getAllListAddress)

module.exports=router