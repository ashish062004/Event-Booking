const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/user/signupController.js');
const { signin } = require('../controllers/user/signinController.js');
const { bookEvent } = require('../controllers/user/bookEventController.js');
const { getTicket } = require('../controllers/user/getTicketController.js');
const UserMiddleware = require('../middlewares/user.js');

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Book event route
router.post('/book/:id', UserMiddleware, bookEvent);

// Get ticket route
router.get('/ticket/:id', UserMiddleware, getTicket);

module.exports = router;
