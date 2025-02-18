const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming the User model is in ../models/User
const Tender = require('../models/Tender'); // Assuming the Tender model is in ../models/Tender
const router = express.Router();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/check-gst', async (req, res) => {
  const { gstNumber } = req.body;

  try {
    const existingUser = await User.findOne({ gstNumber });
    if (existingUser) {
      return res.json({ isUnique: false });
    }
    return res.json({ isUnique: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Server error while checking GST uniqueness' });
  }
});

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, gstNumber } = req.body;

  if (!username || !email || !password || !gstNumber) {
    return res.status(400).json({ message: 'Please provide all fields including GST Number' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashedPassword,
      gstNumber,
      tenders: [], // Initialize the tenders array as empty
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, _id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the request parameters

    // Fetch the user from the database using the ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's details (you can select specific fields if needed)
    res.status(200).json({ username: user.username, gstNumber: user.gstNumber });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

router.get('/me', async (req, res) => {
  try {
   
    const token = req.headers.authorization.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    const user = await User.findById(decoded._id); // Fetch the user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ _id: user._id });
  } catch (error) { 
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

module.exports = router;
