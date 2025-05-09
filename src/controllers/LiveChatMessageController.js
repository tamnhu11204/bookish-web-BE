const LiveChatMessageService = require('../services/LiveChatMessageService');
const { v4: uuidv4 } = require('uuid');

const sendMessage = async (req, res) => {
    try {
        const { message, userId: bodyUserId } = req.body;
        const sender = 'user';
        if (!message) {
            return res.status(400).json({ message: 'Thiếu nội dung tin nhắn' });
        }
        const userId = req.user?.id || bodyUserId || `guest_${uuidv4()}`;
        console.log('💬 Received message:', { userId, message, source: req.user?.id ? 'auth' : bodyUserId ? 'body' : 'generated' });
        const savedMessage = await LiveChatMessageService.createMessage({
            sender,
            userId,
            message,
        });
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Lỗi gửi tin nhắn:', error);
        res.status(500).json({ error: 'Gửi tin nhắn thất bại' });
    }
};

const getMessagesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Fetching messages for userId: ${userId}`);
        const messages = await LiveChatMessageService.getMessagesByUser(userId);
        res.json({ messages: messages.messages || [] });
    } catch (error) {
        console.error('Lỗi lấy tin nhắn:', error);
        res.status(500).json({ error: 'Không thể lấy tin nhắn' });
    }
};

const getAllUsersWithLatestMessage = async (req, res) => {
    try {
        // Middleware đã xác thực quyền admin, chỉ cần gọi service
        const latestMessages = await LiveChatMessageService.getAllUsersWithLatestMessage();
        res.json(latestMessages);
    } catch (error) {
        console.error('Lỗi lấy danh sách người dùng:', error);
        res.status(500).json({ message: 'Không thể lấy danh sách' });
    }
};


const adminReply = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.params.userId;
        const sender = 'admin';
        if (!req.user?.isAdmin) {
            return res.status(403).json({ message: 'Chỉ admin có quyền trả lời' });
        }
        console.log('💬 Admin reply:', { userId, message });
        const reply = await LiveChatMessageService.createMessage({
            sender,
            userId,
            message,
            isHandled: true,
        });
        res.status(201).json(reply);
    } catch (error) {
        console.error('Lỗi admin gửi phản hồi:', error);
        res.status(500).json({ message: 'Không thể gửi phản hồi' });
    }
};

const requestSupport = async (req, res) => {
    try {
        const { userId: bodyUserId, message } = req.body;
        const userId = req.user?.id || bodyUserId || `guest_${uuidv4()}`;
        console.log('💬 Received support request:', { userId, message, source: req.user?.id ? 'auth' : bodyUserId ? 'body' : 'generated' });
        const savedMessage = await LiveChatMessageService.requestSupport(userId, message);
        if (req.io) {
            req.io.emit('supportRequest', {
                userId,
                message: savedMessage.message,
                timestamp: savedMessage.timestamp,
            });
        }
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Lỗi yêu cầu hỗ trợ:', error);
        res.status(500).json({ message: 'Không thể gửi yêu cầu hỗ trợ' });
    }
};

module.exports = {
    sendMessage,
    getMessagesByUser,
    getAllUsersWithLatestMessage,
    adminReply,
    requestSupport,
};