import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import TeamSelection from './components/TeamSelection';
import Schedule from './components/Schedule';
import Toss from './components/Toss';
import Match from './components/Match';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-selection" element={<TeamSelection />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/toss/:matchId" element={<Toss/>} />
        <Route path="/match/:matchId" element={<Match/>} />
      </Routes>
    </Router>
  );
}
export default App;