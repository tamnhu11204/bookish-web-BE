const express =require ("express")
const router= express.Router()
const communeController=require('../controllers/CommuneController')

router.post('/create', communeController.createCommune)
router.put('/update/:id', communeController.updateCommune)
router.get('/get-detail/:id',communeController.getDetailCommune)
router.delete('/delete/:id',communeController.deleteCommune)
router.get('/get-all',communeController.getAllCommune)

module.exports=router