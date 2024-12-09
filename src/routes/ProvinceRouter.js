const express =require ("express")
const router= express.Router()
const provinceController=require('../controllers/ProvinceController')

router.post('/create', provinceController.createProvince)
router.put('/update/:id', provinceController.updateProvince)
router.get('/get-detail/:id',provinceController.getDetailProvince)
router.delete('/delete/:id',provinceController.deleteProvince)
router.get('/get-all',provinceController.getAllProvince)

module.exports=router