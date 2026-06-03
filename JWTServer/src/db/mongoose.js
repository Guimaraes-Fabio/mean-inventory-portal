const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });