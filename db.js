require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb+srv://belkahlaLamsila:%_S6RP3HrbXYEAW@cluster0.dchlnge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose; 