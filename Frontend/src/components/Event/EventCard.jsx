//event Card
import React from 'react';
import { Link } from 'react-router-dom';
import {api} from '../../api';

export default function EventCard({ event }) {

    const handleBookNow = async () => {
        //give confirmation before booking
        if (!window.confirm('Are you sure you want to book this event?')) {
            return;
        }
        //booking event on user/book/:id 
        const response = await api.post(`/user/book/${event._id}`);
        alert(response.data.message);

        //if booking is successful, generate ticket in png format
        if (response.data.message === 'Event booked successfully') {
            const ticketResponse = await api.get(`/user/ticket/${response.data.ticket._id}`);
            const blob = new Blob([ticketResponse.data], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            window.open(url);
        }
    };
          
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Link to={`/event/${event._id}`}>
                    <img
                        src={event.imageLink}
                        alt={event.title}
                        className="w-full h-48 object-cover object-center"
                    />
                </Link>
                <div className="p-4">
                    <Link to={`/event/${event._id}`}>
                        <h2 className="font-semibold text-lg text-black">{event.title}</h2>
                    </Link>
                    <p className="text-gray-500">{event.date}</p>
                    <p className="text-gray-500">{event.address}</p>
                    //give price of ticket
                    <p className="text-gray-500">Price: {event.price}</p>
                </div>
                <Link
                    to={`/event/${event._id}`}
                    className="block p-2 text-center bg-blue-500 text-white"
                >
                    View Details
                </Link>
                <button className="block p-2 text-center bg-blue-500 text-white" onClick={handleBookNow}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
