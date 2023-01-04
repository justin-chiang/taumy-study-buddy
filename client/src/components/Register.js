import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.css';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('Please enter a password that is at least 8 characters long, containing at least one uppercase letter, lowercase letter, digit, and special symbol.')
      return;
    }
    
    console.log(`Registering user with name: ${name}, with email: ${email} and password: ${password}`);

    try {
      const registerResponse = await axios.post('http://localhost:9000/api/users/register', { name, email, password });
      alert('User created! Navigate to the login page to login with your account.');
      console.log(registerResponse);
    } catch (err) {
      alert('User with this email already exists. Please enter another email to create an account.');
      console.log(err);
    }
    
  }

  return (
    <div className="bg-container">
      <div className="login-container">

        <h3 className="header">Register</h3>

        <div className="input-field">
          <h3 className="field-label">Name</h3>
          <input type="text" id="name" className="form-field" value={name} 
          onChange={(event) => setName(event.target.value)} ></input>
        </div>

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

        <button className="btn" type="submit" onClick={handleRegister}>Register</button>

        <h3 className="footer" onClick={() => navigate('/')}>Login with existing account</h3>
      </div>
    </div>
    
  );
}