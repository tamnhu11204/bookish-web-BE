const express =require ("express")
const router= express.Router()
const CategoryController=require('../controllers/CategoryController')

router.post('/create', CategoryController.createCategory)
router.put('/update/:id', CategoryController.updateCategory)
router.get('/get-detail/:id',CategoryController.getDetailCategory)
router.delete('/delete/:id',CategoryController.deleteCategory)
router.get('/get-all',CategoryController.getAllCategory)

module.exports=router