const express =require ("express")
const router= express.Router()
const userController=require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)
router.delete('/delete-user/:id',authMiddleWare, userController.deleteUser)
router.get('/get-all',authMiddleWare, userController.getAllUser)
router.get('/get-detail/:id', userController.getDetailUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/logout', userController.logoutUser)
router.put('/toggle-active/:id', authMiddleWare,userController.toggleActiveStatus);
router.put('/reset-password/:id', authUserMiddleWare, userController.resetPassword)
router.get("/filter", userController.filterUsers);

module.exports=router