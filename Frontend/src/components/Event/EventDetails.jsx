import React from 'react';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = React.useState({});

    React.useEffect(() => {
        fetch(`http://localhost:3000/event/${id}`)
           .then((response) => response.json())
           .then((data) => {
                setEvent(data);
            });
    }, [id]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="max-w-4xl mx-auto">
                <img
                    src={event.imageLink}
                    alt={event.title}
                    className="w-full h-64 object-cover object-center mb-4"
                />
                <div>
                    <h2 className="font-semibold text-2xl text-black mb-2">{event.title}</h2>
                    <p className="text-gray-700">Date: {event.date}</p>
                    <p className="text-gray-700">Address: {event.address}</p>
                    <p className="text-gray-700">Description: {event.description}</p>
                    <p className="text-gray-700">Price: {event.price}</p>
                    <p className="text-gray-700">Duration: {event.duration}</p>
                    <p className="text-gray-700">Sponsor: {event.sponsor}</p>
                </div>
                <div className="mt-4">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white uppercase transition-all duration-150 ease-in-out transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
