import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
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
        }
        else {
            return;
        }
    }
    function handleStartTournament() {
        navigate("/teams");
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Indian Premier League</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.sectionContainer}>
                        <div className={style.section}>
                            <div className={style.sectionContent}>
                                {(status) && <button className={style.button} onClick={handleResumeTournament} >Resume Tournament</button>}
                                {(status) ? <button className={style.button} onClick={handleRestartTournament} >Restart Tournament</button> : <button className={`${style.button} ${style.startButton}`} onClick={handleStartTournament} >Start Tournament</button>}
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
                                            <img src={squad[orangeCap.playerId - 1].profile} alt={squad[orangeCap.playerId - 1].name} title={squad[orangeCap.playerId - 1].name} />
                                        </div>
                                        <div className={style.detailsContainer}>
                                            <p>{squad[orangeCap.playerId - 1].name}</p>
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
                                            <img src={squad[purpleCap.playerId - 1].profile} alt={squad[purpleCap.playerId - 1].name} title={squad[purpleCap.playerId - 1].name} />
                                        </div>
                                        <div className={style.detailsContainer}>
                                            <p>{squad[purpleCap.playerId - 1].name}</p>
                                            <span>{purpleCap.wickets} {(purpleCap.wickets > 1) ? "Wickets" : "Wicket"}</span>
                                        </div>
                                    </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.sectionContainer}>
                        <div className={style.section}>
                            <div className={style.sectionHeader}>
                                <p>{(nextMatch) ? "Next Match" : "Tournament Result"}</p>
                            </div>
                            <div className={style.sectionContent}>
                                {(nextMatch) ?
                                    <>
                                        <div className={style.detailsContainer}>
                                            <span>{(nextMatch.matchId == 71) ? "Qualifier 1" : (nextMatch.matchId == 72) ? "Eliminator" : (nextMatch.matchId == 73) ? "Qualifier 2" : (nextMatch.matchId == 74) ? "Final" : "Match #" + nextMatch.matchId}</span>
                                            <span>Venue: {venues[nextMatch.venueId - 1].city}</span>
                                        </div>
                                        <div className={style.imageContainer}>
                                            <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                                            <span>V/S</span>
                                            <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                                        </div>
                                    </> : (winnerTeamId) ?
                                        <>
                                            <div className={style.detailsContainer}>
                                                <span>Winner: {teams[winnerTeamId - 1].shortName}</span>
                                                <span>Runner Up: {teams[runnerUpTeamId - 1].shortName}</span>
                                            </div>
                                            <div className={style.imageContainer}>
                                                <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                                <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                                            </div>
                                        </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                            </div>
                        </div>
                        <div className={style.section}>
                            <div className={style.sectionHeader}>
                                <p>Table Topper</p>
                            </div>
                            <div className={style.sectionContent}>
                                {(tableTopper) ?
                                    <div className={style.imageContainer}>
                                        {tableTopper.map((t) =>
                                            <img key={t.teamId} src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} title={teams[t.teamId - 1].name} />
                                        )}
                                    </div> : <p className={style.altMessage} >No Data Available Currently!</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;