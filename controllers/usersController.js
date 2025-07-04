const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, password, Role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) return res.status(400).json({ status: 'error', message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, userName, email, phone, password: hashedPassword, Role });
    await user.save();
    res.status(201).json({ status: 'success', message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, Role: user.Role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ status: 'success', message: 'Login successful', token, user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Profile
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json({ status: 'success', user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json({ status: 'success', message: 'User updated', user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Logout (client should just delete token)
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'success', message: 'Logged out' });
};

// Middleware to verify JWT
// to be used in routes: 
exports.auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ status: 'error', message: 'No token provided' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
}; 