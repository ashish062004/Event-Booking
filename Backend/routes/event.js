const express = require('express');
const router = express.Router();
const { getAllEvents } = require('../controllers/event/getAllEventController.js');
const { getEventById } = require('../controllers/event/getEventByIdController.js');


// Get all events
router.get('/', getAllEvents);

// Get event by ID
router.get('/:id', getEventById);

module.exports = router;
