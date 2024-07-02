// Import necessary hooks and api
import React, { useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';



export default function CreateEvent() {
    const [inputKey, setInputKey] = useState(Date.now());
    const [event, setEvent] = useState({
        title: '',
        description: '',
        address: '',
        image: null, // Changed to null for file
        price: '',
        duration: '',
        date: '',
        sponsor: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setEvent({ ...event, [name]: files[0] }); // Handle file separately
        } else {
            setEvent({ ...event, [name]: value });
        }
    };

    const resetForm = () => {
        setEvent({
            title: '',
            description: '',
            address: '',
            image: null,
            price: '',
            duration: '',
            date: '',
            sponsor: '',
        });
        setInputKey(Date.now());
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append each event property to formData
        Object.keys(event).forEach(key => {
            formData.append(key, event[key]);
        });

        try {
            const response = await api.post('/admin/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for files
                },
            });
            if (response.status === 200) {
                alert('Event created successfully');
                navigate('/events');
            } else {
                alert('Event creation failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl mb-4">Create Event</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={event.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        placeholder="Image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={event.price}
                        onChange={handleChange}
                    />  
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                        Duration (in hours)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="duration"
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        value={event.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sponsor">
                        Sponsor
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sponsor"
                        type="text"
                        placeholder="Sponsor"
                        name="sponsor"
                        value={event.sponsor}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );}