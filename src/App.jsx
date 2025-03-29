import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Team from "./components/Team/Team.jsx";
import MainMenu from "./components/MainMenu/MainMenu.jsx"
import Schedule from "./components/Schedule/Schedule.jsx"
import Statistic from "./components/Statistic/Statistic.jsx"
import Squad from "./components/Squad/Squad.jsx";
import PointsTable from "./components/PointsTable/PointsTable.jsx";
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
      </Routes>
    </Router>
  );
}
export default App;