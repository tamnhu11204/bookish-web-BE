const express =require ("express")
const router= express.Router()
const supplierController=require('../../controllers/OptionController/SupplierController')
const uploadCloudinary = require("../../Helper/UploadCloudinary")

router.post('/create', uploadCloudinary.single('img'), supplierController.createSupplier)
router.put('/update/:id', uploadCloudinary.single('img'), supplierController.updateSupplier)
router.get('/get-detail/:id',supplierController.getDetailSupplier)
router.delete('/delete/:id',supplierController.deleteSupplier)
router.get('/get-all',supplierController.getAllSupplier)

module.exports=router