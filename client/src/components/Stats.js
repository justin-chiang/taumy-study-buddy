// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Stats() {
//   const navigate = useNavigate();
//   const [studyStats, setStudyStats] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('jwt_token');
//     if (token) {
//       const fetchData = async () => {
//         try {
//           const fetchUser = await axios.get('http://localhost:9000/api/users/whoami', {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
//             }
//           });
//           const fetchStudyData = await axios.get('http://localhost:9000/api/study/getStudiedToday', {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
//             }
//           });
//           setUser(fetchUser.data);

//           if (fetchStudyData.data.studied) {
//             setTaumyState('../assets/emotionGrin.gif');
//             setStudyMsg('You logged a study session today! Come back tomorrow or study more today.');
//           }
//           else {
//             setTaumyState('../assets/emotionSad.gif');
//             setStudyMsg("Taumy is sad you haven't studied yet today. Log a study session to cheer Taumy up!");
//           }
//         } catch (err) {
//           localStorage.removeItem('jwt_token');
//           alert('error');
//           console.log(err);
//           navigate('/');
//         }
//       }
//       fetchData();
//     }
//     else {
//       navigate('/');
//     }
//   }, [navigate]);

//   if (!user || !taumyState || !studyMsg) {
//     return <div>Fetching data</div>
//   }

//   return (
//     <div>Stats</div>
//   )
// }
