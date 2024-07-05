import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function EventCard({ event }) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const { isSignin, role  } = useAuth();

    const backendUrl ='http://localhost:3000';
    let imageURL = `${backendUrl}/${event.image.replace(/\\/g, '/')}`;
    console.log("imageURL ",imageURL);

    const handleBookNowClick = () => {
        if (!isSignin && role === 'user') {
            alert('Please sign in or sign in as a user to book the event.');
            return;
        }
        setShowPaymentForm(true);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        handleBookNow();
        setShowPaymentForm(false);
    };


    const handleBookNow = async () => {
        try {
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
                        onClick={handleBookNowClick}
                    >
                        Book Now
                    </button>
                    {showPaymentForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4">
                <p className="text-lg font-semibold mb-4">Ticket Price: ${event.price}</p>
                    <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">Payment ID</label>
                    <input
                        type="text"
                        id="paymentId"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                        placeholder="Enter Payment ID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirm Payment
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowPaymentForm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
                </div>
            </div>
        </div>
    );
}
