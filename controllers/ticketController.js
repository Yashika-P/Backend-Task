const Ticket = require('../models/ticketModel');

const createTicket = async (req, res) => {
  const { eventId, userId, ticketType, price, quantity } = req.body;

  // ✅ Validate data before saving
  if (!eventId || !userId || !ticketType || !price || !quantity) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const ticket = new Ticket({
      eventId,
      userId,
      ticketType,
      price,
      quantity,
    });

    await ticket.save();

    res.status(201).json({ message: "Ticket purchased successfully", ticket });
  } catch (error) {
    console.error("Failed to create ticket:", error);
    res.status(500).json({ message: "Failed to purchase ticket" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("eventId userId");
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Failed to get tickets:", error);
    res.status(500).json({ message: "Failed to get tickets" });
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

// ✅ Export the functions correctly
module.exports = { createTicket, getAllTickets, deleteTicket };
