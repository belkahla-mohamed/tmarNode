const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Origin: { type: String, required: true },
  Type: { type: String, enum: ['طري', 'شبه جاف', 'جاف'], required: true },
  Description: String,
  NutritionalInfo: String,
  Price: { type: Number, required: true },
  ImagePath: String
});

module.exports = mongoose.model('Date', dateSchema); 