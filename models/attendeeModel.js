const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
}, { timestamps: true });

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;
