import React from 'react';
import { Link } from 'react-router-dom';

// Mock API service for demonstration purposes
const api = {
  bookEvent: (eventId) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Successfully booked event with ID: ${eventId}`);
    }, 1000);
  }),
};

export default function EventCard({ event }) {
    const handleBookNow = async () => {
        try {
            const bookingMessage = await api.bookEvent(event._id);
            console.log(bookingMessage);
            alert('Booking successful Check console for details.');
        } catch (error) {
            console.error('Failed to book event:', error);
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-hidden">
                <Link to={`/event/${event._id}`}>
                    <img
                        src={event.imageLink}
                        alt={event.title}
                        className="w-full h-48 object-cover object-center"
                    />
                </Link>
                <div className="p-4">
                    <Link to={`/event/${event._id}`}>
                        <h2 className="font-semibold text-lg text-black mb-2">{event.title}</h2>
                    </Link>
                    <p className="text-gray-700">{event.date}</p>
                    <p className="text-gray-700">{event.address}</p>
                    <p className="text-gray-700">Price: {event.price}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <Link
                        to={`/event/${event._id}`}
                        className="inline-flex items-center justify-center px-4 py-2 mr-2 text-xs font-semibold text-white uppercase transition-all duration-150 ease-in-out transform bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        View Details
                    </Link>
                    <button
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white uppercase transition-all duration-150 ease-in-out transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
