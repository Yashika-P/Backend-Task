const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const events = [
  { id: 1, title: "Music Festival", date: "2025-03-10" },
  { id: 2, title: "Tech Conference", date: "2025-04-15" }
];

// Get all events
const getAllEvents = (req, res) => {
  res.json(events);
};

exports.getEvents = (req, res) => {
  res.status(200).json({ message: "List of events" });
};

exports.createEvent = (req, res) => {
  res.status(201).json({ message: "Event created successfully" });
};


module.exports = { createEvent, getAllEvents };
