// backend/controllers/patientController.js
const Patient = require('../models/Patient');

const getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

const addPatient = async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
};

module.exports = { getPatients, addPatient };
