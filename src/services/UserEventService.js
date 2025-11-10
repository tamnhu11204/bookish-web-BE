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

            // Xác định key để giới hạn: dùng userId nếu có, không thì dùng sessionId
            const filterKey = userId ? { userId, eventType } : { sessionId, eventType };

            // 1. Đếm số event hiện tại của (userId hoặc sessionId) + eventType
            const count = await UserEvent.countDocuments(filterKey);

            // 2. Nếu đã có 50 bản ghi → xóa bản ghi cũ nhất (cũ nhất = timestamp nhỏ nhất)
            if (count >= 50) {
                const oldestEvent = await UserEvent.findOne(filterKey)
                    .sort({ timestamp: 1 }) // cũ nhất trước
                    .select('_id');

                if (oldestEvent) {
                    await UserEvent.deleteOne({ _id: oldestEvent._id });
                }
            }

            // 3. Tạo event mới
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
