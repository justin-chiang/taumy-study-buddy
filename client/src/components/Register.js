import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    console.log(`Registering user with name: ${name}, with email: ${email} and password: ${password}`);

    try {
      const registerResponse = await axios.post('http://localhost:9000/api/users/register', { name, email, password });
      console.log(registerResponse);
    } catch (err) {
      alert('user already exists');
      console.log(err);
    }
    
  }

  return (
    <div className="main">
      <h1>Register</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
    
  );
}