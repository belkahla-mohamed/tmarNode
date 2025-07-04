const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  dateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Date', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema); 