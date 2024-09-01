// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique ID for each user
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true, // Ensure GST number is required
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
