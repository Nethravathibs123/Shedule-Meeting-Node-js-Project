const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to get the meeting schedule page
router.get('/schedule', meetingController.getSchedule);

// Route to handle the form submission for scheduling a meeting
router.post('/schedule', meetingController.postSchedule);

// Route to delete a meeting by ID
router.get('/delete/:id', meetingController.deleteMeeting);

module.exports = router;
