const mongoose = require('mongoose');

// Schema for each row in the tender table
const tenderRowSchema = new mongoose.Schema({
  material: { type: String, required: true },  // Material Name
  quantity: { type: String, required: true },  // Quantity of the Material
  price: { type: String, required: true },     // Price for the Material
});

// Schema for the quotation
const quotationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique ID for each quotation
  createrId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user creating the quotation
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true }, // Reference to the tender
  tenderTable: { 
    type: [tenderRowSchema], // Array of tender row schemas
    default: [],
  },
  totalSum: { type: Number, required: true },
  status: { type: String, default: 'Open' }, // Total sum of the prices
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
});

// Creating the Quotation model
const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
