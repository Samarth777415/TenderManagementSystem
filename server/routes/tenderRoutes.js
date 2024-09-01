const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const Tender = require('../models/Tender');
const User = require('../models/User'); // Import User model for reference
const authenticateToken = require('../middleware/authMiddleware'); // Ensure you have middleware for token authentication

// Create a new tender
router.post('/create',  async (req, res) => {
    const { title, description, deadline, status,userId } = req.body;
   // Extract user ID from the authenticated user object
  
    try {
        // Validate required fields
        if (!title || !description || !deadline || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new tender instance with creator's ID
        const newTender = new Tender({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            deadline,
            status,
            userId // Assign the user ID to the tender
        });

        // Save the new tender
        await newTender.save();
        res.status(201).json(newTender);
    } catch (error) {
        console.error('Error creating tender:', error.message);
        res.status(500).json({ error: 'Failed to create tender' });
    }
});

// Get all tenders
router.get('/all', async (req, res) => {
    try {
        const tenders = await Tender.find();
        res.status(200).json(tenders);
    } catch (error) {
        console.error('Error retrieving tenders:', error.message);
        res.status(500).json({ error: 'Failed to retrieve tenders' });
    }
});

// Update tender with details
router.put('/:id/details', async (req, res) => {
  const { id } = req.params;
  const { tenderTable } = req.body; // Expecting tenderTable

  try {
      // Validate input
      if (!tenderTable) {
          return res.status(400).json({ message: 'TenderTable is required' });
      }

      // Update the tender document with the new details
      const updatedTender = await Tender.findByIdAndUpdate(
          id,
          { $set: { tenderTable } }, // Update tenderTable
          { new: true }
      );

      if (!updatedTender) {
          return res.status(404).json({ message: 'Tender not found' });
      }

      res.status(200).json(updatedTender);
  } catch (error) {
      console.error('Error updating tender details:', error.message);
      res.status(500).json({ message: 'Error updating tender details', error });
  }
});


// Get tender details by ID
router.get('/:id/details', async (req, res) => {
    const { id } = req.params;

    try {
        const tender = await Tender.findById(id); // Fetch tender by ID

        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        res.status(200).json(tender); // Return the tender details
    } catch (error) {
        console.error('Error fetching tender details:', error.message);
        res.status(500).json({ message: 'Error fetching tender details', error });
    }
});

module.exports = router;
