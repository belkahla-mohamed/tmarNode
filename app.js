const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// Routes (to be implemented)
const datesRoutes = require('./routes/dates');
app.use('/dates', datesRoutes);
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);
const paymentsRoutes = require('./routes/payments');
app.use('/payments', paymentsRoutes);

app.get('/', (req, res) => {
  res.send('✅ Node.js backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 