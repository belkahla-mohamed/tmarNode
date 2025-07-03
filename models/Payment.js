const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  card_number: { type: String, required: true },
  expiry_date: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, default: 0.00 },
  transaction_id: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema); 