const express =require ("express")
const router= express.Router()
const activeController=require('../../controllers/OptionController/ActiveController')

router.post('/create', activeController.createActive)
router.put('/update/:id', activeController.updateActive)
router.get('/get-detail/:id',activeController.getDetailActive)
router.delete('/delete/:id',activeController.deleteActive)
router.get('/get-all',activeController.getAllActive)

module.exports=router