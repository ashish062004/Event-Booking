const {Event, Admin} = require('../../db');
const bcrypt = require('bcrypt');

exports.createEvent = async (req, res) => {
    const { title, description, address, price, duration, date, sponsor } = req.body;
    const creatorUsername = req.username;
    const imagePath = req.file ? req.file.path : ''; // Get the path of the uploaded file
    
    try {
        const creator = await Admin.findOne({ username: creatorUsername });
        if (!creator) {
            return res.status(404).json({ message: "Creator not found" });
        }

        const event = await Event.create({
            title,
            description,
            address,
            image: imagePath, // Save the image path
            price,
            duration,
            date,
            sponsor,
            creator: creator._id
        });

        creator.createdEvents.push(event._id);
        await creator.save();

        res.json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllEventsByCreator = async (req, res) => {
    const creatorUsername = req.username;
    const creator = await Admin.findOne({ username: creatorUsername });

    if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
    }

    const events = await Event.find({ creator: creator._id });

    res.json(events);
};
