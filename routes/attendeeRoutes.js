const express = require('express');
const { getAttendees, createAttendee, deleteAttendee } = require('../controllers/attendeeController');

const router = express.Router();

router.get('/', getAttendees);          // ✅ Get all attendees
router.post('/', createAttendee);        // ✅ Create an attendee
router.delete('/:id', deleteAttendee);   // ✅ Delete an attendee

module.exports = router;
