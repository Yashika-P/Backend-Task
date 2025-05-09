const Ticket = require('../models/ticketModel');

const createTicket = async (req, res) => {
    try {
        const { eventId, userId, ticketType, price, quantity } = req.body;

        // ✅ Create a new ticket
        const newTicket = await Ticket.create({
            eventId,
            userId,
            ticketType,
            price,
            quantity,
            purchaseDate: new Date(),
        });

        // ✅ Send back a proper response
        res.status(201).json({
            success: true,  // ✅ Make sure this line is present
            message: "Ticket purchased successfully",
            ticket: newTicket,
        });
    } catch (error) {
        console.error("🚨 Error creating ticket:", error);
        res.status(500).json({
            success: false,
            message: "Failed to purchase ticket. Please try again.",
        });
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

// ✅ Get Tickets Purchased by User
const getUserTickets = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tickets = await Ticket.find({ userId }).populate("eventId", "title date location image");
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching user tickets:", error);
        res.status(500).json({ message: "Error fetching user tickets" });
    }
};




// ✅ Export the functions correctly
module.exports = { createTicket, getAllTickets, deleteTicket, getUserTickets };
