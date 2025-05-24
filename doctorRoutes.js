// backend/routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.post('/', async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.status(201).json(doctor);
});

router.put('/:id', async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doctor);
});

module.exports = router;
