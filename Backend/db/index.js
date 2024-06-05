const e = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashishYadav:Aay%4013062004@cluster.4koiemy.mongodb.net/eventBooking');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    bookedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    imageLink: String,
    price: Number,
    duration: Number,
    date: Date,
    sponsor: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Admin =  mongoose.model('Admin', AdminSchema)
const User =  mongoose.model('User', UserSchema)
const Event = mongoose.model('Event', EventSchema)
const Ticket = mongoose.model('Ticket', TicketSchema)

module.exports = {
    Admin,
    User,
    Event,
    Ticket
};