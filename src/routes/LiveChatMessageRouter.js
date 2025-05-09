const express = require('express');
const router = express.Router();
const optionalAuth = require('../middleware/optionalAuth');
const { authMiddleWare } = require('../middleware/authMiddleware'); // Middleware của bạn
const LiveChatMessageController = require('../controllers/LiveChatMessageController');

router.post('/send', optionalAuth, LiveChatMessageController.sendMessage);
router.post('/support', optionalAuth, LiveChatMessageController.requestSupport);
router.get('/conversation/:userId', optionalAuth, LiveChatMessageController.getMessagesByUser);
router.get('/users', authMiddleWare, LiveChatMessageController.getAllUsersWithLatestMessage);
router.post('/reply/:userId', authMiddleWare, LiveChatMessageController.adminReply);

module.exports = router;