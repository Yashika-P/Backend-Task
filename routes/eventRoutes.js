const express = require("express");
const { createEvent, getAllEvents, getEventById  } = require("../controllers/eventController");
const router = express.Router();

const Event = require("../models/eventModel");

router.post("/", async (req, res) => {
    try {
        const { title, description, date, location, image } = req.body;

        if (!title || !description || !date || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            image // ✅ Pass the image path directly
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from MongoDB
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Failed to load events" });
  }
});

// ✅ Correct API route for fetching events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    console.log("📌 Sending events:", events); // Debugging log
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Fetch a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


router.put('/:id', async (req, res) => {
  const { title, description, date, location, image } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location, image },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get('/:id', getEventById);


module.exports = router;
