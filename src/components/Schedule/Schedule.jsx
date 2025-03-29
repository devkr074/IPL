import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Schedule.module.css'

function Schedule() {
  const [activeTab, setActiveTab] = useState('your-matches');
  const [schedule, setSchedule] = useState([]);
  const [venue, setVenue] = useState([]);
  const [team, setTeam] = useState([]);
  const [userTeam, setUserTeam] = useState(null);
  
  useEffect(() => {
    document.title = "IPL - Schedule";
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    const venue = JSON.parse(localStorage.getItem('venue')) || [];
    const team = JSON.parse(localStorage.getItem('team')) || [];
    const userTeam = Number(localStorage.getItem('userTeamId'));
    setSchedule(schedule);
    setVenue(venue);
    setTeam(team);
    setUserTeam(userTeam);
  }, []);

  const navigate = useNavigate();

  function handleMatchAction(match) {
    if (!match) return;
    
    if (match.matchStatusId == null) {
      const teamA = team[match.teamAId - 1]?.teamShortName || 'TeamA';
      const teamB = team[match.teamBId - 1]?.teamShortName || 'TeamB';
      navigate(`/toss/${teamA}vs${teamB}`);
    }
    else if (match.matchStatusId === 1) {
      navigate(`/match/${match.matchId}`);
    }
  };

  function isUserMatch(match) {
    return userTeam && (match.teamAId === userTeam || match.teamBId === userTeam);
  }

  return (
    <div className={style.container}>
      <div className={style.tabContainer}>
        <div className={`${style.tab} ${activeTab === 'your-matches' ? style.active : ''}`} 
             onClick={() => setActiveTab('your-matches')}>Your Matches</div>
        <div className={`${style.tab} ${activeTab === 'all-matches' ? style.active : ''}`} 
             onClick={() => setActiveTab('all-matches')}>All Matches</div>
      </div>
      <div className={style.scheduleContainer}>
        {activeTab === 'your-matches' && (
          schedule
            .filter(match => isUserMatch(match))
            .map((match) => {
              const teamA = team[match.teamAId - 1]?.logo;
              const teamB = team[match.teamBId - 1]?.logo;
              const venueName = venue[match.venueId - 1]?.venueCity || 'Unknown Venue';
              
              return (
                <div className={style.card} key={match.matchId} onClick={() => handleMatchAction(match)}>
                  <p className={style.venue}>Venue: {venueName}</p>
                  <div className={style.teamContainer}>
                    <img src={teamA} alt="" height={80} />
                    <p className={style.vs}>vs</p>
                    <img src={teamB} alt="" height={80} />
                  </div>
                </div>
              );
            })
        )}
        {activeTab === 'all-matches' && 
          schedule.map((match) => {
            const teamA = team[match.teamAId - 1]?.logo;
            const teamB = team[match.teamBId - 1]?.logo;
            const venueName = venue[match.venueId - 1]?.venueCity || 'Unknown Venue';
            
            return (
              <div className={style.card} key={match.matchId} onClick={() => handleMatchAction(match)}>
                <p className={style.venue}>Venue: {venueName}</p>
                <div className={style.teamContainer}>
                  <img src={teamA} alt="" height={80} />
                  <p className={style.vs}>vs</p>
                  <img src={teamB} alt="" height={80} />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Schedule;