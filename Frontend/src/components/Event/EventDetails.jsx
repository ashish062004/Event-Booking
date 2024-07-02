//event details


import { api } from '../../api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/event/${id}`);
                setEvent(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load event.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="font-semibold text-lg text-black mb-2"><b><i>{event.title}</i></b></h1>
            <img
                src={`http://localhost:3000/${event.image.replace(/\\/g, '/')}`}
                alt={event.title}
                className="w-1/2 h-48 object-cover object-center"
            />
            <br />
            <p className="text-gray-700"><b>Description:</b> {event.description}</p>
            <p className="text-gray-700"><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700"><b>Address:</b> {event.address}</p>
            <p className="text-gray-700"><b>Price:</b> {event.price}</p>
            <br />
           
            <Link
                to="/events"
                className="inline-flex items-center justify-center px-4 py-2 mr-2 text-xs font-semibold text-white uppercase transition-all duration-150 ease-in-out transform bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
                Back
            </Link>
        </div>
    );
}
