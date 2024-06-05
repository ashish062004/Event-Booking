const {Router} = require('express');
const router = Router();
const UserMiddleware = require('../middlewares/user.js');
const {User, Event, Ticket} = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');


router.post('/signup', async (req, res) => {
    const {username, password, email, phone} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone
        });
        res.json({
            message: 'User created successfully'
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
    try {
        const user = await User.findOne({username});
        if (user && await bcrypt.compare(password, user.password)) {
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

//booking event
router.post('/book/:id', UserMiddleware, async (req, res) => {
    const eventId = req.params.id;
    const username = req.username;
    const user = await User.findOne({
        username
    }); 
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    } 
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    } 

    //add event to user's bookedEvents
    user.bookedEvents.push(eventId);
    await user.save();
    //add user to event's attendees
    event.attendees.push(user._id);
    await event.save();
    
    //create ticket
    await Ticket.create({
        user: user._id,
        event: eventId,
        price: event.price
    });
    user.tickets.push(eventId);
    await user.save();

    res.json({
        message: 'Event booked successfully'
    }); 
});

//generate ticket for user in png format
router.get('/ticket/:id', UserMiddleware, async (req, res) => {
    const ticketId = req.params.id;
    const username = req.username;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    // Load ticket template
    const template = await loadImage('path_to_your_ticket_template.png');

    // Create canvas
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext('2d');

    // Draw ticket template
    ctx.drawImage(template, 0, 0, template.width, template.height);

    // Overlay user and event details onto the ticket
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Event: ${ticket.event}`, 50, 50);
    ctx.fillText(`User: ${user.username}`, 50, 80);

    // Generate and print a unique small ID
    const uniqueId = generateUniqueId(); // Function to generate unique ID
    ctx.fillText(`ID: ${uniqueId}`, 50, 110);

    // Convert canvas to PNG buffer
    const buffer = canvas.toBuffer();

    // Set response headers
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
    });

    // Send PNG buffer as response
    res.end(buffer, 'binary');
});

// Function to generate unique alphanumeric ID
function generateUniqueId() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports = router;