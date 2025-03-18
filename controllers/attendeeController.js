const Attendee = require('../models/attendeeModel');

// ✅ Get all attendees
const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find().populate('eventId');
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new attendee
const createAttendee = async (req, res) => {
  const { name, email, eventId } = req.body;

  if (!name || !email || !eventId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAttendee = new Attendee({ name, email, eventId });
    await newAttendee.save();
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete an attendee by ID
const deleteAttendee = async (req, res) => {
  const { id } = req.params;

  try {
    await Attendee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


    

module.exports = { getAttendees, createAttendee, deleteAttendee };
