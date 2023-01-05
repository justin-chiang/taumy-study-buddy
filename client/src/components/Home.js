import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import taumyHappy from '../assets/emotionGrin.gif';
import taumySad from '../assets/emotionSad.gif';
import loading from '../assets/loading.gif';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [taumyState, setTaumyState] = useState('');
  const [studyMsg, setStudyMsg] = useState('');
  const [time, setTime] = useState(new Date());
    
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const fetchData = async () => {
        try {
          const fetchUser = await axios.get('https://taumy-study-buddy.onrender.com/api/users/whoami', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          const fetchStudyData = await axios.get('https://taumy-study-buddy.onrender.com/api/study/getStudiedToday', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
          });
          setUser(fetchUser.data);

          if (fetchStudyData.data.studied) {
            setTaumyState('happy');
            setStudyMsg('You logged a study session today! Come back tomorrow or study more today.') //fix
          }
          else {
            setTaumyState('sad');
            setStudyMsg("Taumy is sad you haven't studied yet today. Log a study session to cheer Taumy up!");
          }
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

  if (!user || taumyState === '' || studyMsg === '' || !time) {
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
        <img src={taumyState === 'happy' ? taumyHappy : taumySad} alt="Loading..." className="taumygif" />
        <div>
          <h3 className="time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
          <h3 className="name">Welcome, {user.name}!</h3>
          <p className="studymsg">{studyMsg}</p>
        </div>
      </div>
      <div className="navbar">
        <img src={home} className="active" onClick={() => navigate('/home')} alt="Loading..." />
        <img src={study} onClick={() => navigate('/study')} alt="Loading..." />
        <img src={stats} onClick={() => navigate('/stats')} alt="Loading..." />
      </div>
    </div>
  )
}
