const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Assuming bcryptjs is installed for password hashing
dotenv.config();

mongoose.connect(process.env.DB_URI);

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phone: Number,
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phone: Number,
    bookedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    address: String,
    image: String,
    price: Number,
    duration: Number,
    date: { type: Date, required: true },
    sponsor: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true });

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Password hashing middleware for Admin and User
AdminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = {
    Admin,
    User,
    Event,
    Ticket
};