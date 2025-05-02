import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const [status, setStatus] = useState();
    const [orangeCap, setOrangeCap] = useState();
    const [purpleCap, setPurpleCap] = useState();
    const [nextMatch, setNextMatch] = useState();
    const [winnerTeamId, setWinnerTeamId] = useState();
    const [runnerUpTeamId, setRunnerUpTeamId] = useState();
    const [tableTopper, setTableTopper] = useState();
    const [squad, setSquad] = useState();
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        setStatus(localStorage.getItem("status"));
        setOrangeCap(JSON.parse(localStorage.getItem("orangeCap")));
        setPurpleCap(JSON.parse(localStorage.getItem("purpleCap")));
        setNextMatch(JSON.parse(localStorage.getItem("nextMatch")));
        setWinnerTeamId(Number(localStorage.getItem("winnerTeamId")));
        setRunnerUpTeamId(Number(localStorage.getItem("runnerUpTeamId")));
        setTableTopper(JSON.parse(localStorage.getItem("tableTopper")));
        setSquad(JSON.parse(localStorage.getItem("squad")));
        setTeams(JSON.parse(localStorage.getItem("teams")));
        setVenues(JSON.parse(localStorage.getItem("venues")));
    }, []);
    const navigate = useNavigate();
    function handleResumeTournament() {
        navigate("/main-menu");
    }
    function handleStartTournament() {
        navigate("/teams");
    }
    function handleRestart() {
        localStorage.clear();
        navigate("/teams");
    }
    return (
        <>
            <div className="row border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Indian Premier League</p>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-column p-2">
                    {(status) && <button className="btn-green fs-5 fw-semibold p-3 mb-2" onClick={handleResumeTournament}>Resume Tournament</button>}
                    {(status) ? <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-danger fs-5 fw-semibold p-3 shadow-none" >Restart Tournament</button> : <button className="btn-green fs-4 fw-semibold p-4" onClick={handleStartTournament}>Start Tournament</button>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">Orange Cap</p>
                    {(orangeCap) ?
                        <div className="col-12 d-flex bg-body-tertiary p-2 rounded-bottom">
                            <img className="col-4 border border-1 border-body-secondary rounded-circle p-1" src={squad[orangeCap.playerId - 1].profile} alt={squad[orangeCap.playerId - 1].name} title={squad[orangeCap.playerId - 1].name} />
                            <div className="col-8 d-flex flex-column justify-content-center">
                                <p className="fs-7 fw-semibold text-truncate px-2 m-0">{squad[orangeCap.playerId - 1].name}</p>
                                <p className="px-2 m-0">{orangeCap.runs} {(orangeCap.runs > 1) ? "Runs" : "Run"}</p>
                            </div>
                        </div> : <p className="fw-semibold bg-body-tertiary p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">Purple Cap</p>
                    {(purpleCap) ?
                        <div className="col-12 d-flex bg-body-tertiary p-2 rounded-bottom">
                            <img className="col-4 border border-1 border-body-secondary rounded-circle p-1" src={squad[purpleCap.playerId - 1].profile} alt={squad[purpleCap.playerId - 1].name} title={squad[purpleCap.playerId - 1].name} />
                            <div className="col-8 d-flex flex-column justify-content-center">
                                <p className="fs-7 fw-semibold text-truncate px-2 m-0">{squad[purpleCap.playerId - 1].name}</p>
                                <p className="px-2 m-0">{purpleCap.wickets} {(purpleCap.wickets > 1) ? "Wickets" : "Wicket"}</p>
                            </div>
                        </div> : <p className="fw-semibold bg-body-tertiary p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">{(winnerTeamId) ? "Tournament Result" : "Next Match"}</p>
                    {(nextMatch) ?
                        <>
                            <div className="col-12 d-flex justify-content-between bg-gray p-2">
                                <p className="m-0">{(nextMatch.matchId == 71) ? "Qualifier 1" : (nextMatch.matchId == 72) ? "Eliminator" : (nextMatch.matchId == 73) ? "Qualifier 2" : (nextMatch.matchId == 74) ? "Final" : `Match #${nextMatch.matchId}`}</p>
                                <p className="m-0">Venue: {venues[nextMatch.venueId - 1].city}</p>
                            </div>
                            <div className="col-12 d-flex align-items-center bg-body-tertiary rounded-bottom p-2">
                                <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} className="col-5" />
                                <p className="col-2 fs-5 fw-semibold text-center m-0">v/s</p>
                                <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} className="col-5" />
                            </div>
                        </> : (winnerTeamId) ?
                            <>
                                <div className="col-12 d-flex justify-content-between bg-gray p-2">
                                    <p className="m-0">Winner: {teams[winnerTeamId - 1].shortName}</p>
                                    <p className="m-0">Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                </div>
                                <div className="col-12 d-flex align-items-center justify-content-between bg-body-tertiary p-2 rounded-bottom">
                                    <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} className="col-4" />
                                    <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} className="col-4" />
                                </div>
                            </> : <p className="fw-semibold bg-body-tertiary p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">Table Topper</p>
                    {tableTopper ?
                        <div className="col-12 d-flex align-items-center bg-body-tertiary p-2 rounded-bottom">
                            {tableTopper.map((t) => (<img key={t.teamId} src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} title={teams[t.teamId - 1].name} className="col-3" />))}
                        </div> : <p className="fw-semibold bg-body-tertiary p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
            </div>
            <div id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 id="exampleModalLabel" className="modal-title fs-5">Confirm Restart Tournament</h1>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn-close shadow-none"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to restart?</div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-secondary shadow-none">Close</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-danger shadow-none" onClick={handleRestart}>Restart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;