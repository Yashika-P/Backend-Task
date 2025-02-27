const Ticket = require("../models/ticketModel");

const buyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.find().populate("event user");
  res.json(tickets);
};

module.exports = { buyTicket, getTickets };
