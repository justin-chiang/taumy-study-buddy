import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loading from '../assets/loading.gif';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/Study.css';

export default function Study() {
  const navigate = useNavigate();
  const [studySessions, setStudySessions] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const fetchData = async () => {
        try {
          const fetchStudySessions = await axios.get('http://localhost:9000/api/study/getSessions', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          setStudySessions(fetchStudySessions.data);
          console.log(studySessions);
        } catch (err) {
          localStorage.removeItem('jwt_token');
          alert('Invalid session, navigating to login page.');
          console.log(err);
          navigate('/');
        }
      }
      fetchData();
    }
    else {
      navigate('/');
    }
  }, [navigate]);

  if (!studySessions) {
    return(
      <div className="bg-container">
        <div className="loading">
          <img src={loading}></img>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-container">
      <div className="dashboard-container">
        
      </div>
      <div className="navbar">
        <img src={home} onClick={() => navigate('/home')} alt="Loading..." />
        <img src={study} className="active" onClick={() => navigate('/study')} alt="Loading..." />
        <img src={stats} onClick={() => navigate('/stats')} alt="Loading..." />
      </div>
    </div>
  )
}
