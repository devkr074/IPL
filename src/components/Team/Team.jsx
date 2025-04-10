import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Team.module.css"
import playOff from "../../data/playOff.json";
import player from "../../data/player.json";
import pointsTable from "../../data/pointsTable.json";
import schedule from "../../data/schedule.json";
import team from "../../data/team.json";
import venue from "../../data/venue.json";
function Team() {
  const [userTeamId, setUserTeamId] = useState(1);
  useEffect(() => {
    document.title = "IPL - Team";
  }, []);
  const navigate = useNavigate();
  function handleNext() {
    localStorage.setItem("gameStatus", true);
    localStorage.setItem("playOff", JSON.stringify(playOff));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("team", JSON.stringify(team));
    localStorage.setItem("totalMatchPlayed", 0);
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("venue", JSON.stringify(venue));
    localStorage.setItem("statistic", JSON.stringify([]));
    navigate("/main-menu");
  }
  return (
    <>
      <div className={style.container} >
        <div className={style.containerHeader}>
          <p>IPL - Team</p>
          <button className={style.button} onClick={handleNext}>Next</button>
        </div>
        <div className={style.containerContent}>
          {team.map((team) => (
            <label key={team.teamId} className={`${style.card} ${userTeamId === team.teamId ? style.active : ""}`} title={team.teamName}>
              <input type="radio" name="team" value={team.teamId} checked={userTeamId === team.teamId} className={style.hideRadioMark} onChange={() => setUserTeamId(team.teamId)} />
              <img src={team.logo} alt={team.teamName} className={style.logo} />
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
export default Team;