const { User, Event, Ticket } = require('../../db');
const { createCanvas } = require('canvas');

exports.getTicket = async (req, res) => {
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
        const event = await Event.findById(ticket.event);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const canvas = createCanvas(700, 200);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.font = 'bold 20px Arial';

        ctx.fillText(`Event: ${event.title}`, 50, 100);
        ctx.fillText(`Date: ${event.date}`, 50, 130);
        ctx.fillText(`Address: ${event.address}`, 50, 160);
        ctx.fillText(`User: ${user.username}`, 50, 190);
        ctx.fillText(`Ticket ID: ${ticketId}`, 50, 220);

        const buffer = canvas.toBuffer('image/png');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });

        res.end(buffer, 'binary');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate ticket image' });
    }
};
