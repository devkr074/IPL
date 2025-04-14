import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Fixture.module.css';
import { Navigate } from 'react-router-dom';
function schedule() {
  const [fixture, setFixture] = useState(null);
  const [team, setTeam] = useState([]);
  const [venue, setVenue] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    const fixture = JSON.parse(localStorage.getItem('fixture'));
    const team = JSON.parse(localStorage.getItem('team'));
    const venue = JSON.parse(localStorage.getItem('venue'));
    let matchData = [];
    fixture.forEach((match) => {
      if (match.matchStatusId == 2) {
        match = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
        matchData.push(match);
      }
    });
    setMatchData(matchData);
    setFixture(fixture);
    setTeam(team);
    setVenue(venue);
    console.log(schedule);
    console.log(matchData);
  }, []);
  function handleMatchClick(matchId) {
    if (fixture[matchId - 1].matchStatusId == 2) {
      Navigate(`/match/${matchId}`);
    }
  }
  return (
    <div className={style.container}>
      {fixture.map((match) => (
        <div key={match.matchId} className={style.card} onClick={() => handleMatchClick(match.matchId)}>
          <p>Match #{match.matchId} • {venue[match.venueId - 1]?.venueCity}</p>
          <p>{(match.matchStatusId == 2) ? team[match.homeTeamId - 1]?.teamShortName : team[match.homeTeamId - 1]?.teamName}
            {(match.matchStatusId == 2) ? (matchData[match.matchId - 1]?.inning1.teamId == match.homeTeamId) ? matchData[match.matchId - 1]?.inning1.runs + "/" + matchData[match.matchId - 1]?.inning1.wickets + "(" + Math.floor(matchData[match.matchId - 1]?.inning1.balls / 6) + "." + (matchData[match.matchId - 1]?.inning1.balls % 6) + ")" : matchData[match.matchId - 1]?.inning2.runs + "/" + matchData[match.matchId - 1]?.inning2.wickets + "(" + Math.floor(matchData[match.matchId - 1]?.inning2.balls / 6) + "." + (matchData[match.matchId - 1]?.inning2.balls % 6) + ")" : ""}
          </p>
          <p>{(match.matchStatusId == 2) ? team[match.awayTeamId - 1]?.teamShortName : team[match.awayTeamId - 1]?.teamName}
            {(match.matchStatusId == 2) ? (matchData[match.matchId - 1]?.inning1.teamId == match.awayTeamId) ? matchData[match.matchId - 1]?.inning1.runs + "/" + matchData[match.matchId - 1]?.inning1.wickets + "(" + Math.floor(matchData[match.matchId - 1]?.inning1.balls / 6) + "." + (matchData[match.matchId - 1]?.inning1.balls % 6) + ")" : matchData[match.matchId - 1]?.inning2.runs + "/" + matchData[match.matchId - 1]?.inning2.wickets + "(" + Math.floor(matchData[match.matchId - 1]?.inning2.balls / 6) + "." + (matchData[match.matchId - 1]?.inning2.balls % 6) + ")" : ""}
          </p>
          <p>{(match.matchStatusId == 2) ? match.matchResult : "Upcoming"}</p>
        </div>
      ))}
    </div>
  );
}
export default schedule;