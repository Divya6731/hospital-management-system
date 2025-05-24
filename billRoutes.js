// backend/routes/billRoutes.js
const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

router.get('/', async (req, res) => {
  const bills = await Bill.find().populate('patientId');
  res.json(bills);
});

router.post('/', async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.status(201).json(bill);
});

module.exports = router;
