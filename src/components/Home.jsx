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
            <div className="row py-2 d-flex sticky-top align-items-center bg-dark">
                <p className="fs-4 m-0 text-center fw-bold text-light">IPL - Indian Premier League</p>
            </div>
            <div className="row p-2">
                <div className="card col-lg-4 col-sm-12 p-0">
                    {status && (
                        <button className="btn btn-dark w-100 h-100 py-4" onClick={handleResumeTournament}>
                            Resume Tournament
                        </button>
                    )}
                    {status ? (
                        <button className="btn btn-danger w-100 h-100 mt-2 py-4" onClick={handleRestartTournament}>
                            Restart Tournament
                        </button>
                    ) : (
                        <button className="py-5 btn btn-dark shadow h-100 w-100 fs-5 fw-semibold" onClick={handleStartTournament}>
                            Start Tournament
                        </button>
                    )}
                </div>
                <div className="card col-lg-4 col-sm-4 p-0 overflow-hidden">
                    <div>
                        <p className="section-title bg-dark text-light py-1 text-center fs-6 fw-semibold">Orange Cap</p>
                    </div>
                    <div className="row m-2">
                        {orangeCap ? (
                            <>
                                <img className="p-1 col-4 img-fluid rounded-circle border border-1 border-secondary" src={squad[orangeCap.playerId - 1].profile}
                                    alt={squad[orangeCap.playerId - 1].name}
                                    title={squad[orangeCap.playerId - 1].name}
                                />
                                <div className="col-8">
                                    <p className="player-name">{squad[orangeCap.playerId - 1].name}</p>
                                    <p className="player-runs">
                                        {orangeCap.runs} {orangeCap.runs > 1 ? "Runs" : "Run"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="ps-2 fs-6">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
                <div className="card col-lg-4 col-sm-12 p-0 overflow-hidden">
                    <div>
                        <p className="section-title bg-dark text-light py-1 text-center fs-6 fw-semibold">Purple Cap</p>
                    </div>
                    <div className="row m-2">
                        {purpleCap ? (
                            <>
                                <img
                                    className="p-1 col-4 img-fluid rounded-circle border border-1 border-secondary"
                                    src={squad[purpleCap.playerId - 1].profile}
                                    alt={squad[purpleCap.playerId - 1].name}
                                    title={squad[purpleCap.playerId - 1].name}
                                />
                                <div className="col-8">
                                    <p className="text-truncate" >{squad[purpleCap.playerId - 1].name}</p>
                                    <p>
                                        {purpleCap.wickets} {purpleCap.wickets > 1 ? "Wickets" : "Wicket"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="no-data">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="row px-2">
                <div className="card col-lg-4 col-sm-12">
                    <div className="section-title-container">
                        <p className="section-title">
                            {nextMatch ? "Next Match" : "Tournament Result"}
                        </p>
                    </div>
                    <div className="match-details">
                        {nextMatch ? (
                            <>
                                <div className="match-info">
                                    <p className="match-number">
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
                                    <p className="match-venue">
                                        Venue: {venues[nextMatch.venueId - 1].city}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="col-5 rounded-circle border border-2 p-1 border-dark"
                                        src={teams[nextMatch.homeTeamId - 1].logo}
                                        alt={teams[nextMatch.homeTeamId - 1].name}
                                        title={teams[nextMatch.homeTeamId - 1].name}
                                    />
                                    <p className="col-2 text-center">V/S</p>
                                    <img
                                        className="col-5 rounded-circle border border-2 p-1 border-dark"
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
                            <p className="no-data">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
                <div className="card col-lg-8 col-sm-12 p-0">
                    <div className="section-title-container">
                        <p className="section-title">Table Topper</p>
                    </div>
                    <div className="d-flex px-2">
                        {tableTopper ? (
                            tableTopper.map((t) => (
                                <img
                                    key={t.teamId}
                                    className="col-3"
                                    src={teams[t.teamId - 1].logo}
                                    alt={teams[t.teamId - 1].name}
                                    title={teams[t.teamId - 1].name}
                                />
                            ))
                        ) : (
                            <p className="no-data">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;