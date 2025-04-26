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
            <div>
                <p>IPL - Indian Premier League</p>
            </div>
            <div>
                <div>
                    {status && <button onClick={handleResumeTournament}>Resume Tournament</button>}
                    {status ? <button onClick={handleRestartTournament}>Restart Tournament</button> : <button onClick={handleStartTournament}>Start Tournament</button>}
                </div>
                <div>
                    <p>Orange Cap</p>
                    {orangeCap ?
                        <>
                            <img src={squad[orangeCap.playerId - 1].profile} alt={squad[orangeCap.playerId - 1].name} title={squad[orangeCap.playerId - 1].name} />
                            <p>{squad[orangeCap.playerId - 1].name}</p>
                            <p>{orangeCap.runs} {orangeCap.runs > 1 ? "Runs" : "Run"}</p>
                        </> : <p>No Data Available Currently!</p>}
                </div>
                <div>
                    <p>Purple Cap</p>
                    {purpleCap ?
                        <>
                            <img src={squad[purpleCap.playerId - 1].profile} alt={squad[purpleCap.playerId - 1].name} title={squad[purpleCap.playerId - 1].name} />
                            <p>{squad[purpleCap.playerId - 1].name}</p>
                            <p>{purpleCap.wickets} {purpleCap.wickets > 1 ? "Wickets" : "Wicket"}</p>
                        </> : <p>No Data Available Currently!</p>}
                </div>
                <div>
                    <p>{winnerTeamId ? "Tournament Result" : "Next Match"}</p>
                    {nextMatch ?
                        <>
                            <p>{nextMatch.matchId == 71 ? "Qualifier 1" : nextMatch.matchId == 72 ? "Eliminator" : nextMatch.matchId == 73 ? "Qualifier 2" : nextMatch.matchId == 74 ? "Final" : "Match #" + nextMatch.matchId}</p>
                            <p>Venue: {venues[nextMatch.venueId - 1].city}</p>
                            <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                            <p>v/s</p>
                            <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                        </> : winnerTeamId ?
                            <>
                                <p>Winner: {teams[winnerTeamId - 1].shortName}</p>
                                <p>Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                            </> : <p>No Data Available Currently!</p>}
                </div>
                <div>
                    <p>Table Topper</p>
                    {tableTopper ?
                        tableTopper.map((t) => (<img key={t.teamId} src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} title={teams[t.teamId - 1].name} />))
                        : <p>No Data Available Currently!</p>}
                </div>
            </div>
        </>
    );
}
export default Home;