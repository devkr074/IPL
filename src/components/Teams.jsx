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
      </div>
      {!gameStatus ?
        <div className="row position-relative">
          {teams.map((t) => (
            <div className="col-6 col-lg-3 col-md-3 p-2">
              <label key={t.teamId} title={t.name} className="card overflow-hidden">
                <input type="radio" name="teams" value={t.teamId} checked={userTeamId == t.teamId} className="d-none" onChange={handleTeamChange} />
                <img className={`p-3 ${userTeamId == t.teamId ? 'bg-green' : ''}`} src={t.logo} alt={t.name} />
              </label>
            </div>))}
          <div className="col-lg-3 p-2 col-12 col-md-3">
            {!gameStatus && <button className="btn btn-green w-100" onClick={handleNext}>Next</button>}
          </div>
        </div> : <p>Tournament already in Progress you can't select team</p>}
    </>
  );
}
export default Teams;