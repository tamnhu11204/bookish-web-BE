const express =require ("express")
const router= express.Router()
const userController=require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id',authMiddleWare, userController.deleteUser)
router.get('/get-all',authMiddleWare, userController.getAllUser)
router.get('/get-detail/:id', authUserMiddleWare, userController.getDetailUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/logout', userController.logoutUser)


module.exports=router