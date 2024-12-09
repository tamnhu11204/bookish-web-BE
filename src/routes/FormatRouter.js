const express =require ("express")
const router= express.Router()
const FormatController=require('../controllers/FormatController')

router.post('/create', FormatController.createFormat)
router.put('/update/:id', FormatController.updateFormat)
router.get('/get-detail/:id',FormatController.getDetailFormat)
router.delete('/delete/:id',FormatController.deleteFormat)
router.get('/get-all',FormatController.getAllFormat)

module.exports=router