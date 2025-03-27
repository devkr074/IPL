import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Schedule() {
  const [activeTab, setActiveTab] = useState('your-matches');
  const [schedule, setSchedule] = useState([]);
  const [venues, setVenues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState(null);
  useEffect(() => {
    document.title = "IPL - Schedule";
    const data = JSON.parse(localStorage.getItem('data'));
    setSchedule(data.schedule);
    setVenues(data.venues);
    setTeams(data.teams);
    setUserTeam(data.userTeam);
  }, []);
  const navigate = useNavigate();
  function handleMatchAction(match) {
    if (match.status === "next") {
      navigate(`/toss/${teams[match.team1 - 1].short}vs${teams[match.team2 - 1].short}`);
    }
    else if (match.status === "toss-completed") {
      navigate(`/match/${match.id}`);
    }
  };
  function isUserMatch(match) {
    return userTeam && (match.team1 === userTeam || match.team2 === userTeam);
  }
  return (
    <>
      <div className="tabs">
        <div className={`tab ${activeTab === 'your-matches' ? 'active' : ''}`} onClick={() => setActiveTab('your-matches')}>Your Matches</div>
        <div className={`tab ${activeTab === 'all-matches' ? 'active' : ''}`} onClick={() => setActiveTab('all-matches')}>All Matches</div>
      </div>
      <div className="tab-content">
        {activeTab === 'your-matches' && (
          <div className="matches-grid">
            {schedule.map((match) => {
              if (isUserMatch(match)) {
                const team1 = teams[match.team1 - 1].name;
                const team2 = teams[match.team2 - 1].name;
                const venue = venues[match.team1 - 1].name;
                return (
                  <div key={match.id} onClick={() => handleMatchAction(match)} style={{ border: '2px solid' }}>
                    <h3>{venue}</h3>
                    <div className="teams-container">
                      <div className="team-name">{team1}</div>
                      <div className="vs">vs</div>
                      <div className="team-name">{team2}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
        {activeTab === 'all-matches' && (
          <div className="matches-grid">
            {schedule.map((match) => {
              const team1 = teams[match.team1 - 1].name;
              const team2 = teams[match.team2 - 1].name;
              const venue = venues[match.team1 - 1].name;
              return (
                <div key={match.id} className={`match-card ${isUserMatch(match) ? 'user-match' : ''}`} style={{ border: '2px solid' }}>
                  <div className="teams-container">
                    <h3>{venue}</h3>
                    <div className="team-name">{team1}</div>
                    <div className="vs">vs</div>
                    <div className="team-name">{team2}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default Schedule;