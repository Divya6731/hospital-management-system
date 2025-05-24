// backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  const appointments = await Appointment.find().populate('doctorId').populate('patientId');
  res.json(appointments);
});

router.post('/', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.status(201).json(appointment);
});

module.exports = router;
