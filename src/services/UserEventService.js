const UserEvent = require('../models/UserEventModel');

const trackEvent = (eventData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { eventType, productId, userId, sessionId } = eventData;

            if (!eventType || !productId || !sessionId) {
                return resolve({
                    status: 'ERR',
                    message: 'Thiếu thông tin eventType, productId hoặc sessionId!'
                });
            }

            const newEvent = await UserEvent.create({
                eventType,
                productId,
                userId: userId || null,
                sessionId,
                timestamp: new Date()
            });

            resolve({
                status: 'OK',
                message: 'Event recorded successfully',
                data: newEvent
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getAllEvents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const events = await UserEvent.find().sort({ timestamp: -1 });
            resolve({
                status: 'OK',
                message: 'Lấy danh sách sự kiện thành công',
                data: events
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getEventsByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const events = await UserEvent.find({ userId }).sort({ timestamp: -1 });
            resolve({
                status: 'OK',
                message: 'Lấy sự kiện của người dùng thành công',
                data: events
            });
        } catch (e) {
            reject(e);
        }
    });
};


const deleteAllEvents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await UserEvent.deleteMany({});
            resolve({
                status: 'OK',
                message: 'Đã xóa toàn bộ sự kiện hành vi người dùng'
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = { trackEvent, getAllEvents, getEventsByUser, deleteAllEvents };
