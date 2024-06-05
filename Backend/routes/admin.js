const {Router} = require('express');
const router = Router();
const {Admin, Event} = require('../db');
const AdminMiddleware = require('../middlewares/admin.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const {username, password, email, phone} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await Admin.create({
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone
        });
        res.json({
            message: 'Admin created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error.message
        });
    }
});

router.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    console.log(JWT_SECRET);
    try {
        const admin = await Admin.findOne({username});
        if (admin && await bcrypt.compare(password, admin.password)) {
            // Passwords match, generate and send JWT token
            const token = jwt.sign({username}, JWT_SECRET);
            res.json({token});
        } else {
            res.status(401).json({
                message: "Incorrect username or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred during sign-in',
            error: error.message
        });
    }
});


//create event
router.post('/events', AdminMiddleware, async (req, res) => {
    const { title, description, address, imageLink, price, duration, date, sponsor } = req.body;
    const creatorUsername = req.username; 
    const creator = await Admin.findOne({ username: creatorUsername });

    if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
    }

    await Event.create({
        title: title,
        description: description,
        address: address,
        imageLink: imageLink,
        price: price,
        duration: duration,
        date: date,
        sponsor: sponsor,
        creator: creator._id
    });

    // Add the event to the creator's createdEvents array
    creator.createdEvents.push(eventId);
    await creator.save();
    res.json({
        message: 'Event created successfully'
    });
});

//update pericular event
router.put('/events/:id', AdminMiddleware, async (req, res) => {
    const { title, description, address, imageLink, price, duration, date, sponsor } = req.body;
    const creatorUsername = username; 
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

    res.json({
        message: 'Event updated successfully'
    });
});

//give list of all events that made by current admin
router.get('/events', AdminMiddleware, async (req, res) => {
    const creatorUsername = req.username; 
    const creator = await Admin.findOne({ username: creatorUsername });

    if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
    }

    const events = await Event.find({ creator: creator._id });

    res.json(events);
});

module.exports = router;