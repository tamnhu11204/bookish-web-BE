const express =require ("express")
const router= express.Router()
const CategoryController=require('../controllers/CategoryController')
const uploadCloudinary = require("../Helper/UploadCloudinary")

router.post('/create', uploadCloudinary.single('img'),CategoryController.createCategory)
router.put('/update/:id', uploadCloudinary.single('img'), CategoryController.updateCategory);
router.get('/get-detail/:id',CategoryController.getDetailCategory)
router.delete('/delete/:id',CategoryController.deleteCategory)
router.get('/get-all',CategoryController.getAllCategory)
router.get('/get-tree',CategoryController.getCategoryTree)

module.exports=router