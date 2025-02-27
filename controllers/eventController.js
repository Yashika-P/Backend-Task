const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

module.exports = { createEvent, getEvents };
