import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
import poster from "../../assets/poster.png"
function Home() {
    const [player, setPlayer] = useState([]);
    const [pointsTable, setPointsTable] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [statistic, setStatistic] = useState([]);
    const [team, setTeam] = useState([]);
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [gameStatus, setGameStatus] = useState(false);
    const [orangeCapHolder, setOrangeCapHolder] = useState([]);
    const [purpleCapHolder, setPurpleCapHolder] = useState([]);
    const [nextMatch, setNextMatch] = useState([]);
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const player = JSON.parse(localStorage.getItem("player")) || [];
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable")) || [];
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        const team = JSON.parse(localStorage.getItem("team"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const gameStatus = localStorage.getItem("gameStatus");
        setPlayer(player);
        setPointsTable(pointsTable);
        setSchedule(schedule);
        setStatistic(statistic);
        setTeam(team);
        setTotalMatchPlayed(totalMatchPlayed);
        setUserTeamId(userTeamId);
        setGameStatus(gameStatus);
        if (gameStatus) {
            const sortedPointsTable = sortData(pointsTable, 'points', 'netRunRate');
            const pointsTableData = getPointsTableData(sortedPointsTable);
            setPointsTable(pointsTableData);
            statistic.sort((a, b) => b.battingStatistic.runs - a.battingStatistic.runs);
            setOrangeCapHolder(statistic[0]);
            statistic.sort((a, b) => b.bowlingStatistic.wickets - a.bowlingStatistic.wickets);
            setPurpleCapHolder(statistic[0]);
            const nextMatchDetail = nextMatchFunction();
            setNextMatch(nextMatchDetail);
            console.log(nextMatch);
        }
    }, []);
    function nextMatchFunction() {
        for (let i = 0; i < schedule.length; i++) {
            const matchStatusId = schedule[i].matchStatusId;
            if (matchStatusId == null) {
                return schedule[i];
            }
        }
    }
    function getPointsTableData(arr) {
        let point = [];
        let i = 0;
        while (i < 4) {
            if (arr[i].matchesPlayed != 0) {
                point.push(arr[i]);
            }
            i++;
        }
        return point;
    }
    function sortData(arr, primaryKey, secondaryKey) {
        return arr.sort((a, b) => {
            if (a[primaryKey] === b[primaryKey]) {
                return b[secondaryKey] - a[secondaryKey];
            }
            return b[primaryKey] - a[primaryKey];
        });
    }
    const navigate = useNavigate();
    function handleResume() {
        navigate("/main-menu");
    }
    function handleStart() {
        if (localStorage.getItem("gameStatus")) {
            const restart = window.confirm("Do You Really want to restart the game?");
            if (restart) {
                localStorage.clear();
                navigate("/team");
            }
            else {
                return;
            }
        }
        else {
            navigate("/team");
        }
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>Indian Premier League - IPL 2025</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <div className={style.sectionContent}>
                            {localStorage.getItem('gameStatus') ? <button className={style.button} onClick={handleResume} >Resume Tournament</button> : <></>}
                            {localStorage.getItem('gameStatus') ? <button className={style.button} onClick={handleStart} >Restart Tournament</button> : <button className={`${style.button} ${style.startButton}`} onClick={handleStart} >Start Tournament</button>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Orange Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {player.length > 0 && orangeCapHolder && orangeCapHolder.playerId ? (
                                <>
                                    <img src={player[orangeCapHolder.playerId - 1]?.profilePicture || ""} title={player[orangeCapHolder.playerId - 1]?.playerName || ""} alt="" />
                                    <div className={style.details}>

                                        <p>{player[orangeCapHolder.playerId - 1]?.playerName || "Unknown Player"}</p>
                                        <span>{orangeCapHolder.battingStatistic?.runs || 0} Runs</span>
                                    </div>
                                </>
                            ) : (
                                <p className={style.errorMessage} >No Data Available Currently!</p>
                            )}
                        </div>

                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Purple Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {player.length > 0 && purpleCapHolder && purpleCapHolder.playerId ? (
                                <>
                                    <img src={player[purpleCapHolder.playerId - 1]?.profilePicture || ""} title={player[purpleCapHolder.playerId - 1]?.playerName || ""} alt="" />
                                    <div className={style.details}>

                                        <p>{player[purpleCapHolder.playerId - 1]?.playerName || "Unknown Player"}</p>
                                        <span>{purpleCapHolder.bowlingStatistic?.wickets || 0} Wickets</span>
                                    </div>
                                </>
                            ) : (
                                <p className={style.errorMessage} >No Data Available Currently!</p>
                            )}
                        </div>

                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Next Match</p>
                        </div>
                        <div className={style.sectionContent}>
                            {!localStorage.getItem('gameStatus') ? <p className={style.errorMessage} >Tournament not Started Yet!</p> : <button className={style.button} onClick={handleStart} >Start</button>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Table Topper</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(localStorage.getItem('totalMatchPlayed') == 0 || localStorage.getItem('totalMatchPlayed') == null) ? <p className={style.errorMessage} >No Data Available Currently!</p> :
                                (pointsTable.map((rank) => {
                                    return <img key={rank.teamId} title={team[team.findIndex(obj => obj.teamId === rank.teamId)].teamName} alt={team[team.findIndex(obj => obj.teamId === rank.teamId)].teamName} src={team[team.findIndex(obj => obj.teamId === rank.teamId)].logo} />
                                }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;