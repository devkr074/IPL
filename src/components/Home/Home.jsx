import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const [gameStatus, setGameStatus] = useState(false);
    const [orangeCap, setOrangeCap] = useState([]);
    const [purpleCap, setPurpleCap] = useState([]);
    const [nextMatch, setNextMatch] = useState([]);
    const [tableTopper, setTableTopper] = useState([]);
    const [player, setPlayer] = useState([]);
    const [team, setTeam] = useState([]);
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [venue, setVenue] = useState([]);
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        const player = JSON.parse(localStorage.getItem("player"));
        const team = JSON.parse(localStorage.getItem("team"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const venue = JSON.parse(localStorage.getItem("venue"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        const gameStatus = localStorage.getItem("gameStatus");
        setPlayer(player);
        setTeam(team);
        setTotalMatchPlayed(totalMatchPlayed);
        setVenue(venue);
        setGameStatus(gameStatus);
        if (gameStatus && totalMatchPlayed) {
            const orangeCap = statistic.filter((playerData) => (playerData.battingStatistic.innings > 0)).sort((a, b) => a.battingStatistic.runs == b.battingStatistic.runs ? a.battingStatistic.innings - b.battingStatistic.innings : b.battingStatistic.runs - a.battingStatistic.runs).slice(0, Math.min(statistic.length, 1));
            setOrangeCap(orangeCap[0]);
            const purpleCap = statistic.filter((playerData) => (playerData.bowlingStatistic.wickets > 0)).sort((a, b) => a.bowlingStatistic.wickets == b.bowlingStatistic.wickets ? a.bowlingStatistic.runs - b.bowlingStatistic.runs : b.bowlingStatistic.wickets - a.bowlingStatistic.wickets).slice(0, Math.min(statistic.length, 1));
            setPurpleCap(purpleCap[0]);
            const tableTopper = pointsTable.filter((teamData) => (teamData.matchesPlayed > 0)).sort((a, b) => a.points == b.points ? b.netRunRate - a.netRunRate : b.points - a.points).slice(0, Math.min(pointsTable.length, 4));
            setTableTopper(tableTopper);
        }
        if (gameStatus) {
            const nextMatch = schedule.filter((matchData) => (matchData.matchStatusId == null)).slice(0, Math.min(schedule.length, 1));
            setNextMatch(nextMatch[0]);
        }
    }, []);
    const navigate = useNavigate();
    function handleStartTournament() {
        navigate("/team");
    }
    function handleResumeTournament() {
        navigate("/main-menu");
    }
    function handleRestartTournament() {
        if (window.confirm("Really want to Restart IPL Tournament?")) {
            localStorage.clear();
            navigate("/team");
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
                            {(gameStatus && totalMatchPlayed && orangeCap) ?
                                <>
                                    <img src={player[orangeCap.playerId - 1].profilePicture} alt={player[orangeCap.playerId - 1].profilePicture} title={player[orangeCap.playerId - 1].playerName} />
                                    <div className={style.details}>
                                        <p>{player[orangeCap.playerId - 1].playerName}</p>
                                        <span>{orangeCap.battingStatistic.runs} {(orangeCap.battingStatistic.runs > 1) ? "Runs" : "Run"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Purple Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && totalMatchPlayed && purpleCap) ?
                                <>
                                    <img src={player[purpleCap.playerId - 1].profilePicture} alt={player[purpleCap.playerId - 1].profilePicture} title={player[purpleCap.playerId - 1].playerName} />
                                    <div className={style.details}>
                                        <p>{player[purpleCap.playerId - 1].playerName}</p>
                                        <span>{purpleCap.bowlingStatistic.wickets} {(purpleCap.bowlingStatistic.wickets > 1) ? "Wickets" : "Wicket"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Next Match</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && nextMatch) ?
                                <>
                                    <div className={style.details}>
                                        <span>Match: {nextMatch.matchId}</span>
                                        <span>Venue: {venue[nextMatch.venueId - 1].venueCity}</span>
                                    </div>
                                    <div className={style.card}>
                                        <img src={team[nextMatch.teamAId - 1].logo} alt={team[nextMatch.teamAId - 1].logo} title={team[nextMatch.teamAId - 1].logo} />
                                        <span>vs</span>
                                        <img src={team[nextMatch.teamBId - 1].logo} alt={team[nextMatch.teamBId - 1].logo} title={team[nextMatch.teamBId - 1].logo} />
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Table Topper</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && totalMatchPlayed && tableTopper.length > 0) ?
                                tableTopper.map((teamData) =>
                                    <img key={teamData.teamId} src={team[teamData.teamId - 1].logo} alt={team[teamData.teamId - 1].name} title={team[teamData.teamId - 1].name} />
                                ) : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;