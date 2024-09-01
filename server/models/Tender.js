// models/Tender.js
const User = require('./User');
const mongoose = require('mongoose')


// Define the schema for a single row in the tender table
const tenderRowSchema = new mongoose.Schema({
  columnName: { type: String, required: true },  // e.g., Material Name, Quantity, Price
  columnValue: { type: String, required: true }, // Corresponding values for each column
});

// Define the schema for the tender
const tenderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique ID for each tender
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created the tender
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, default: 'Open' },
  tenderTable: { 
    type: [[tenderRowSchema]], // Array of arrays for rows and columns
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

// Create the Tender model
const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
