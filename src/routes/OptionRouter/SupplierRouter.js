const express =require ("express")
const router= express.Router()
const supplierController=require('../../controllers/OptionController/SupplierController')

router.post('/create', supplierController.createSupplier)
router.put('/update/:id', supplierController.updateSupplier)
router.get('/get-detail/:id',supplierController.getDetailSupplier)
router.delete('/delete/:id',supplierController.deleteSupplier)
router.get('/get-all',supplierController.getAllSupplier)

module.exports=router