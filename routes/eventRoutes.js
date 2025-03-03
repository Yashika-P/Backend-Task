const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const router = express.Router();


// Dummy Event Data
const events = [
  { id: 1, title: "Music Festival", date: "2025-03-10" },
  { id: 2, title: "Tech Conference", date: "2025-04-15" }
];

// Get All Events
router.get("/", (req, res) => {
  res.json(events);
});

// ✅ Correct API route for fetching events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
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


router.post("/", createEvent);
router.get("/", getAllEvents);

module.exports = router;
