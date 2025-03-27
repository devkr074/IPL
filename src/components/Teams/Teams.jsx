import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teams from '../../data/teams.json';
import players from '../../data/players.json';
import venues from '../../data/venues.json';
import schedule from '../../data/schedule.json';
function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(1);
  useEffect(() => {
    document.title = "IPL - Teams";
  }, []);
  const navigate = useNavigate();
  function handleNext() {
    const data = { teams: teams, players: players, venues: venues, schedule: schedule, userTeam: selectedTeam };
    localStorage.setItem('data', JSON.stringify(data));
    navigate('/main-menu');
  }
  function handleTeamChange(e) {
    setSelectedTeam(parseInt(e.target.value));
  }
  return (
    <>
      {teams.map(team => (
        <label key={team.id}>
          <input type="radio" value={team.id} checked={selectedTeam === team.id} onChange={handleTeamChange} />
          {team.name}
        </label>
      ))}
      <button onClick={handleNext}>Next</button>
    </>
  );
}
export default Teams;