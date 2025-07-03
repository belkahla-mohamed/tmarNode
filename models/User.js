const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  Role: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema); 