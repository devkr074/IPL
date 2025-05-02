import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import teams from "../data/teams.json";
import fixture from "../data/fixture.json";
import pointsTable from "../data/pointsTable.json";
import squad from "../data/squad.json";
import venues from "../data/venues.json";
function Teams() {
  const [userTeamId, setUserTeamId] = useState(1);
  const [status, setStatus] = useState();
  useEffect(() => {
    document.title = "IPL - Teams";
    setStatus(localStorage.getItem("status"));
  }, []);
  const navigate = useNavigate();
  function handleTeamChange(e) {
    setUserTeamId(e.target.value);
  }
  function handleNext() {
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("status", true);
    localStorage.setItem("orangeCap", null);
    localStorage.setItem("purpleCap", null);
    localStorage.setItem("nextMatch", null);
    localStorage.setItem("winnerTeamId", null);
    localStorage.setItem("runnerUpTeamId", null);
    localStorage.setItem("tableTopper", null);
    localStorage.setItem("userTeamId", userTeamId);
    localStorage.setItem("fixture", JSON.stringify(fixture));
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    localStorage.setItem("battingStatistics", null);
    localStorage.setItem("bowlingStatistics", null);
    localStorage.setItem("squad", JSON.stringify(squad));
    localStorage.setItem("venues", JSON.stringify(venues));
    navigate("/main-menu");
  }
  return (
    <>
      <div className="row border-bottom border-2 sticky-top">
        <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Teams</p>
      </div>
      {(!status) ?
        <div className="row">
          {teams.map((t) => (
            <div key={t.teamId} className="col-6 col-md-3 col-lg-3 p-2">
              <label title={t.name} className="card cp overflow-hidden">
                <input type="radio" name="teams" value={t.teamId} checked={(userTeamId == t.teamId)} className="d-none" onChange={handleTeamChange} />
                <img src={t.logo} alt={t.name} className={`p-3 ${(userTeamId == t.teamId) && "bg-green"}`} />
              </label>
            </div>))}
          <div className="col-12 col-md-3 col-lg-3 p-2">
            <button className="btn-green w-100 fs-7 fw-semibold py-2" onClick={handleNext}>Next</button>
          </div>
        </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-green my-2">Team Selected! Tournament started.</div>}
    </>
  );
}
export default Teams;