import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fixture from "../data/fixture.json";
import pointsTable from "../data/pointsTable.json";
import squad from "../data/squad.json";
import teams from "../data/teams.json";
import venues from "../data/venues.json";
function Teams() {
  const [userTeamId, setUserTeamId] = useState(1);
  useEffect(() => {
    document.title = "IPL - Select Your Team";
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
      <div className="container">
        <div className="row py-2 bg-dark sticky-top d-flex flex-row px-3">
          <p className="col-9 fs-3 m-0 p-0 fw-bold text-light">IPL - Teams</p>
          <button className="col-3 btn btn-info fw-semibold" onClick={handleNext}>Next</button>
        </div>
        <div className="row">
          {teams.map((t) => (
            <label key={t.teamId} title={t.name} className={`card col-6 col-md-4 col-lg-3 ${(userTeamId == t.teamId) && "active"}`}>
              <input type="radio" name="teams" value={t.teamId} checked={userTeamId == t.teamId} onChange={handleTeamChange} />
              <img src={t.logo} alt={t.name} />
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
export default Teams;