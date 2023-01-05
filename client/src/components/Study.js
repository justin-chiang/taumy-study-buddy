import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import taumyHappy from '../assets/emotionGrin.png';
import taumySad from '../assets/emotionSad.png';
import loading from '../assets/loading.gif';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/study.css';

export default function Study() {
  const navigate = useNavigate();
  const [studySessions, setStudySessions] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const fetchData = async () => {
        try {
          const fetchStudySessions = await axios.get('https://taumy-study-buddy.onrender.com/api/study/getSessions', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          setStudySessions(fetchStudySessions.data);
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
          <img src={loading} alt="Loading..."></img>
        </div>
      </div>
    )
  }

  if (studySessions.length === 0) {
    return(
      <div className="bg-container">
        <div className="dashboard-container-1">
          <h3>No study sessions logged! Log one today.</h3>
        </div>
        <div className="navbar">
          <img src={home} onClick={() => navigate('/home')} alt="Loading..." />
          <img src={study} className="active" onClick={() => navigate('/study')} alt="Loading..." />
          <img src={stats} onClick={() => navigate('/stats')} alt="Loading..." />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-container">
      <div className="dashboard-container-2">
        {studySessions.map((session, index) => (
          <div id={"card-" + index} className="session-card" key={index}>
            <div className="session-bubble">
              <div className="session-date">
                <h3>{session.date}</h3>
                <p>{session.startTime} - {session.endTime}</p>
              </div>
              <div className="session-time">
                <h3>{session.duration}</h3>
                <p>duration</p>
              </div>
            </div>
            <img className="taumy-state" src={session.success ? taumyHappy : taumySad} alt="Loading..."></img>
          </div>
        ))}
      </div>
      <div className="navbar">
        <img src={home} onClick={() => navigate('/home')} alt="Loading..." />
        <img src={study} className="active" onClick={() => navigate('/study')} alt="Loading..." />
        <img src={stats} onClick={() => navigate('/stats')} alt="Loading..." />
      </div>
    </div>
  )
}
