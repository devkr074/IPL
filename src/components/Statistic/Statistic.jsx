import { useState, useEffect } from 'react';
import style from "./Statistic.module.css"
function Statistic() {
    const [mostRuns, setMostRuns] = useState([]);
    const [mostFifties, setMostFifties] = useState([]);
    const [mostCentury, setMostCentury] = useState([]);
    const [mostSixes, setMostSixes] = useState([]);
    const [mostFours, setMostFours] = useState([]);
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
            const mostRuns = statistic.filter((playerData) => (playerData.battingStatistic.innings > 0)).sort((a, b) => a.battingStatistic.runs == b.battingStatistic.runs ? a.battingStatistic.innings - b.battingStatistic.innings : b.battingStatistic.runs - a.battingStatistic.runs).slice(0, Math.min(statistic.length, 10));
            setMostRuns(mostRuns);
            const mostFifties = statistic.filter((playerData) => (playerData.battingStatistic.halfCentury > 0)).sort((a, b) => a.battingStatistic.halfCentury == b.battingStatistic.halfCentury ? b.battingStatistic.runs - a.battingStatistic.runs : b.battingStatistic.halfCentury - a.battingStatistic.halfCentury).slice(0, Math.min(statistic.length, 10));
            setMostFifties(mostFifties);
            const mostCentury = statistic.filter((playerData) => (playerData.battingStatistic.century > 0)).sort((a, b) => a.battingStatistic.century == b.battingStatistic.century ? b.battingStatistic.runs - a.battingStatistic.runs : b.battingStatistic.century - a.battingStatistic.century).slice(0, Math.min(statistic.length, 10));
            setMostCentury(mostCentury);
            const mostSixes = statistic.filter((playerData) => (playerData.battingStatistic.sixes > 0)).sort((a, b) => a.battingStatistic.sixes == b.battingStatistic.sixes ? b.battingStatistic.runs - a.battingStatistic.runs : b.battingStatistic.sixes - a.battingStatistic.sixes).slice(0, Math.min(statistic.length, 10));
            setMostSixes(mostSixes);
            const mostFours = statistic.filter((playerData) => (playerData.battingStatistic.fours > 0)).sort((a, b) => a.battingStatistic.fours == b.battingStatistic.fours ? b.battingStatistic.runs - a.battingStatistic.runs : b.battingStatistic.fours - a.battingStatistic.fours).slice(0, Math.min(statistic.length, 10));
            setMostFours(mostFours);
            const mostWickets = statistic.filter((playerData) => (playerData.bowlingStatistic.wickets > 0)).sort((a, b) => a.bowlingStatistic.wickets == b.bowlingStatistic.wickets ? a.bowlingStatistic.runs - b.bowlingStatistic.runs : b.bowlingStatistic.wickets - a.bowlingStatistic.wickets).slice(0, Math.min(statistic.length, 10));
            setMostWickets(mostWickets);
        }
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
                        <option value="Most Century">Most Century</option>
                        <option value="Most Fours">Most Fours</option>
                        <option value="Most Sixes">Most Sixes</option>
                        <option value="Most Wickets">Most Wickets</option>
                    </select>
                </div>
                <div className={style.containerContent}>
                    {tab == "Most Runs" && ((totalMatchPlayed && mostRuns.length > 0) ? (
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
                    {tab == "Most Fifties" && ((totalMatchPlayed && mostFifties.length > 0) ? (
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
                    {tab == "Most Fours" && ((totalMatchPlayed && mostFours.length > 0) ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batter</th>
                                        <th>M</th>
                                        <th>I</th>
                                        <th>R</th>
                                        <th>4s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostFours.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.battingStatistic.matches}</td>
                                            <td>{playerData.battingStatistic.innings}</td>
                                            <td>{playerData.battingStatistic.runs}</td>
                                            <td>{playerData.battingStatistic.fours}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                    {tab == "Most Sixes" && ((totalMatchPlayed && mostSixes.length > 0) ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batter</th>
                                        <th>M</th>
                                        <th>I</th>
                                        <th>R</th>
                                        <th>6s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostSixes.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.battingStatistic.matches}</td>
                                            <td>{playerData.battingStatistic.innings}</td>
                                            <td>{playerData.battingStatistic.runs}</td>
                                            <td>{playerData.battingStatistic.sixes}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                    {tab == "Most Century" && ((totalMatchPlayed && mostCentury.length > 0) ? (
                        <div className={style.section}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batter</th>
                                        <th>M</th>
                                        <th>I</th>
                                        <th>R</th>
                                        <th>100s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostCentury.map((playerData, index) =>
                                        <tr key={playerData.playerId}>
                                            <td><span>{index + 1}</span><span>{player[playerData.playerId - 1].playerName}</span></td>
                                            <td>{playerData.battingStatistic.matches}</td>
                                            <td>{playerData.battingStatistic.innings}</td>
                                            <td>{playerData.battingStatistic.runs}</td>
                                            <td>{playerData.battingStatistic.century}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>No Data Available Currently!</p>)}
                    {tab == "Most Wickets" && ((totalMatchPlayed && mostWickets.length > 0) ? (
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