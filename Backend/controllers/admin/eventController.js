const {Event, Admin} = require('../../db');
const bcrypt = require('bcrypt');

exports.createEvent = async (req, res) => {
    const { title, description, address, imageLink, price, duration, date, sponsor } = req.body;
    const creatorUsername = req.username;

    try {
        const creator = await Admin.findOne({ username: creatorUsername });
        if (!creator) {
            return res.status(404).json({ message: "Creator not found" });
        }

        const event = await Event.create({
            title,
            description,
            address,
            imageLink,
            price,
            duration,
            date,
            sponsor,
            creator: creator._id
        });

        creator.createdEvents.push(event._id);
        await creator.save();

        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateEvent = async (req, res) => {
    const { title, description, address, imageLink, price, duration, date, sponsor } = req.body;
    const creatorUsername = req.username;
    const creator = await Admin.findOne({ username: creatorUsername });

    if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    event.title = title;
    event.description = description;
    event.address = address;
    event.imageLink = imageLink;
    event.price = price;
    event.duration = duration;
    event.date = date;
    event.sponsor = sponsor;
    event.creator = creator._id;

    await event.save();

    res.json({ message: 'Event updated successfully' });
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
