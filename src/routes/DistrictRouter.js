const express =require ("express")
const router= express.Router()
const districtController=require('../controllers/DistrictController')

router.post('/create', districtController.createDistrict)
router.put('/update/:id', districtController.updateDistrict)
router.get('/get-detail/:id',districtController.getDetailDistrict)
router.delete('/delete/:id',districtController.deleteDistrict)
router.get('/get-all',districtController.getAllDistrict)

module.exports=router