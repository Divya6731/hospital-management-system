import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientForm() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    contact: '',
    disease: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then(res => setPatients(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/patients', form).then(res => {
      setPatients([...patients, res.data]);
      setForm({
        name: '',
        age: '',
        gender: '',
        address: '',
        contact: '',
        disease: ''
      });
    });
  };

  return (
    <div>
      <h2>Patient Details</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        <input placeholder="Gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />
        <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
        <input placeholder="Disease" value={form.disease} onChange={e => setForm({ ...form, disease: e.target.value })} />
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map(p => (
          <li key={p._id}>{p.name} - {p.disease}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientForm;
