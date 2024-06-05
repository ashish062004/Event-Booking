//display all events

import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import EventCard from './EventCard';

export default function EventList() {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const response = await api.get('/event');
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchEvents();
    }, []);
    
    return (
        <div className="flex flex-wrap -mx-4">
        {events.map((event) => (
            <EventCard key={event._id} event={event} />
        ))}
        </div>
    );
}