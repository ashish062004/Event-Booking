const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/admin/signupController.js');
const { signin } = require('../controllers/admin/signinController.js');
const { createEvent } = require('../controllers/admin/eventController.js');
const { updateEvent } = require('../controllers/admin/eventController.js');
const { getAllEventsByCreator } = require('../controllers/admin/eventController.js');
const AdminMiddleware = require('../middlewares/admin.js');

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Event creation route
router.post('/events', AdminMiddleware, createEvent);

// Event update route
router.put('/events/:id', AdminMiddleware, updateEvent);

// Get all events by creator
router.get('/events', AdminMiddleware, getAllEventsByCreator);

module.exports = router;
