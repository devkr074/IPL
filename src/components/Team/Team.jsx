import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import playOff from "../../data/playOff.json";
import player from "../../data/player.json";
import pointsTable from "../../data/pointsTable.json";
import schedule from "../../data/schedule.json";
import team from "../../data/team.json";
import venue from "../../data/venue.json";
import style from "./Team.module.css"
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
    localStorage.setItem("gameStatus", true);
    localStorage.setItem("playOff", JSON.stringify(playOff));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("team", JSON.stringify(team));
    localStorage.setItem("totalMatchPlayed", 0);
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("venue", JSON.stringify(venue));
    navigate("/main-menu");
  }
  return (
    <>
      <div className={style.container} >
        <div className={style.section}>
          {team.map(team => (
            <label key={team.teamId} className={`${style.card} ${userTeamId === team.teamId ? style.active : ""}`} title={team.teamName}>
              <input type="radio" name="team" value={team.teamId} checked={userTeamId === team.teamId} className={style.hideRadioMark} onChange={() => handleTeamChange(team.teamId)} />
              <img src={team.logo} alt={team.teamName} className={style.logo} />
            </label>
          ))}
        </div>
        <div className={style.section}>
          <button className={style.button} onClick={handleNext}>NEXT</button>
        </div>
      </div>
    </>
  );
}
export default Team;