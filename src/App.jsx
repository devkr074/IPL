import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home.jsx';
import TeamSelection from './components/Teams/Teams.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-selection" element={<TeamSelection />} />
      </Routes>
    </Router>
  );
}
export default App;