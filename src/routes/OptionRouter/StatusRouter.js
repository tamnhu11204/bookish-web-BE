const express =require ("express")
const router= express.Router()
const StatusController=require('../../controllers/OptionController/StatusController')

router.post('/create', StatusController.createStatus)
router.put('/update/:id', StatusController.updateStatus)
router.get('/get-detail/:id',StatusController.getDetailStatus)
router.delete('/delete/:id',StatusController.deleteStatus)
router.get('/get-all',StatusController.getAllStatus)

module.exports=router