import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Schedule.module.css"
function Schedule() {
  const [tab, setTab] = useState("yourMatch");
  const [schedule, setSchedule] = useState([]);
  const [team, setTeam] = useState([]);
  const [userTeamId, setUserTeamId] = useState(null);
  const [venue, setVenue] = useState([]);
  useEffect(() => {
    document.title = "IPL - Schedule";
    const schedule = JSON.parse(localStorage.getItem("schedule"));
    const team = JSON.parse(localStorage.getItem("team"));
    const userTeamId = Number(localStorage.getItem("userTeamId"));
    const venue = JSON.parse(localStorage.getItem("venue"));
    setSchedule(schedule);
    setTeam(team);
    setUserTeamId(userTeamId);
    setVenue(venue);
  }, []);
  const navigate = useNavigate();
  function isUserMatch(match) {
    return match.teamAId === userTeamId || match.teamBId === userTeamId;
  }
  return (
    <div className={style.container}>
      <div className={style.section}>
        <div className={`${style.tabButton} ${tab === "yourMatch" ? style.active : ""}`} onClick={() => setTab("yourMatch")}>Your Match</div>
        <div className={`${style.tabButton} ${tab === "allMatch" ? style.active : ""}`} onClick={() => setTab("allMatch")}>All Match</div>
      </div>
      <div className={style.section}>
        {tab === "yourMatch" && (schedule.filter((match) => isUserMatch(match)).map((match) => {
          const teamA = team[match.teamAId - 1];
          const teamB = team[match.teamBId - 1];
          const venueCity = venue[match.venueId - 1].venueCity;
          return (
            <div key={match.matchId} className={style.card}>
              <p className={style.cardTitle}>Venue: {venueCity}</p>
              <div className={style.cardBody}>
                <img src={teamA.logo} alt={teamA.teamName} height={80} />
                <h2>vs</h2>
                <img src={teamB.logo} alt={teamB.teamName} height={80} />
              </div>
            </div>
          );
        })
        )}
        {tab === "allMatch" &&
          schedule.map((match) => {
            const teamA = team[match.teamAId - 1];
            const teamB = team[match.teamBId - 1];
            const venueCity = venue[match.venueId - 1].venueCity;
            return (
              <div className={style.card} key={match.matchId}>
                <p className={style.cardTitle}>Venue: {venueCity}</p>
                <div className={style.cardBody}>
                  <img src={teamA.logo} alt={teamA.teamName} height={80} />
                  <h2>vs</h2>
                  <img src={teamB.logo} alt={teamB.teamName} height={80} />
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