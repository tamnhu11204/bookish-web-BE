const EventService = require('../services/UserEventService');

const trackEvent = async (req, res) => {
    try {
        const { eventType, productId, userId, sessionId } = req.body;
        const response = await EventService.trackEvent({ eventType, productId, userId, sessionId });
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in trackEvent:', e.message);
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};


const getAllEvents = async (req, res) => {
    try {
        const response = await EventService.getAllEvents();
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in getAllEvents:', e.message);
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};


const getEventsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu userId!' });
        }

        const response = await EventService.getEventsByUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in getEventsByUser:', e.message);
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};


const deleteAllEvents = async (req, res) => {
    try {
        const response = await EventService.deleteAllEvents();
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in deleteAllEvents:', e.message);
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

module.exports = { trackEvent, getAllEvents, getEventsByUser, deleteAllEvents };
