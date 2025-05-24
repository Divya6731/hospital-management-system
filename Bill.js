// backend/models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  amount: Number,
  date: Date,
  description: String
});

module.exports = mongoose.model('Bill', billSchema);
