import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    console.log(`Logging in with email: ${email} and password: ${password}`);

    try {
      const loginResponse = await axios.post('http://localhost:9000/api/users/login', { email, password });
      localStorage.setItem('jwt_token', loginResponse.data.token);
      console.log(loginResponse);
      navigate('/home');
    } catch (err) {
      alert('failed login');
      console.log(err);
    }
    
  }

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
    
  );
}
