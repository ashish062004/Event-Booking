//event details
import React from 'react';
import { useParams } from 'react-router-dom';


export default function EventDetails() {
    const { id } = useParams();
    //fetching event details by id
    const [event, setEvent] = React.useState({});
    React.useEffect(() => {
        fetch(`http://localhost:3000/event/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data);
            });
    }, [id]);
    
    return (
        <div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={event.imageLink}
                        alt={event.title}
                        className="w-full h-48 object-cover object-center"
                    />
                    <div className="p-4">
                        <h2 className="font-semibold text-lg text-black">Title: {event.title}</h2>
                        <p className="text-gray-500">Date: {event.date}</p>
                        <p className="text-gray-500">Address: {event.address}</p>
                        <p className="text-gray-500">Description: {event.description}</p>
                        <p className="text-gray-500">Price: {event.price}</p>
                        <p className="text-gray-500">Duration: {event.duration}</p>
                        <p className="text-gray-500">Sponsor: {event.sponsor}</p>
                        </div>
                        
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="block p-2 text-center bg-blue-500 text-white"
                    >
                        Back
                    </button>
            </div>
        </div>
    );
}

