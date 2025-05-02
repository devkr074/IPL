import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const [nextMatch, setNextMatch] = useState();
    const [orangeCap, setOrangeCap] = useState();
    const [purpleCap, setPurpleCap] = useState();
    const [runnerUpTeamId, setRunnerUpTeamId] = useState();
    const [squad, setSquad] = useState();
    const [status, setStatus] = useState();
    const [tableTopper, setTableTopper] = useState();
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    const [winnerTeamId, setWinnerTeamId] = useState();
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        const nextMatch = JSON.parse(localStorage.getItem("nextMatch"));
        const orangeCap = JSON.parse(localStorage.getItem("orangeCap"));
        const purpleCap = JSON.parse(localStorage.getItem("purpleCap"));
        const runnerUpTeamId = Number(localStorage.getItem("runnerUpTeamId"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const status = localStorage.getItem("status");
        const tableTopper = JSON.parse(localStorage.getItem("tableTopper"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        const winnerTeamId = Number(localStorage.getItem("winnerTeamId"));
        setNextMatch(nextMatch);
        setOrangeCap(orangeCap);
        setPurpleCap(purpleCap);
        setRunnerUpTeamId(runnerUpTeamId);
        setSquad(squad);
        setStatus(status);
        setTableTopper(tableTopper);
        setTeams(teams);
        setVenues(venues);
        setWinnerTeamId(winnerTeamId);
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
            <div className="row sticky-top shadow">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Indian Premier League</p>
            </div>
            <div className="row">
                <div className="col-12 p-2 d-flex flex-column">
                    {status && <button className="fs-5 fw-semibold text-light btn btn-transparent btn-green mb-2 p-3" onClick={handleResumeTournament}>Resume Tournament</button>}
                    {status ? <button className="fs-5 fw-semibold btn btn-danger p-3 shadow-none" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Restart Tournament</button> : <button className="fs-4 fw-semibold text-light p-4 btn btn-green" onClick={handleStartTournament}>Start Tournament</button>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">Orange Cap</p>
                    {orangeCap ?
                        <div className="col-12 p-2 d-flex bg-body-tertiary rounded-bottom">
                            <img className="col-4 p-1 rounded-circle border border-1 border-body-secondary" src={squad[orangeCap.playerId - 1].profile} alt={squad[orangeCap.playerId - 1].name} title={squad[orangeCap.playerId - 1].name} />
                            <div className="col-8 d-flex flex-column justify-content-center">
                                <p className="fs-5 fw-semibold text-truncate px-2 m-0">{squad[orangeCap.playerId - 1].name}</p>
                                <p className="px-2 m-0">{orangeCap.runs} {orangeCap.runs > 1 ? "Runs" : "Run"}</p>
                            </div>
                        </div> : <p className="bg-body-tertiary fw-semibold p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">Purple Cap</p>
                    {purpleCap ?
                        <div className="col-12 p-2 d-flex bg-body-tertiary rounded-bottom">
                            <img className="col-4 p-1 rounded-circle border border-1 border-body-secondary" src={squad[purpleCap.playerId - 1].profile} alt={squad[purpleCap.playerId - 1].name} title={squad[purpleCap.playerId - 1].name} />
                            <div className="col-8 d-flex flex-column justify-content-center">
                                <p className="fs-5 fw-semibold text-truncate px-2 m-0">{squad[purpleCap.playerId - 1].name}</p>
                                <p className="px-2 m-0">{purpleCap.wickets} {purpleCap.wickets > 1 ? "Wickets" : "Wicket"}</p>
                            </div>
                        </div> : <p className="bg-body-tertiary fw-semibold p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">{winnerTeamId ? "Tournament Result" : "Next Match"}</p>
                    {nextMatch ?
                        <>
                            <div className="col-12 p-2 d-flex justify-content-between bg-gray">
                                <p className="m-0">{nextMatch.matchId == 71 ? "Qualifier 1" : nextMatch.matchId == 72 ? "Eliminator" : nextMatch.matchId == 73 ? "Qualifier 2" : nextMatch.matchId == 74 ? "Final" : "Match #" + nextMatch.matchId}</p>
                                <p className="m-0">Venue: {venues[nextMatch.venueId - 1].city}</p>
                            </div>
                            <div className="col-12 p-2 d-flex bg-body-tertiary rounded-bottom align-items-center">
                                <img className="col-5" src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                                <p className="col-2 m-0 text-center fs-5 fw-semibold">v/s</p>
                                <img className="col-5" src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                            </div>
                        </> : winnerTeamId ?
                            <>
                                <div className="col-12 p-2 d-flex justify-content-between bg-gray">
                                    <p className="m-0">Winner: {teams[winnerTeamId - 1].shortName}</p>
                                    <p className="m-0">Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                </div>
                                <div className="col-12 p-2 d-flex bg-body-tertiary justify-content-between align-items-center">
                                    <img className="col-4" src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                    <img className="col-4" src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                                </div>
                            </> : <p className="bg-body-tertiary fw-semibold p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                    <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">Table Topper</p>
                    {tableTopper ?
                        <div className="col-12 p-2 d-flex bg-body-tertiary rounded-bottom align-items-center">
                            {tableTopper.map((t) => (<img className="col-3" key={t.teamId} src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} title={teams[t.teamId - 1].name} />))}
                        </div> : <p className="bg-body-tertiary fw-semibold p-2 rounded-bottom">No Data Available Currently!</p>}
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Restart Tournament</h1>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Your Saved Data will be removed</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger shadow-none" data-bs-dismiss="modal" onClick={handleRestart}>Restart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;