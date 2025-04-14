import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Teams.module.css";
import fixture from "../../data/fixture.json";
import squad from "../../data/squad.json";
import venues from "../../data/venues.json";
import pointsTable from "../../data/pointsTable.json";
import teams from "../../data/teams.json";
function Teams() {
  const [userTeamId, setUserTeamId] = useState(1);
  useEffect(() => {
    document.title = "IPL - Teams";
  }, []);
  const navigate = useNavigate();
  function handleTeamChange(e) {
    setUserTeamId(e.target.value);
  }
  function handleNext() {
    localStorage.setItem("fixture", JSON.stringify(fixture));
    localStorage.setItem("squad", JSON.stringify(squad));
    localStorage.setItem("venues", JSON.stringify(venues));
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("gameStatus", true);
    localStorage.setItem("orangeCap", JSON.stringify([]));
    localStorage.setItem("purpleCap", JSON.stringify([]));
    localStorage.setItem("nextMatch", JSON.stringify([]));
    localStorage.setItem("winner", JSON.stringify([]));
    localStorage.setItem("tableTopper", JSON.stringify([]));
    localStorage.setItem("battingStatistics", JSON.stringify([]));
    localStorage.setItem("bowlingStatistics", JSON.stringify([]));
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("totalMatchesPlayed", 0);
    navigate("/main-menu");
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.containerHeader}>
          <p>IPL - Teams</p>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className={style.containerContent}>
          {teams.map((teamsData) => (
            <label key={teamsData.teamId} title={teamsData.teamName} className={`${style.card} ${(userTeamId == teamsData.teamId) ? style.active : ""}`}>
              <input type="radio" name="teams" value={teamsData.teamId} checked={userTeamId == teamsData.teamId} onChange={handleTeamChange} />
              <img src={teamsData.logo} alt={teamsData.teamName} />
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
export default Teams;