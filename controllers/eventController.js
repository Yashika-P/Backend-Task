const Event = require("../models/eventModel");



const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, ticketPrice, organizer, image } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      ticketPrice,
      organizer,
      image,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// ✅ Get all events from MongoDB
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log("📌 Events from MongoDB:", events); // ✅ Debug log
    res.status(200).json(events);
  } catch (error) {
    console.error("❌ Failed to fetch events:", error);
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

// ✅ Get a single event by ID
const getEventById = async (req, res) => {
  console.log("Incoming request for event:", req.params.id);

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      console.log("Event not found");
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event data:", event);
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export functions
module.exports = { createEvent, getAllEvents, getEventById };
