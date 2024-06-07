const {Event} = require('../../db') // Adjust the path according to your models directory

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
