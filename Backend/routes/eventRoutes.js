const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');
const { verifyToken: auth } = require('../middleware/auth');
const { checkRole, checkApprovalStatus } = require('../middleware/roleAuth');

// Public routes
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEvent);

// Protected routes - Event Organizer
router.post('/events', auth, checkRole('event_organizer'), checkApprovalStatus, eventController.createEvent);
router.put('/events/:id', auth, checkRole('event_organizer', 'admin'), eventController.updateEvent);
router.delete('/events/:id', auth, checkRole('event_organizer', 'admin'), eventController.deleteEvent);
router.get('/organizer/events', auth, checkRole('event_organizer'), eventController.getOrganizerEvents);

// Protected routes - User ticket booking
router.post('/tickets', auth, eventController.bookTicket);
router.get('/tickets', auth, eventController.getUserTickets);

module.exports = router;
