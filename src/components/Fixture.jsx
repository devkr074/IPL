import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Fixture() {
    const [status, setStatus] = useState();
    const [teams, setTeams] = useState();
    const [fixture, setFixture] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        document.title = "IPL - Fixture";
        setStatus(localStorage.getItem("status"));
        setTeams(JSON.parse(localStorage.getItem("teams")));
        setFixture(JSON.parse(localStorage.getItem("fixture")));
        setVenues(JSON.parse(localStorage.getItem("venues")));
    }, []);
    const navigate = useNavigate();
    function handleMatch(match) {
        if (match.matchStatus == "Completed") {
            navigate(`/match/${match.matchId}`);
        }
        else {
            return;
        }
    }
    function handleMatchData(matchId, teamId) {
        const data = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if (data.inning1.teamId == teamId) {
            return ({
                runs: data.inning1.runs,
                wickets: data.inning1.wickets,
                balls: data.inning1.balls
            });
        }
        else {
            return ({
                runs: data.inning2.runs,
                wickets: data.inning2.wickets,
                balls: data.inning2.balls
            });
        }
    }
    return (
        <>
            <div className="row border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Fixture</p>
            </div>
            {(status) ?
                <div className="row">
                    {(fixture) && fixture.map((m) => (
                        <div key={m.matchId} className="col-md-6 col-lg-6 p-2 m-0" onClick={() => handleMatch(m)}>
                            <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">{(m.matchId == 71) ? "Qualifier 1" : (m.matchId == 72) ? "Eliminator" : (m.matchId == 73) ? "Qualifier 2" : (m.matchId == 74) ? "Final" : `Match ${m.matchId}`} • {venues[m.venueId - 1].city}</p>
                            <div className="row bg-body-tertiary py-1 rounded-bottom m-0">
                                <div className="col-12 d-flex align-items-center pb-1">
                                    <img src={(m.homeTeamId) ? teams[m.homeTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.homeTeamId) ? teams[m.homeTeamId - 1].name : "TBA"} className="img" />
                                    {(m.homeTeamId) ? ((m.matchStatus == "Completed") ? <p className="col-2 fw-semibold ps-1 m-0">{teams[m.homeTeamId - 1].shortName}</p> : <p className="col-12 fw-semibold ps-1 m-0">{teams[m.homeTeamId - 1].name}</p>) : <p className="col-2 fw-semibold ps-1 m-0">TBA</p>}
                                    {(m.matchStatus == "Completed") && <p className="col-10 d-flex align-items-center fw-semibold ps-5 m-0">{handleMatchData(m.matchId, m.homeTeamId).runs}{(handleMatchData(m.matchId, m.homeTeamId).wickets != 10) && `-${handleMatchData(m.matchId, m.homeTeamId).wickets}`} ({Math.floor(handleMatchData(m.matchId, m.homeTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.homeTeamId).balls % 6)})</p>}
                                </div>
                                <div className="col-12 d-flex align-items-center pb-1">
                                    <img src={(m.awayTeamId) ? teams[m.awayTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.awayTeamId) ? teams[m.awayTeamId - 1].name : "TBA"} className="img" />
                                    {(m.awayTeamId) ? ((m.matchStatus == "Completed") ? <p className="col-2 fw-semibold ps-1 m-0">{teams[m.awayTeamId - 1].shortName}</p> : <p className="col-12 fw-semibold ps-1 m-0">{teams[m.awayTeamId - 1].name}</p>) : <p className="col-2 fw-semibold ps-1 m-0">TBA</p>}
                                    {(m.matchStatus == "Completed") && <p className="col-10 d-flex align-items-center fw-semibold ps-5 m-0">{handleMatchData(m.matchId, m.awayTeamId).runs}{(handleMatchData(m.matchId, m.awayTeamId).wickets != 10) && `-${handleMatchData(m.matchId, m.awayTeamId).wickets}`} ({Math.floor(handleMatchData(m.matchId, m.awayTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.awayTeamId).balls % 6)})</p>}
                                </div>
                                <p className="col-12 fs-8 fw-semibold text-secondary text-truncate py-1 m-0">{(m.matchStatus == "Completed") ? <span className="text-info">{m.matchResult}</span> : ((m.tossStatus == "Completed") ? <span className="text-danger">{m.tossResult}</span> : "Upcoming")}</p>
                            </div>
                        </div>))}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default Fixture;