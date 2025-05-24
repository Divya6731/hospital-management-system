import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
