import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import team from '../../data/team.json';
import player from '../../data/player.json';
import venue from '../../data/venue.json';
import schedule from '../../data/schedule.json';
import pointsTable from '../../data/pointsTable.json';
import style from './Team.module.css'
function Team() {
  const [userTeamId, setUserTeamId] = useState(1);
  useEffect(() => {
    document.title = "IPL - Teams";
  }, []);
  const navigate = useNavigate();
  function handleTeamChange(teamId) {
    setUserTeamId(teamId);
  }
  function handleNext() {
    localStorage.setItem('team', JSON.stringify(team));
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('venue', JSON.stringify(venue));
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('pointsTable', JSON.stringify(pointsTable));
    localStorage.setItem('userTeamId', userTeamId);
    localStorage.setItem('gameStatus', true);
    localStorage.setItem('totalMatchPlayed', 0);
    navigate('/main-menu');
  }
  return (
    <>
      <div className={style.container} >
        {team.map(team => (
          <label key={team.teamId} className={`${style.card} ${userTeamId === team.teamId ? style.active : ''}`}>
            <input type="radio" name="team" value={team.teamId} checked={userTeamId === team.teamId} onChange={() => handleTeamChange(team.teamId)} className={style.hiddenRadio} />
            <img src={team.logo} className={style.image} alt={team.teamName} />
          </label>
        ))}
        <br />
        <button className={style.button} onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
export default Team;