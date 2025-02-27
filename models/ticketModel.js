const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("Ticket", ticketSchema);
