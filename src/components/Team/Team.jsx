import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Team.module.css";
import team from "../../data/team.json";
import schedule from "../../data/schedule.json";
import playOff from "../../data/playOff.json";
import player from "../../data/player.json";
import venue from "../../data/venue.json";
import pointsTable from "../../data/pointsTable.json";
function Team() {
  const [userTeamId, setUserTeamId] = useState(1);
  useEffect(() => {
    document.title = "IPL - Team";
  }, []);
  const navigate = useNavigate();
  function handleNext() {
    localStorage.setItem("gameStatus", true);
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("totalMatchPlayed", 0);
    localStorage.setItem("team", JSON.stringify(team));
    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("playOff", JSON.stringify(playOff));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("venue", JSON.stringify(venue));
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("statistic", JSON.stringify([]));
    navigate("/main-menu");
  }
  function handleTeamChange(e) {
    setUserTeamId(e.target.value);
  }
  return (
    <>
      <div className={style.container} >
        <div className={style.containerHeader}>
          <p>IPL - Team</p>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className={style.containerContent}>
          {team.map((teamData) => (
            <label key={teamData.teamId} title={teamData.teamName} className={`${style.card} ${(userTeamId == teamData.teamId) ? style.active : ""}`}>
              <input type="radio" name="team" value={teamData.teamId} checked={userTeamId == teamData.teamId} onChange={handleTeamChange} />
              <img src={teamData.logo} alt={teamData.teamName} />
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
export default Team;