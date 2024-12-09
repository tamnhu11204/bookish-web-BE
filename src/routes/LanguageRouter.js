const express =require ("express")
const router= express.Router()
const languageController=require('../controllers/LanguageController')

router.post('/create', languageController.createLanguage)
router.put('/update/:id', languageController.updateLanguage)
router.get('/get-detail/:id',languageController.getDetailLanguage)
router.delete('/delete/:id',languageController.deleteLanguage)
router.get('/get-all',languageController.getAllLanguage)

module.exports=router