const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryLocation: {
    seatNumber: String,
    section: String,
    venue: String,
  },
  status: {
    type: String,
    enum: ['placed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'placed',
  },
  specialInstructions: String,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: Date,
  rating: {
    food: Number,
    service: Number,
    comment: String,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
