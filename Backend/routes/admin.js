const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/admin/signupController.js');
const { signin } = require('../controllers/admin/signinController.js');
const { createEvent } = require('../controllers/admin/eventController.js');
const { getAllEventsByCreator } = require('../controllers/admin/eventController.js');
const AdminMiddleware = require('../middlewares/admin.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './uploads/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Return the directory path
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Event creation route
router.post('/events', AdminMiddleware, upload.single('image'), createEvent);

// Get all events by creator
router.get('/events', AdminMiddleware, getAllEventsByCreator);

module.exports = router;
