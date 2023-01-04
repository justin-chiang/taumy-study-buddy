import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

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
      alert('Login failed. Please double check your email and password.');
      console.log(err);
    }
    
  }

  return (
    <div className="bg-container">
      <div className="login-container">

        <h3 className="header">Login</h3>

        <div className="input-field">
          <h3 className="field-label">Email</h3>
          <input type="text" id="email" className="form-field" value={email} 
          onChange={(event) => setEmail(event.target.value)} ></input>
        </div>

        <div className="input-field">
          <h3 className="field-label">Password</h3>
          <input type="password" id="password" className="form-field" value={password} 
          onChange={(event) => setPassword(event.target.value)} ></input>
        </div>

        <button className="btn" type="submit" onClick={handleLogin}>Login</button>

        <h3 className="footer" onClick={() => navigate('/register')}>Don't have an account?</h3>
      </div>
    </div>
    
  );
}
