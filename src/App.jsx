import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Team from "./components/Team/Team.jsx";
import MainMenu from "./components/MainMenu/MainMenu.jsx"
import Venue from "./components/Venue/Venue.jsx"
import Schedule from "./components/Schedule/Schedule.jsx"
import Statistic from "./components/Statistic/Statistic.jsx"
import Squad from "./components/Squad/Squad.jsx";
import PointsTable from "./components/PointsTable/PointsTable.jsx";
import Toss from "./components/Toss/Toss.jsx";
import Match from "./components/Match/Match.jsx";
function App() {
  return (   
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/points-table" element={<PointsTable />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/toss/:matchId" element={<Toss />} />
        <Route path="/match/:matchId" element={<Match />} />
      </Routes>
    </Router>
  );
}
export default App;