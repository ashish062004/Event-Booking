# Event Booking Web Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This is an Event Booking Web Application built with React, Tailwind CSS, Node.js, Express, and MongoDB with Mongoose. It allows admins to create events and users to book events. Guest users can view event details without signup.

## Features

- **Admin:**
  - Create, update, and delete events
  - View all bookings for an event

- **User:**
  - Register and login
  - Book events
  - View booking history

- **Guest:**
  - View event details

## Technologies Used

- **Frontend:**
  - vite
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express

- **Database:**
  - MongoDB
  - Mongoose

## Installation

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashish062004/Event-Booking.git
   cd event-booking
   ```
2. **Install dependencies for the backend:**
    ```bash
    cd backend
    npm install
    ```
3. **Install dependencies for the frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
4. **Set up environment variables:**
    Create a .env file in the backend directory and add the following:
    ```bash
    DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
5. **Start the backend server:**
    ```bash
    cd backend
    npm run dev
    ```
6. **Start the frontend server:**
    ```bash
    cd ../frontend
    npm run dev
    ```

## Usage
1. Admin:
    - signup or signin as admin
    - Create, update, or delete events
2. User:
    - signup or signin as user
    - Browse events and book them
3. Guest:
    - Browse events and view details

