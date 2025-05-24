import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ doctorId: '', patientId: '', date: '', time: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors').then(res => setDoctors(res.data));
    axios.get('http://localhost:5000/api/patients').then(res => setPatients(res.data));
    axios.get('http://localhost:5000/api/appointments').then(res => setAppointments(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointments', form).then(res => {
      setAppointments([...appointments, res.data]);
      setForm({ doctorId: '', patientId: '', date: '', time: '' });
    });
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={e => setForm({ ...form, doctorId: e.target.value })}>
          <option>Select Doctor</option>
          {doctors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <select onChange={e => setForm({ ...form, patientId: e.target.value })}>
          <option>Select Patient</option>
          {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
        <button type="submit">Schedule</button>
      </form>

      <ul>
        {appointments.map(a => (
          <li key={a._id}>{a.patientId?.name} with {a.doctorId?.name} on {a.date} at {a.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentForm;
