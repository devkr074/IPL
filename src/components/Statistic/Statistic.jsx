import { useState, useEffect } from 'react';
import style from "./Statistic.module.css"
function Statistic() {
    const [mostRuns, setMostRuns] = useState([]);
    const [mostFifties, setMostFifties] = useState([]);
    const [mostWickets, setMostWickets] = useState([]);
    const [player, setPlayer] = useState([]);
    const [tab, setTab] = useState("Most Runs");
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    useEffect(() => {
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        const player = JSON.parse(localStorage.getItem("player"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        setTotalMatchPlayed(totalMatchPlayed);
        setPlayer(player);
        if (totalMatchPlayed) {
            statistic.sort((a, b) => a.battingStatistic.runs == b.battingStatistic.runs ? a.battingStatistic.innings - b.battingStatistic.innings : b.battingStatistic.runs - a.battingStatistic.runs);
            setMostRuns(statistic.slice(0, Math.min(statistic.filter((playerData) => (playerData.battingStatistic.innings > 0)).length, 10)));
            statistic.sort((a, b) => a.battingStatistic.halfCentury == b.battingStatistic.halfCentury ? b.battingStatistic.runs - a.battingStatistic.runs : b.battingStatistic.halfCentury - a.battingStatistic.halfCentury);
            setMostFifties(statistic.slice(0, Math.min(statistic.filter((playerData) => (playerData.battingStatistic.halfCentury > 0)).length, 10)));
            statistic.sort((a, b) => a.bowlingStatistic.wickets == b.bowlingStatistic.wickets ? a.bowlingStatistic.runs - b.bowlingStatistic.runs : b.bowlingStatistic.wickets - a.bowlingStatistic.wickets);
            setMostWickets(statistic.slice(0, Math.min(statistic.filter((playerData) => (playerData.bowlingStatistic.balls > 0)).length, 10)));
        }
        console.log(statistic);
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL 2025 - Statistic</p>
                    <select onChange={handleTabChange} value={tab}>
                        <option value="Most Runs">Most Runs</option>
                        <option value="Most Fifties">Most Fifties</option>
                        <option value="Most Wickets">Most Wickets</option>
                    </select>
                </div>
                <div className={style.containerContent}>
                    {tab == "Most Runs" && (totalMatchPlayed ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batter</th>
                                        <th>M</th>
                                        <th>I</th>
                                        <th>R</th>
                                        <th>AVG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostRuns.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.battingStatistic.matches}</td>
                                            <td>{playerData.battingStatistic.innings}</td>
                                            <td>{playerData.battingStatistic.runs}</td>
                                            <td>{(playerData.battingStatistic.runs / playerData.battingStatistic.innings).toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                    {tab == "Most Fifties" && (totalMatchPlayed ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batter</th>
                                        <th>M</th>
                                        <th>I</th>
                                        <th>R</th>
                                        <th>50s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostFifties.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.battingStatistic.matches}</td>
                                            <td>{playerData.battingStatistic.innings}</td>
                                            <td>{playerData.battingStatistic.runs}</td>
                                            <td>{playerData.battingStatistic.halfCentury}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                    {tab == "Most Wickets" && (totalMatchPlayed ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Bowler</th>
                                        <th>M</th>
                                        <th>O</th>
                                        <th>W</th>
                                        <th>AVG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostWickets.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.bowlingStatistic.matches}</td>
                                            <td>{Math.floor(playerData.bowlingStatistic.balls / 6)}.{playerData.bowlingStatistic.balls % 6}</td>
                                            <td>{playerData.bowlingStatistic.wickets}</td>
                                            <td>{(playerData.bowlingStatistic.runs / playerData.bowlingStatistic.wickets).toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                </div>
            </div>
        </>
    );
}
export default Statistic;