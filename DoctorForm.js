// components/DoctorForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorForm() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', specialization: '', phone: '', experience: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors').then(res => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/doctors', form).then(res => {
      setDoctors([...doctors, res.data]);
      setForm({ name: '', specialization: '', phone: '', experience: '' });
    });
  };

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Specialization" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Experience" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
        <button type="submit">Add Doctor</button>
      </form>

      <ul>
        {doctors.map(doc => (
          <li key={doc._id}>{doc.name} - {doc.specialization}</li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorForm;
