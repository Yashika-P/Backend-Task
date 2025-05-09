const express = require("express");
const { createTicket, getAllTickets, deleteTicket, getUserTickets } = require("../controllers/ticketController");

const router = express.Router();

// ✅ Create Ticket Route
router.post("/",createTicket);

// ✅ Get All Tickets Route
router.get("/", getAllTickets);

// ✅ Get User Tickets Route
router.get("/user/:userId", getUserTickets);


// ✅ Delete Ticket Route
router.delete("/:id", deleteTicket);


module.exports = router;

