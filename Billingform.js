import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BillingForm() {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ patientId: '', amount: '', date: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients').then(res => setPatients(res.data));
    axios.get('http://localhost:5000/api/bills').then(res => setBills(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/bills', form).then(res => {
      setBills([...bills, res.data]);
      setForm({ patientId: '', amount: '', date: '', description: '' });
    });
  };

  return (
    <div>
      <h2>Billing</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={e => setForm({ ...form, patientId: e.target.value })}>
          <option>Select Patient</option>
          {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <input placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Generate Bill</button>
      </form>

      <ul>
        {bills.map(b => (
          <li key={b._id}>{b.patientId?.name} - ₹{b.amount} - {b.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default BillingForm;
