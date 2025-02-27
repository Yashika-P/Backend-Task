const express = require("express");
const { buyTicket, getTickets } = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/buy", authMiddleware, buyTicket);
router.get("/", authMiddleware, getTickets);

module.exports = router;
