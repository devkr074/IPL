import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Schedule() {
  const [activeTab, setActiveTab] = useState('all');
  const [schedule, setSchedule] = useState([]);
  const [venues, setVenues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  useEffect(() => {
    document.title = "IPL - Schedule";
    const data = JSON.parse(localStorage.getItem('data'));
    setSchedule(data.schedule);
    setVenues(data.venues);
    setTeams(data.teams);
    setSelectedTeam(data.selectedTeam);
  }, []);
  const navigate = useNavigate();
  function handleMatchAction(match) {
    if (selectedTeam && (match.team1 === selectedTeam || match.team2 === selectedTeam)) {
      navigate(`/toss/${match.id}`);
    } else {
      navigate(`/match/${match.id}`);
    }
  };
  function isUserMatch(match) {
    return selectedTeam && (match.team1 === selectedTeam || match.team2 === selectedTeam);
  }
  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Tournament Schedule</h2>   
      <div className="tabs">
        <div className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Matches</div>
        <div className={`tab ${activeTab === 'playoffs' ? 'active' : ''}`} onClick={() => setActiveTab('playoffs')}>Playoff Matches</div>
        <div className={`tab ${activeTab === 'pointstable' ? 'active' : ''}`} onClick={() => setActiveTab('pointstable')}>Points Table</div>
      </div>
      <div className="tab-content">
        {activeTab === 'all' && (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Match No.</th>
                <th>Teams</th>
                <th>Venue</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((match, index) => (
                <tr 
                  key={match.id} 
                  className={isUserMatch(match) ? 'user-match' : ''} 
                  onClick={() => handleMatchAction(match)}
                >
                  <td>Match {index + 1}</td>
                  <td>{teams[match.team1 - 1].name} vs {teams[match.team2 - 1].name}</td>
                  <td>{venues[match.team1 - 1].name}</td>
                  <td>{match.status ? 'Completed' : 'Yet to Complete'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'playoffs' && (
          <div className="playoffs-message">
            Playoff matches will appear here after league stage completes
          </div>
        )}

        {activeTab === 'pointstable' && (
          <table className="points-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Tied</th>
                <th>NR</th>
                <th>Points</th>
                <th>NRR</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id}>
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.matches}</td>
                  <td>{team.won}</td>
                  <td>{team.lost}</td>
                  <td>{team.tied}</td>
                  <td>{team.nr}</td>
                  <td>{team.point}</td>
                  <td>{team.nrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Schedule;