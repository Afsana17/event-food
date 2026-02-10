const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seatNumber: String,
  price: {
    type: Number,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'cancelled', 'refunded'],
    default: 'booked',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  mealCombo: {
    included: { type: Boolean, default: false },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    }],
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
