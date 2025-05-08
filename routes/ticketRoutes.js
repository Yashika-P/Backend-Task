const express = require("express");
const { createTicket, getAllTickets, deleteTicket } = require("../controllers/ticketController");

const router = express.Router();

// ✅ Create Ticket Route
router.post("/",createTicket);

// ✅ Get All Tickets Route
router.get("/", getAllTickets);

// ✅ Delete Ticket Route
router.delete("/:id", deleteTicket);


module.exports = router;

