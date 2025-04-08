import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const [gameStatus, setGameStatus] = useState(false);
    const [nextMatch, setNextMatch] = useState([]);
    const [orangeCap, setOrangeCap] = useState([]);
    const [player, setPlayer] = useState([]);
    const [purpleCap, setPurpleCap] = useState([]);
    const [tableTopper, setTableTopper] = useState([]);
    const [team, setTeam] = useState([]);
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [venue, setVenue] = useState([]);
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const gameStatus = localStorage.getItem("gameStatus");
        const player = JSON.parse(localStorage.getItem("player"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        const team = JSON.parse(localStorage.getItem("team"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const venue = JSON.parse(localStorage.getItem("venue"));
        setGameStatus(gameStatus);
        setPlayer(player);
        setTeam(team);
        setVenue(venue);
        setTotalMatchPlayed(totalMatchPlayed);
        if (gameStatus && totalMatchPlayed) {
            statistic.sort((a, b) => b.battingStatistic.runs - a.battingStatistic.runs);
            setOrangeCap(statistic[0]);
            statistic.sort((a, b) => b.bowlingStatistic.wickets - a.bowlingStatistic.wickets);
            setPurpleCap(statistic[0]);
            pointsTable.sort((a, b) => a.points == b.points ? b.netRunRate - a.netRunRate : b.points - a.points);
            setTableTopper(pointsTable.slice(0, Math.min(totalMatchPlayed, 4)));
        }
        if (gameStatus) {
            for (let i = 0; i < schedule.length; i++) {
                if (schedule[i].matchStatusId == null) {
                    setNextMatch(schedule[i]);
                    break;
                }
            }
        }
    }, []);
    const navigate = useNavigate();
    function handleResumeTournament() {
        navigate("/main-menu");
    }
    function handleRestartTournament() {
        if (window.confirm("Really want to restart tournament.")) {
            localStorage.clear();
            navigate("/team");
        }
        else {
            return;
        }
    }
    function handleStartTournament() {
        navigate("/team");
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL 2025 - Indian Premier League</p>
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
                            {(gameStatus && totalMatchPlayed) ?
                                <>
                                    <img src={player[orangeCap.playerId - 1].profilePicture} title={player[orangeCap.playerId - 1].playerName} />
                                    <div className={style.details}>
                                        <p>{player[orangeCap.playerId - 1].playerName}</p>
                                        <span>{orangeCap.battingStatistic.runs} Runs</span>
                                    </div>
                                </> : <p className={style.errorMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Purple Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && totalMatchPlayed) ?
                                <>
                                    <img src={player[purpleCap.playerId - 1].profilePicture} title={player[purpleCap.playerId - 1].playerName} />
                                    <div className={style.details}>
                                        <p>{player[purpleCap.playerId - 1].playerName}</p>
                                        <span>{purpleCap.bowlingStatistic.wickets} Wickets</span>
                                    </div>
                                </> : <p className={style.errorMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Next Match</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus) ?
                                <>
                                    <div className={style.details}>
                                        <span>Match: {nextMatch.matchId}</span>
                                        <span>Venue: {venue[nextMatch.venueId - 1].venueCity}</span>
                                    </div>
                                    <div className={style.card}>
                                        <img src={team[nextMatch.teamAId - 1].logo} alt="" />
                                        <span>vs</span>
                                        <img src={team[nextMatch.teamBId - 1].logo} alt="" />
                                    </div>
                                </> : <p className={style.errorMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Table Topper</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && totalMatchPlayed) ?
                                tableTopper.map((teamData) =>
                                    <img key={teamData.teamId} src={team[teamData.teamId - 1].logo} alt={team[teamData.teamId - 1].name} title={team[teamData.teamId - 1].name} />
                                ) : <p className={style.errorMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;