const { Router } = require('express');
const router = Router();
const UserMiddleware = require('../middlewares/user.js');
const { User, Event, Ticket } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createCanvas } = require('canvas');
const crypto = require('crypto');

router.post('/signup', async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
            username,
            password: hashedPassword,
            email,
            phone
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
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username }, JWT_SECRET);
            res.json({ token });
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

router.post('/book/:id', UserMiddleware, async (req, res) => {
    const eventId = req.params.id;
    const username = req.username;

    try {
        const user = await User.findOne({ username });
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.bookedEvents.push(eventId);
        await user.save();

        event.attendees.push(user._id);
        await event.save();

        const ticket = await Ticket.create({
            user: user._id,
            event: eventId,
            price: event.price
        });

        user.tickets.push(ticket._id);
        await user.save();

        res.json({ message: 'Event booked successfully', ticketId: ticket._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

    try {
        // Fetch event details
        const event = await Event.findById(ticket.event);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Create canvas and context
        const canvas = createCanvas(700, 200);
        const ctx = canvas.getContext('2d');

        // Fill the background with white color
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.fillStyle = 'black';
        ctx.font = 'bold 20px Arial';

        // Draw event details on the ticket
        ctx.fillText(`Event: ${event.title}`, 50, 100);
        ctx.fillText(`Date: ${event.date}`, 50, 130);
        ctx.fillText(`Address: ${event.address}`, 50, 160);
        ctx.fillText(`User: ${user.username}`, 50, 190);
        ctx.fillText(`Ticket ID: ${ticketId}`, 50, 220);

        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');

        // Set response headers
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });

        // Send the image buffer as the response
        res.end(buffer, 'binary');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate ticket image' });
    }
});

function generateUniqueId() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports = router;
