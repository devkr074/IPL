import { useState, useEffect } from 'react';
function BowlingStatistics() {
    const [tabs, setTabs] = useState("Most Wickets");
    const [mostWickets, setMostWickets] = useState();
    const [bestBowlingAverage, setBestBowlingAverage] = useState();
    const [bestBowling, setBestBowling] = useState();
    const [mostFiveWicketsHaul, setMostFiveWicketsHaul] = useState();
    const [bestEconomy, setBestEconomy] = useState();
    const [bestBowlingStrikeRate, setBestBowlingStrikeRate] = useState();
    const [teams, setTeams] = useState();
    const [squad, setSquad] = useState();
    useEffect(() => {
        document.title = "IPL - Batting Statistics";
        const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const mostWickets = bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => a.wickets == b.wickets ? a.runs - b.runs : b.wickets - a.wickets).slice(0, 10);
        setMostWickets(mostWickets);
        const bestBowlingAverage = bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => (a.runs / a.wickets) == (b.runs / b.wickets) ? a.runs - b.runs : (a.runs / a.wickets) - (b.runs / b.wickets)).slice(0, 10);
        setBestBowlingAverage(bestBowlingAverage);
        const bestBowling = bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => a.bestBowlingWickets == b.bestBowlingWickets ? a.bestBowlingRuns - b.bestBowlingRuns : b.bestBowlingWickets - a.bestBowlingWickets).slice(0, 10);
        setBestBowling(bestBowling);
        const mostFiveWicketsHaul = bowlingStatistics.filter(p => p.fiveWickets != 0).sort((a, b) => (a.fiveWickets == b.fiveWickets) ? b.wickets - a.wickets : (b.fiveWickets - a.fiveWickets)).slice(0, 10);
        setMostFiveWicketsHaul(mostFiveWicketsHaul);
        const bestEconomy = bowlingStatistics.filter(p => p.balls != 0).sort((a, b) => (a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) == (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))) ? b.wickets - a.wickets : (a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) - (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6)))).slice(0, 10);
        setBestEconomy(bestEconomy);
        const bestBowlingStrikeRate = bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => (a.balls / a.wickets) == (b.balls / b.wickets) ? b.wickets - a.wickets : (a.balls / a.wickets) - (b.balls / b.wickets)).slice(0, 10);
        setBestBowlingStrikeRate(bestBowlingStrikeRate);
        setSquad(squad);
        setTeams(teams);
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL -
                        <select value={tabs} onChange={(e) => setTabs(e.target.value)}>
                            <option value="Most Wickets">Most Wickets</option>
                            <option value="Best Bowling Average">Best Bowling Average</option>
                            <option value="Best Bowling">Best Bowling</option>
                            <option value="Most Five Wickets Haul">Most Five Wickets Haul</option>
                            <option value="Best Economy">Best Economy</option>
                            <option value="Best Bowling Strike Rate">Best Bowling Strike Rate</option>
                        </select></p>
                </div>
                <div className={style.containerContent}>
                    {tabs == "Most Wickets" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>M</th>
                                    <th>O</th>
                                    <th>W</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostWickets && mostWickets.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <td>{(p.runs / p.wickets).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    {tabs == "Best Bowling Average" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>M</th>
                                    <th>O</th>
                                    <th>W</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBowlingAverage && bestBowlingAverage.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <td>{(p.runs / p.wickets).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Bowling" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>Vs</th>
                                    <th>BBI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBowling && bestBowling.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{teams[p.bestBowlingOpponentTeamId - 1].shortName}</td>
                                        <td>{p.bestBowlingWickets}-{p.bestBowlingRuns}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Most Five Wickets Haul" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>M</th>
                                    <th>O</th>
                                    <th>W</th>
                                    <th>5Wkts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostFiveWicketsHaul && mostFiveWicketsHaul.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <td>{p.fiveWickets}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Economy" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>M</th>
                                    <th>O</th>
                                    <th>W</th>
                                    <th>Eco</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestEconomy && bestEconomy.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <td>{(p.runs / ((p.balls / 6) + ((p.balls % 6) / 6))).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Bowling Strike Rate" &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>M</th>
                                    <th>O</th>
                                    <th>W</th>
                                    <th>SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBowlingStrikeRate && bestBowlingStrikeRate.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <td>{(p.balls/p.wickets).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    );
}
export default BowlingStatistics;