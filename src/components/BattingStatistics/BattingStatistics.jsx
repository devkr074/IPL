import { useState, useEffect } from 'react';
import style from "./BattingStatistics.module.css"
function BattingStatistics() {
    const [tabs, setTabs] = useState("Most Runs");
    const [mostRuns, setMostRuns] = useState();
    const [highestScore, setHighestScore] = useState();
    const [bestBattingAverage, setBestBattingAverage] = useState();
    const [bestBattingStrikeRate, setBestBattingStrikeRate] = useState();
    const [mostFifties, setMostFifties] = useState();
    const [mostHundreds, setMostHundreds] = useState();
    const [mostFours, setMostFours] = useState();
    const [mostSixes, setMostSixes] = useState();
    const [teams, setTeams] = useState();
    const [squad, setSquad] = useState();
    useEffect(() => {
        document.title = "IPL - Batting Statistics";
        const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const mostRuns = battingStatistics.filter(p => p.innings != 0).sort((a, b) => a.runs == b.runs ? a.balls - b.balls : b.runs - a.runs).slice(0, 10);
        setMostRuns(mostRuns);
        const highestScore = battingStatistics.filter(p => p.innings != 0).sort((a, b) => a.highestScoreRuns == b.highestScoreRuns ? a.highestScoreBalls - b.highestScoreBalls : b.highestScoreRuns - a.highestScoreRuns).slice(0, 10);
        setHighestScore(highestScore);
        const bestBattingAverage = battingStatistics.filter(p => p.innings != 0 && p.innings - p.notOut != 0).sort((a, b) => (a.runs / (a.innings - a.notOut)) == (b.runs / (b.innings - b.notOut)) ? b.runs - a.runs : (b.runs / (b.innings - b.notOut)) - (a.runs / (a.innings - a.notOut))).slice(0, 10);
        setBestBattingAverage(bestBattingAverage);
        const bestBattingStrikeRate = battingStatistics.filter(p => p.innings != 0).sort((a, b) => ((a.runs / a.balls) * 100) == ((b.runs / b.balls) * 100) ? b.runs - a.runs : ((b.runs / b.balls) * 100) - ((a.runs / a.balls) * 100)).slice(0, 10);
        setBestBattingStrikeRate(bestBattingStrikeRate);
        const mostFifties = battingStatistics.filter(p => p.halfCenturies != 0).sort((a, b) => a.halfCenturies == b.halfCenturies ? b.runs - a.runs : b.halfCenturies - a.halfCenturies).slice(0, 10);
        setMostFifties(mostFifties);
        const mostHundreds = battingStatistics.filter(p => p.centuries != 0).sort((a, b) => a.centuries == b.centuries ? b.runs - a.runs : b.centuries - a.centuries).slice(0, 10);
        setMostHundreds(mostHundreds);
        const mostFours = battingStatistics.filter(p => p.fours != 0).sort((a, b) => a.fours == b.fours ? b.runs - a.runs : b.fours - a.fours).slice(0, 10);
        setMostFours(mostFours);
        const mostSixes = battingStatistics.filter(p => p.sixes != 0).sort((a, b) => a.sixes == b.sixes ? b.runs - a.runs : b.sixes - a.sixes).slice(0, 10);
        setMostSixes(mostSixes);
        setSquad(squad);
        setTeams(teams);
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL -
                        <select value={tabs} onChange={(e) => setTabs(e.target.value)}>
                            <option value="Most Runs">Most Runs</option>
                            <option value="Highest Score">Highest Score</option>
                            <option value="Best Batting Average">Best Batting Average</option>
                            <option value="Best Batting Strike Rate">Best Batting Strike Rate</option>
                            <option value="Most Fifties">Most Fifties</option>
                            <option value="Most Hundreds">Most Hundreds</option>
                            <option value="Most Fours">Most Fours</option>
                            <option value="Most Sixes">Most Sixes</option>
                        </select></p>
                </div>
                <div className={style.containerContent}>
                    {tabs == "Most Runs" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>M</th>
                                    <th>I</th>
                                    <th>R</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostRuns && mostRuns.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{(p.runs / (p.innings - p.notOut)).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    {tabs == "Highest Score" &&

                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>HS</th>
                                    <th>B</th>
                                    <th>SR</th>
                                    <th>Vs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highestScore && highestScore.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.highestScoreRuns}</td>
                                        <td>{p.highestScoreBalls}</td>
                                        <td>{((p.highestScoreRuns / p.highestScoreBalls) * 100).toFixed(2)}</td>
                                        <td>{teams[p.highestScoreOpponentTeamId - 1].shortName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Batting Average" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>M</th>
                                    <th>I</th>
                                    <th>R</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBattingAverage && bestBattingAverage.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{(p.runs / (p.innings - p.notOut)).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Batting Strike Rate" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>M</th>
                                    <th>I</th>
                                    <th>R</th>
                                    <th>SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBattingStrikeRate && bestBattingStrikeRate.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{((p.runs / p.balls) * 100).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Most Fifties" &&
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
                                {mostFifties && mostFifties.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{p.halfCenturies}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Most Hundreds" &&
                       ((mostHundreds==null) ? <table>
                        < thead >
                            <tr>
                                <th>Batter</th>
                                <th>M</th>
                                <th>I</th>
                                <th>R</th>
                                <th>100s</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostHundreds.map((p) =>
                                <tr className={style.data} key={p.playerId}>
                                    <td>{squad[p.playerId - 1].name}</td>
                                    <td>{p.matches}</td>
                                    <td>{p.innings}</td>
                                    <td>{p.runs}</td>
                                    <td>{p.centuries}</td>
                                </tr>
                            )}
                        </tbody>
                    </table> : <p>No Data Available Currently</p>)}
                    {tabs == "Most Fours" &&
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
                                {mostFours && mostFours.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{p.fours}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Most Sixes" &&
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
                                {mostSixes && mostSixes.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{p.sixes}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                </div >
            </div >
        </>
    );
}
export default BattingStatistics;