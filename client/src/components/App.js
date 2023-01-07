import React from 'react';
import Login from './Login';
import Register from './Register';
import Verify from './Verify';
import Home from './Home';
import Study from './Study';
import Stats from './Stats';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify/:id/:token" element={<Verify />} />
        <Route path="home" element={<Home />} />
        <Route path="study" element={<Study />} />
        <Route path="stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;