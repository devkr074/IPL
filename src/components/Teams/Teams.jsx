import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teams from '../../data/teams.json';
import players from '../../data/players.json';
import venues from '../../data/venues.json';
import schedule from '../../data/schedule.json';
import styles from './Teams.module.css'
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
  function handleTeamChange(id) {
    setSelectedTeam(id);
  }
  return (
    <>
      <div className={styles.container} >
        {teams.map(team => (
          <label key={team.id} className={`${styles.card} ${selectedTeam === team.id ? styles.active : ''}`}>
            <input type="radio" name="teams" value={team.id} checked={selectedTeam === team.id} onChange={() => handleTeamChange(team.id)} className={styles.hiddenRadio} />
            <img src={team.logo} className={styles.image} alt={team.name} />
          </label>
        ))}
        <br />
        <button className={styles.button} onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
export default Teams;