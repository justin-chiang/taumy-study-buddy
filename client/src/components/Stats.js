import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import taumyHappy from '../assets/emotionHappy.png';
import loading from '../assets/loading.gif';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/stats.css';

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
          const fetchStudyData = await axios.get('https://taumy-study-buddy.onrender.com/api/study/getStudyStats', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          console.log(fetchStudyData.data);
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
          <img src={loading} alt="Loading..."></img>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-container">
      <div className="dashboard-container">

        <div className="stats-card">
          <div className="taumy-message">
            <img src={taumyHappy} alt="Loading..."></img>
            <h3>Here are your ongoing stats!</h3>
          </div>
          <div className="stats-streak">
            <h3 className="streak-num">{studyStats.currStreak}</h3>
            <h3>Day Streak</h3>
          </div>
          <div className="stats-box">
            <div className="stat">
              <h3>{studyStats.weekTotalTime}</h3>
              <h4>week</h4>
            </div>
            <div className="stat">
              <h3>{studyStats.weekTotalSessions}</h3>
              <h4>sessions</h4>
            </div>
            <div className="stat">
              <h3>{studyStats.todayTotalTime}</h3>
              <h4>today</h4>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="taumy-message">
            <img src={taumyHappy} alt="Loading..."></img>
            <h3>Here are your all time stats!</h3>
          </div>
          <div className="stats-streak">
            <h3 className="streak-num">{studyStats.totalDaysStudied}</h3>
            <h3>Days Studied</h3>
          </div>
          <div className="stats-box">
            <div className="stat">
              <h3>{studyStats.overallTotalTime}</h3>
              <h4>total</h4>
            </div>
            <div className="stat">
              <h3>{studyStats.overallTotalSessions}</h3>
              <h4>sessions</h4>
            </div>
            <div className="stat">
              <h3>{studyStats.longestTotalSession}</h3>
              <h4>longest</h4>
            </div>
          </div>
        </div>

        <button className="btn" onClick={() => handleLogout()}>Sign Out</button>

      </div>
      <div className="navbar">
        <img src={home} onClick={() => navigate('/home')} alt="Loading..." />
        <img src={study} onClick={() => navigate('/study')} alt="Loading..." />
        <img src={stats} className="active" onClick={() => navigate('/stats')} alt="Loading..." />
      </div>
    </div>
  )
}
