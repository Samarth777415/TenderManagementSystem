const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming the User model is in ../models/User
const Tender = require('../models/Tender'); // Assuming the Tender model is in ../models/Tender
const Quotation = require('../models/Quatation'); // Corrected model import
const router = express.Router();

// Create a new quotation
router.post('/create', async (req, res) => {
    const { createrId, tenderId, tenderTable,status, totalSum } = req.body;

    try {
        if (!createrId || !tenderId || !tenderTable || !totalSum) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const tenderExists = await Tender.findById(tenderId);
        if (!tenderExists) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        const existingQuotation = await Quotation.findOne({ createrId, tenderId });
        if (existingQuotation) {
            return res.status(400).json({ message: 'You have already applied for this tender.' });
        }

        const newQuotation = new Quotation({
            _id: new mongoose.Types.ObjectId(),
            createrId,
            tenderId,
            tenderTable,
            status,
            totalSum
        });

        await newQuotation.save();
        res.status(201).json(newQuotation);
    } catch (error) {
        console.error('Error creating quotation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get comparative quotations for a specific tender
router.get('/:tenderId/comparative', async (req, res) => {
    try {
        const { tenderId } = req.params;
        const quotations = await Quotation.find({ tenderId });

        if (!quotations.length) {
            return res.status(404).json({ message: 'No quotations found for this tender' });
        }

        const sortedQuotations = quotations.sort((a, b) => a.totalSum - b.totalSum);
        res.json(sortedQuotations);
    } catch (error) {
        console.error('Error fetching comparative quotations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all quotations for a specific tender
router.get('/:tenderId/all', async (req, res) => {
    const { tenderId } = req.params;

    try {
        const quotations = await Quotation.find({ tenderId }).sort({ createdAt: -1 });
        res.status(200).json(quotations);
    } catch (error) {
        console.error('Error retrieving quotations:', error.message);
        res.status(500).json({ error: 'Failed to retrieve quotations' });
    }
});

router.get('/:tenderId/:userId/status', async (req, res) => {
    try {
      const { tenderId, userId } = req.params;
  
      // Find the quotation with the specified tenderId and userId
      const quotation = await Quotation.findOne({ tenderId: tenderId, createrId: userId });
      // Update the status to 'Submitted'
      res.status(200).json(quotation);
    } catch (error) {
        console.error('Error fetching user quotations:', error);
        res.status(500).json({ message: 'Failed to fetch quotations' });
      }
  });
  // PATCH endpoint in your server-side controller
  router.patch('/:quotationId/award', async (req, res) => {
    const { quotationId } = req.params;
    const { tenderId } = req.body;
  
    try {
      // Mark the selected quotation as 'awarded'
      await Quotation.updateOne(
        { _id: quotationId },
        { status: 'Awarded' }
      );
  
      // Mark all other quotations for the same tender as 'not awarded'
      await Quotation.updateMany(
        { tenderId: tenderId, _id: { $ne: quotationId } },
        { status: 'Not Awarded' }
      );
  
      res.status(200).json({ message: 'Quotation status updated successfully.' });
    } catch (error) {
      console.error('Error updating quotation status:', error);
      res.status(500).json({ error: 'An error occurred while updating the status.' });
    }
  });
  

  
module.exports = router;
