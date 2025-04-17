import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const [gameStatus, setGameStatus] = useState(false);
    const [orangeCap, setOrangeCap] = useState(null);
    const [purpleCap, setPurpleCap] = useState(null);
    const [nextMatch, setNextMatch] = useState(null);
    const [winner, setWinner] = useState(null);
    const [runnerUp, setRunnerUp] = useState(null);
    const [tableTopper, setTableTopper] = useState(null);
    const [teams, setTeams] = useState(null);
    const [venues, setVenues] = useState(null);
    const [squad, setSquad] = useState(null);
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        const gameStatus = localStorage.getItem("gameStatus");
        const orangeCap = JSON.parse(localStorage.getItem("orangeCapId"));
        const purpleCap = JSON.parse(localStorage.getItem("purpleCapId"));
        const nextMatch = JSON.parse(localStorage.getItem("nextMatchId"));
        const winner = Number(localStorage.getItem("winnerTeamId"));
        const runnerUp = Number(localStorage.getItem("runnerUpTeamId"));
        const tableTopper = JSON.parse(localStorage.getItem("tableTopper"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        setGameStatus(gameStatus);
        setOrangeCap(orangeCap);
        setPurpleCap(purpleCap);
        setNextMatch(nextMatch);
        setWinner(winner);
        setRunnerUp(runnerUp);
        setTableTopper(tableTopper);
        setTeams(teams);
        setVenues(venues);
        setSquad(squad);
    }, []);
    const navigate = useNavigate();
    function handleStartTournament() {
        navigate("/teams");
    }
    function handleResumeTournament() {
        navigate("/main-menu");
    }
    function handleRestartTournament() {
        if (window.confirm("Really want to Restart IPL Tournament?")) {
            localStorage.clear();
            navigate("/teams");
        }
        else {
            return;
        }
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Indian Premier League</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <div className={style.sectionContent}>
                            {gameStatus && <button className={style.button} onClick={handleResumeTournament} >Resume Tournament</button>}
                            {gameStatus ? <button className={style.button} onClick={handleRestartTournament} >Restart Tournament</button> : <button className={`${style.button} ${style.startButton}`} onClick={handleStartTournament} >Start Tournament</button>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Orange Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(orangeCap) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={squad[orangeCap.playerId - 1].profilePicture} alt={squad[orangeCap.playerId - 1].playerName} title={squad[orangeCap.playerId - 1].playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{squad[orangeCap.playerId - 1].playerName}</p>
                                        <span>{orangeCap.runs} {(orangeCap.runs > 1) ? "Runs" : "Run"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Purple Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(purpleCap) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={squad[purpleCap.playerId - 1].profilePicture} alt={squad[purpleCap.playerId - 1].playerName} title={squad[purpleCap.playerId - 1].playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{squad[purpleCap.playerId - 1].playerName}</p>
                                        <span>{purpleCap.wickets} {(purpleCap.wickets > 1) ? "Wickets" : "Wicket"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>{(winner) ? "Tournament Result" : "Next Match"}</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(nextMatch) ?
                                <>
                                    <div className={style.detailsContainer}>
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {venues[nextMatch.venueId - 1].venueCity}</span>
                                    </div>
                                    <div className={style.imageContainer}>
                                        <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].teamName} title={teams[nextMatch.homeTeamId - 1].teamName} />
                                        <span>V/S</span>
                                        <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].teamName} title={teams[nextMatch.awayTeamId - 1].teamName} />
                                    </div>
                                </> : (winner) ?
                                    <>
                                        <div className={style.detailsContainer}>
                                            <span>Winner: {teams[winner - 1].teamShortName}</span>
                                            <span>Runner Up: {teams[runnerUp - 1].teamShortName}</span>
                                        </div>
                                        <div className={style.imageContainer}>
                                            <img src={teams[winner - 1].logo} alt={teams[winner - 1].teamName} title={teams[winner - 1].teamName} />
                                            <img src={teams[runnerUp - 1].logo} alt={teams[runnerUp - 1].teamName} title={teams[runnerUp - 1].teamName} />
                                        </div>
                                    </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Table Topper</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(tableTopper && tableTopper.length) ?
                                <div className={style.imageContainer}>
                                    {tableTopper.map((team) =>
                                        <img key={team.teamId} src={teams[team.teamId - 1].logo} alt={teams[team.teamId - 1].teamName} title={teams[team.teamId - 1].teamName} />
                                    )}
                                </div> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;