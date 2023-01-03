import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import home from '../assets/home.png';
import study from '../assets/study.png';
import stats from '../assets/stats.png';
import '../styles/Study.css';

export default function Study() {
  const navigate = useNavigate();
  const [studySessions, setStudySessions] = useState(null);

  // if (!studySessions) {
  //   return <div>Fetching data</div>
  // }

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
