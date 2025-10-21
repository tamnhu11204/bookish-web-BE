const express = require('express');
const router = express.Router();
const EventController = require('../controllers/UserEventController');

router.post('/track', EventController.trackEvent);
router.get('/', EventController.getAllEvents);
router.get('/user/:userId', EventController.getEventsByUser);
router.delete('/clear', EventController.deleteAllEvents);

module.exports = router;
