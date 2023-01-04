import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loading from '../assets/loading.gif';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/Stats.css';

export default function Stats() {
  const navigate = useNavigate();
  const [studyStats, setStudyStats] = useState(null);

  const handleLogout = async () => {
    console.log(`Logging out`);
    localStorage.removeItem('jwt_token');
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const fetchData = async () => {
        try {
          const fetchStudyData = await axios.get('http://localhost:9000/api/study/getStudyStats', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          setStudyStats(fetchStudyData.data);
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

  if (!studyStats) {
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

        <div className="stats-card">
          <h3 className="stats-label">This Week</h3>
          <div className="stats-box">
            <div className="stat">
              <h4>This Week</h4>
              <h3>{studyStats.weekTotal}</h3>
            </div>
            <div className="stat">
              <h4>Today</h4>
              <h3>{studyStats.todayTotal}</h3>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3 className="stats-label">Overall</h3>
          <div className="stats-box">
            <div className="stat">
              <h4>Total Grind</h4>
              <h3>{studyStats.overallTotal}</h3>
            </div>
            <div className="stat">
              <h4>Longest Sesh</h4>
              <h3>{studyStats.longestSession}</h3>
            </div>
          </div>
        </div>

        <button class="btn" onClick={() => handleLogout()}>Sign Out</button>

      </div>
      <div className="navbar">
        <img src={home} onClick={() => navigate('/home')} alt="Loading..." />
        <img src={study} onClick={() => navigate('/study')} alt="Loading..." />
        <img src={stats} className="active" onClick={() => navigate('/stats')} alt="Loading..." />
      </div>
    </div>
  )
}
