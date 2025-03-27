import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Teams from './components/Teams/Teams.jsx';
import MainMenu from './components/MainMenu/MainMenu.jsx'
import Schedule from './components/Schedule/Schedule.jsx'
import Squad from './components/Squad/Squad.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/squad" element={<Squad />} />
      </Routes>
    </Router>
  );
}
export default App;