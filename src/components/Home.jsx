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
        <>
            <div className="titleContainer">
                <p className="title">IPL - Indian Premier League</p>
            </div>
            <div className="cardContainer">
                <div className="card actionsContainer">
                    <div className="buttonGroup">
                        {status && (
                            <button className="button resumeButton" onClick={handleResumeTournament}>
                                Resume Tournament
                            </button>
                        )}
                        {status ? (
                            <button className="button restartButton" onClick={handleRestartTournament}>
                                Restart Tournament
                            </button>
                        ) : (
                            <button className="button startButton" onClick={handleStartTournament}>
                                Start Tournament
                            </button>
                        )}
                    </div>
                </div>
                <div className="orange-cap-container">
                    <div className="section-title-container">
                        <p className="section-title">Orange Cap</p>
                    </div>
                    <div className="player-info">
                        {orangeCap ? (
                            <>
                                <img
                                    className="player-profile"
                                    src={squad[orangeCap.playerId - 1].profile}
                                    alt={squad[orangeCap.playerId - 1].name}
                                    title={squad[orangeCap.playerId - 1].name}
                                />
                                <p className="player-name">{squad[orangeCap.playerId - 1].name}</p>
                                <p className="player-runs">
                                    {orangeCap.runs} {orangeCap.runs > 1 ? "Runs" : "Run"}
                                </p>
                            </>
                        ) : (
                            <p className="no-data">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
                <div className="purple-cap-container">
                    <div className="section-title-container">
                        <p className="section-title">Purple Cap</p>
                    </div>
                    <div className="player-info">
                        {purpleCap ? (
                            <>
                                <img
                                    className="player-profile"
                                    src={squad[purpleCap.playerId - 1].profile}
                                    alt={squad[purpleCap.playerId - 1].name}
                                    title={squad[purpleCap.playerId - 1].name}
                                />
                                <p className="player-name">{squad[purpleCap.playerId - 1].name}</p>
                                <p className="player-wickets">
                                    {purpleCap.wickets} {purpleCap.wickets > 1 ? "Wickets" : "Wicket"}
                                </p>
                            </>
                        ) : (
                            <p className="no-data">No Data Available Currently!</p>
                        )}
                    </div>
                </div>
                <div className="next-match-container">
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
                                <div className="team-logos">
                                    <img
                                        className="team-logo"
                                        src={teams[nextMatch.homeTeamId - 1].logo}
                                        alt={teams[nextMatch.homeTeamId - 1].name}
                                        title={teams[nextMatch.homeTeamId - 1].name}
                                    />
                                    <p className="vs">V/S</p>
                                    <img
                                        className="team-logo"
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
                <div className="table-topper-container">
                    <div className="section-title-container">
                        <p className="section-title">Table Topper</p>
                    </div>
                    <div className="table-topper-logos">
                        {tableTopper ? (
                            tableTopper.map((t) => (
                                <img
                                    key={t.teamId}
                                    className="team-logo topper-logo"
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
        </>
    );
}
export default Home;