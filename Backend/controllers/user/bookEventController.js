const { User, Event, Ticket } = require('../../db');
exports.bookEvent = async (req, res) => {
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
};
