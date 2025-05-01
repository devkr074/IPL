import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fixture from "../data/fixture.json";
import pointsTable from "../data/pointsTable.json";
import squad from "../data/squad.json";
import teams from "../data/teams.json";
import venues from "../data/venues.json";
function Teams() {
  const [userTeamId, setUserTeamId] = useState(1);
  const [gameStatus, setGameStatus] = useState();
  useEffect(() => {
    document.title = "IPL - Teams";
    setGameStatus(localStorage.getItem("status"));
  }, []);
  const navigate = useNavigate();
  function handleNext() {
    localStorage.setItem("battingStatistics", null);
    localStorage.setItem("bowlingStatistics", null);
    localStorage.setItem("fixture", JSON.stringify(fixture));
    localStorage.setItem("nextMatch", null);
    localStorage.setItem("orangeCap", null);
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("purpleCap", null);
    localStorage.setItem("runnerUpTeamId", null);
    localStorage.setItem("squad", JSON.stringify(squad));
    localStorage.setItem("status", true);
    localStorage.setItem("tableTopper", null);
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("venues", JSON.stringify(venues));
    localStorage.setItem("winnerTeamId", null);
    navigate("/main-menu");
  }
  function handleTeamChange(e) {
    setUserTeamId(e.target.value);
  }
  return (
    <>
      <div className="row sticky-top shadow">
        <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Teams</p>
        {!gameStatus && <button onClick={handleNext}>Next</button>}
      </div>
      {!gameStatus ?
        <div className="row">
          {teams.map((t) => (
            <label key={t.teamId} title={t.name} className="col-sm-2 col-md-2 col-lg-2 rounded-2 p-2 border border-2">
              <input type="radio" name="teams" value={t.teamId} checked={userTeamId == t.teamId} className="d-none" onChange={handleTeamChange} />
              <img className="img-fluid" src={t.logo} alt={t.name} />
            </label>))}
        </div> : <p>Tournament already in Progress you can't select team</p>}
    </>
  );
}
export default Teams;