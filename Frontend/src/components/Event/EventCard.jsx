import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function EventCard({ event }) {
    
    const backendUrl ='http://localhost:3000';
    let imageURL = `${backendUrl}/${event.image.replace(/\\/g, '/')}`;
    console.log("imageURL ",imageURL);

    const handleBookNow = async () => {
        try {
            //conform booking
            if(!window.confirm('Are you sure you want to book this event?')) 
                return;
            const response = await api.post(`/user/book/${event._id}`);
            alert(response.data.message);

            if (response.data.message === 'Event booked successfully') {
                const ticketId = response.data.ticketId;
                const ticketResponse = await api.get(`/user/ticket/${ticketId}`, { responseType: 'blob' });
                const blob = new Blob([ticketResponse.data], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ticket.png');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            console.error(error);
            alert('Failed to book the event. Please try again later.');
        }
    };
      

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-hidden">
                <Link to={`/event/${event._id}`}>
                    <img
                        src={imageURL}
                        alt={event.title}
                        className="w-full h-48 object-cover object-center"
                    />
                </Link>
                <div className="p-4">
                    <Link to={`/event/${event._id}`}>
                        <h2 className="font-semibold text-lg text-black mb-2"><b>{event.title}</b></h2>
                    </Link>
                    <p className="text-gray-700"><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><b>Address:</b> {event.address}</p>
                    <p className="text-gray-700"><b>Price:</b> {event.price}</p>
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
