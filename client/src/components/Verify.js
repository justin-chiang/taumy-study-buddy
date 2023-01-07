import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import taumyHappy from '../assets/emotionGrin.gif';
import loading from '../assets/loading.gif';
import '../styles/verify.css';

export default function Home() {
  const navigate = useNavigate();
  const params = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      try {
        console.log(params);
        const validate = await axios.post('https://taumy-study-buddy.onrender.com/api/users/verify', { id: params.id, token: params.token });
        setVerified(true);
      } catch (err) {
        alert('Invalid link, navigating to login page.');
        console.log(err);
        navigate('/');
      }
    }
    validateUser();
  }, [navigate]);

  if (!verified) {
    return(
      <div className="bg-container">
        <div className="loading">
          <img src={loading} alt="Loading..."></img>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-container">
      <div className="verify-container">
        <div className="taumy-greet">
          <img src={taumyHappy} alt="Loading..."></img>
          <h1>You have successfully verified your email! Click below to return to the login screen:</h1>
        </div>
        <h3 className="footer" onClick={() => navigate('/')}>Return to login page</h3>
      </div>
    </div>
  )
}
