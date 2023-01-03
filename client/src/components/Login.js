import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/Login.css';

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label class="label">Email</label>
        <input
          type="text"
          id="email"
          class="form-field"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label class="label">Password</label>
        <input
          type="password"
          id="password"
          class="form-field"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button class="btn" type="submit">Login</button>
      </form>
    </div>
    
  );
}
