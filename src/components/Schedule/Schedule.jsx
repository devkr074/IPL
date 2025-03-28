import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Schedule.module.css'
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
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <div className={`${styles.tab} ${activeTab === 'your-matches' ? styles.active : ''}`} onClick={() => setActiveTab('your-matches')}>Your Matches</div>
          <div className={`${styles.tab} ${activeTab === 'all-matches' ? styles.active : ''}`} onClick={() => setActiveTab('all-matches')}>All Matches</div>
        </div>
        <div className={styles.scheduleContainer}>
          {activeTab === 'your-matches' && (
            schedule
              .filter(match => isUserMatch(match))
              .map((match) => {
                const team1 = teams[match.team1 - 1].logo;
                const team2 = teams[match.team2 - 1].logo;
                const venue = venues[match.team1 - 1].city;
                return (
                  <div className={styles.card} key={match.id} onClick={() => handleMatchAction(match)}>
                    <p className={styles.venue} >Venue: {venue}</p>
                    <div className={styles.teamContainer}>
                      <img src={team1} alt="" height={80} />
                      <p className={styles.vs}>vs</p>
                      <img src={team2} alt="" height={80} />
                    </div>
                  </div>
                );
              })
          )}
          {activeTab === 'all-matches' && (schedule.map((match) => {
                const team1 = teams[match.team1 - 1].logo;
                const team2 = teams[match.team2 - 1].logo;
                const venue = venues[match.team1 - 1].city;
                return (
                  <div className={styles.card} key={match.id} onClick={() => handleMatchAction(match)}>
                    <p className={styles.venue} >Venue: {venue}</p>
                    <div className={styles.teamContainer}>
                      <img src={team1} alt="" height={80} />
                      <p className={styles.vs}>vs</p>
                      <img src={team2} alt="" height={80} />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}
export default Schedule;