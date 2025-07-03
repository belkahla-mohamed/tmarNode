require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb+srv://devmohamedbelkahla:uCMzWAlgTVWZGisi@cluster1.lrw6fh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose; 