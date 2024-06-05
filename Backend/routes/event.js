const {Router} = require('express');
const router = Router();
const {Event} = require('../db');

// Get all events
router.get('/', async (req, res) => {
    // Get all events
    const events = await Event.find({});
    res.json(events);
});

// Get event by ID
router.get('/:id', async (req, res) => {
    // Get event by ID
    const event = await Event.findById(req.params.id);
    res.json(event);
});

module.exports = router;