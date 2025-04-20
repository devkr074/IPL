import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Teams from "./components/Teams/Teams.jsx";
import MainMenu from "./components/MainMenu/MainMenu.jsx"
import Fixture from "./components/Fixture/Fixture.jsx"
import Squad from "./components/Squad/Squad.jsx";
import Venues from "./components/Venues/Venues.jsx"
import PointsTable from "./components/PointsTable/PointsTable.jsx";
import BattingStatistics from "./components/BattingStatistics/BattingStatistics.jsx";
import BowlingStatistics from "./components/BowlingStatistics/BowlingStatistics.jsx";
import Match from "./components/Match/Match.jsx";
import Toss from "./components/Toss/Toss.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/fixture" element={<Fixture />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/points-table" element={<PointsTable />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/batting-statistics" element={<BattingStatistics />} />
        <Route path="/bowling-statistics" element={<BowlingStatistics />} />
        <Route path="/match/:matchId" element={<Match />} />
        <Route path="/toss/:matchId" element={<Toss />} />
      </Routes>
    </Router>
  );
}
export default App;