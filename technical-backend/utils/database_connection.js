const mongoose = require('mongoose');
const config = require('./config');

// simple async function for connecting to mongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected!');
  } catch (error) {
    console.log('Failed to connect to mongoDB!', error);
  }
};

module.exports = {
  connectDB,
};
