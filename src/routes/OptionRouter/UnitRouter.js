const express =require ("express")
const router= express.Router()
const UnitController=require('../../controllers/OptionController/UnitController')

router.post('/create', UnitController.createUnit)
router.put('/update/:id', UnitController.updateUnit)
router.get('/get-detail/:id',UnitController.getDetailUnit)
router.delete('/delete/:id',UnitController.deleteUnit)
router.get('/get-all',UnitController.getAllUnit)

module.exports=router