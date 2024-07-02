import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import EventCard from './EventCard';

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true); // Set loading to true before starting the fetch
            try {
                const response = await api.get('/event');
                setEvents(response.data);
                console.log("Events: ", response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load events."); // Set error message
            } finally {
                setIsLoading(false); // Set loading to false after the operation completes
            }
        };
        fetchEvents();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEvents = events.filter(event => {
        return (
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="bg-white">
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search by title or city name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            {isLoading? (
                <div>Loading...</div>
            ) : error? (
                <div>{error}</div>
            ) : (
                <div className="flex flex-wrap -m-4 p-4">
                    {filteredEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}
