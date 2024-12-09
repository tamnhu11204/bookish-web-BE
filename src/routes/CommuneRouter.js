const express =require ("express")
const router= express.Router()
const CommuneController=require('../controllers/CommuneController')

router.post('/create', CommuneController.createCommune)
router.put('/update/:id', CommuneController.updateCommune)
router.get('/get-detail/:id',CommuneController.getDetailCommune)
router.delete('/delete/:id',CommuneController.deleteCommune)
router.get('/get-all',CommuneController.getAllCommune)

module.exports=router