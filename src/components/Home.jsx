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
    function handleRestartTournament() {
        if (window.confirm("Really want to Restart IPL Tournament?")) {
            localStorage.clear();
            navigate("/teams");
        } else {
            return;
        }
    }
    function handleStartTournament() {
        navigate("/teams");
    }
    return (
        <div className="container">
            <div className="row py-2 bg-dark sticky-top">
                <p className="col-sm-12 col-md-12 col-lg-12 fs-3 m-0 text-center fw-bold text-light">IPL - Indian Premier League</p>
            </div>
            <div className="row py-2">
                <div className="col-sm-12 d-flex flex-column justify-content-center col-md-6 col-lg-4 mb-3">
                    <div className="card border-0">
                        {status && (
                            <button className="btn btn-dark fs-5 fw-semibold py-3" onClick={handleResumeTournament}>
                                Resume Tournament
                            </button>
                        )}
                        {status ? (
                            <button className="btn btn-danger fs-5 fw-semibold mt-2 py-3" onClick={handleRestartTournament}>
                                Restart Tournament
                            </button>
                        ) : (
                            <button className="btn btn-dark fs-5 fw-semibold py-3" onClick={handleStartTournament}>
                                Start Tournament
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <div className="card overflow-hidden">
                        <p className="col-sm-12 col-md-12 col-lg-12 bg-dark text-light m-0 py-2 text-center fs-6 fw-semibold">Orange Cap</p>
                        <div className="d-flex">
                            {orangeCap ? (
                                <>
                                    <img className="p-1 m-2 col-4 rounded-circle border border-1 border-secondary" src={squad[orangeCap.playerId - 1].profile}
                                        alt={squad[orangeCap.playerId - 1].name}
                                        title={squad[orangeCap.playerId - 1].name}
                                    />
                                    <div className="w-100 pe-2 d-flex flex-column justify-content-center">
                                        <p className="m-0 fw-semibold text-truncate">{squad[orangeCap.playerId - 1].name}</p>
                                        <p className="m-0">
                                            {orangeCap.runs} {orangeCap.runs > 1 ? "Runs" : "Run"}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className="p-2 m-0">No Data Available Currently!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <div className="card overflow-hidden">
                        <p className="col-sm-12 col-md-12 col-lg-12 bg-dark text-light m-0 py-2 text-center fs-6 fw-semibold">Purple Cap</p>
                        <div className="d-flex">
                            {purpleCap ? (
                                <>
                                    <img
                                        className="p-1 m-2 col-4 rounded-circle border border-1 border-secondary"
                                        src={squad[purpleCap.playerId - 1].profile}
                                        alt={squad[purpleCap.playerId - 1].name}
                                        title={squad[purpleCap.playerId - 1].name}
                                    />
                                    <div className="w-100 pe-2 d-flex flex-column justify-content-center">
                                        <p className="m-0 fw-semibold text-truncate" >{squad[purpleCap.playerId - 1].name}</p>
                                        <p className="m-0">
                                            {purpleCap.wickets} {purpleCap.wickets > 1 ? "Wickets" : "Wicket"}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className="p-2 m-0">No Data Available Currently!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <div className="card overflow-hidden">
                        <p className="col-sm-12 col-md-12 col-lg-12 bg-dark text-light m-0 py-2 text-center fs-6 fw-semibold">{nextMatch ? "Next Match" : "Tournament Result"}</p>
                        <div className="d-flex flex-column">
                            {nextMatch ? (
                                <>
                                    <div className="d-flex justify-content-between p-1">
                                        <p className="m-0">
                                            {nextMatch.matchId === 71
                                                ? "Qualifier 1"
                                                : nextMatch.matchId === 72
                                                    ? "Eliminator"
                                                    : nextMatch.matchId === 73
                                                        ? "Qualifier 2"
                                                        : nextMatch.matchId === 74
                                                            ? "Final"
                                                            : "Match #" + nextMatch.matchId}
                                        </p>
                                        <p className="match-venue m-0">
                                            Venue: {venues[nextMatch.venueId - 1].city}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-around p-2">
                                        <img
                                            className="col-4  rounded-circle border border-1 p-2 border-secondary"
                                            src={teams[nextMatch.homeTeamId - 1].logo}
                                            alt={teams[nextMatch.homeTeamId - 1].name}
                                            title={teams[nextMatch.homeTeamId - 1].name}
                                        />
                                        <p className="col-2 text-center fw-semibold">v/s</p>
                                        <img
                                            className="col-4 rounded-circle border border-1 p-2 border-secondary"
                                            src={teams[nextMatch.awayTeamId - 1].logo}
                                            alt={teams[nextMatch.awayTeamId - 1].name}
                                            title={teams[nextMatch.awayTeamId - 1].name}
                                        />
                                    </div>
                                </>
                            ) : winnerTeamId ? (
                                <>
                                    <div className="result-info">
                                        <p className="winner">
                                            Winner: {teams[winnerTeamId - 1].shortName}
                                        </p>
                                        <p className="runner-up">
                                            Runner Up: {teams[runnerUpTeamId - 1].shortName}
                                        </p>
                                    </div>
                                    <div className="team-logos">
                                        <img
                                            className="team-logo winner-logo"
                                            src={teams[winnerTeamId - 1].logo}
                                            alt={teams[winnerTeamId - 1].name}
                                            title={teams[winnerTeamId - 1].name}
                                        />
                                        <img
                                            className="team-logo runner-up-logo"
                                            src={teams[runnerUpTeamId - 1].logo}
                                            alt={teams[runnerUpTeamId - 1].name}
                                            title={teams[runnerUpTeamId - 1].name}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p className="p-2 m-0">No Data Available Currently!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-8 mb-3">
                    <div className="card overflow-hidden">
                        <p className="col-sm-12 col-md-12 col-lg-12 bg-dark text-light m-0 py-2 text-center fs-6 fw-semibold">Table Topper</p>
                        <div className="d-flex py-2">
                            {tableTopper ? (
                                tableTopper.map((t) => (
                                    <img
                                        key={t.teamId}
                                        className="col-2 rounded-circle border border-1 border-secondary m-2"
                                        src={teams[t.teamId - 1].logo}
                                        alt={teams[t.teamId - 1].name}
                                        title={teams[t.teamId - 1].name}
                                    />
                                ))
                            ) : (
                                <p className="px-2 m-0">No Data Available Currently!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;