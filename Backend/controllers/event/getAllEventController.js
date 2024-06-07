const {Event} = require('../../db');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
