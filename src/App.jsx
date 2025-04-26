import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Teams from "./components/Teams.jsx";
import MainMenu from "./components/MainMenu.jsx"
import Toss from "./components/Toss.jsx";
import Match from "./components/Match.jsx";
import Fixture from "./components/Fixture.jsx"
import Squad from "./components/Squad.jsx";
import Venues from "./components/Venues.jsx"
import PointsTable from "./components/PointsTable.jsx";
import BattingStatistics from "./components/BattingStatistics.jsx";
import BowlingStatistics from "./components/BowlingStatistics.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/toss/:matchId" element={<Toss />} />
        <Route path="/match/:matchId" element={<Match />} />
        <Route path="/fixture" element={<Fixture />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/points-table" element={<PointsTable />} />
        <Route path="/batting-statistics" element={<BattingStatistics />} />
        <Route path="/bowling-statistics" element={<BowlingStatistics />} />
      </Routes>
    </Router>
  );
}
export default App;