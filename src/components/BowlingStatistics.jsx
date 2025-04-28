import { useState, useEffect } from 'react';
function BowlingStatistics() {
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Most Wickets");
    const [teams, setTeams] = useState();
    const [mostWickets, setMostWickets] = useState();
    const [bestBowlingAverage, setBestBowlingAverage] = useState();
    const [bestBowling, setBestBowling] = useState();
    const [mostFiveWicketsHaul, setMostFiveWicketsHaul] = useState();
    const [bestEconomy, setBestEconomy] = useState();
    const [bestBowlingStrikeRate, setBestBowlingStrikeRate] = useState();
    useEffect(() => {
        document.title = "IPL - Batting Statistics";
        const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const mostWickets = bowlingStatistics && bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => a.wickets == b.wickets ? a.runs - b.runs : b.wickets - a.wickets).slice(0, 10);
        const bestBowlingAverage = bowlingStatistics && bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => (a.runs / a.wickets) == (b.runs / b.wickets) ? a.runs - b.runs : (a.runs / a.wickets) - (b.runs / b.wickets)).slice(0, 10);
        const bestBowling = bowlingStatistics && bowlingStatistics.filter(p => p.bestBowlingWickets != 0).sort((a, b) => a.bestBowlingWickets == b.bestBowlingWickets ? a.bestBowlingRuns - b.bestBowlingRuns : b.bestBowlingWickets - a.bestBowlingWickets).slice(0, 10);
        const mostFiveWicketsHaul = bowlingStatistics && bowlingStatistics.filter(p => p.fiveWickets != 0).sort((a, b) => (a.fiveWickets == b.fiveWickets) ? b.wickets - a.wickets : (b.fiveWickets - a.fiveWickets)).slice(0, 10);
        const bestEconomy = bowlingStatistics && bowlingStatistics.filter(p => p.balls != 0).sort((a, b) => (a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) == (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))) ? b.wickets - a.wickets : (a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) - (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6)))).slice(0, 10);
        const bestBowlingStrikeRate = bowlingStatistics && bowlingStatistics.filter(p => p.wickets != 0).sort((a, b) => (a.balls / a.wickets) == (b.balls / b.wickets) ? b.wickets - a.wickets : (a.balls / a.wickets) - (b.balls / b.wickets)).slice(0, 10);
        setSquad(squad);
        setTeams(teams);
        setMostWickets(mostWickets);
        setBestBowlingAverage(bestBowlingAverage);
        setBestBowling(bestBowling);
        setMostFiveWicketsHaul(mostFiveWicketsHaul);
        setBestEconomy(bestEconomy);
        setBestBowlingStrikeRate(bestBowlingStrikeRate);
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div>
                <p>IPL - Bowling Statistics</p>
            </div>
            <div>
                <button value="Most Wickets" onClick={handleTabChange}>Most Wickets</button>
                <button value="Best Bowling Average" onClick={handleTabChange}>Best Bowling Average</button>
                <button value="Best Bowling" onClick={handleTabChange}>Best Bowling</button>
                <button value="Most Five Wickets Haul" onClick={handleTabChange}>Most Five Wickets Haul</button>
                <button value="Best Economy" onClick={handleTabChange}>Best Economy</button>
                <button value="Best Bowling Strike Rate" onClick={handleTabChange}>Best Bowling Strike Rate</button>
            </div>
            <div>
                {tab == "Most Wickets" &&
                    ((mostWickets && mostWickets.length != 0) ?
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
                                {mostWickets.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <th>{p.wickets}</th>
                                        <td>{(p.runs / p.wickets).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Bowling Average" &&
                    ((bestBowlingAverage && bestBowlingAverage.length != 0) ?
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
                                {bestBowlingAverage.map((p) =>
                                    <tr className="data" key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <th>{(p.runs / p.wickets).toFixed(2)}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Bowling" &&
                    ((bestBowling && bestBowling.length != 0) ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Bowler</th>
                                    <th>Vs</th>
                                    <th>BBI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestBowling.map((p) =>
                                    <tr className="data" key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{teams[p.bestBowlingOpponentTeamId - 1].shortName}</td>
                                        <th>{p.bestBowlingWickets}-{p.bestBowlingRuns}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Most Five Wickets Haul" &&
                    ((mostFiveWicketsHaul && mostFiveWicketsHaul.length != 0) ?
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
                                {mostFiveWicketsHaul.map((p) =>
                                    <tr className="data" key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <th>{p.fiveWickets}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Economy" &&
                    ((bestEconomy && bestEconomy.length != 0) ?
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
                                {bestEconomy.map((p) =>
                                    <tr className="data" key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                        <td>{p.wickets}</td>
                                        <th>{(p.runs / ((p.balls / 6) + ((p.balls % 6) / 6))).toFixed(2)}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Bowling Strike Rate" &&
                    ((bestBowlingStrikeRate && bestBowlingStrikeRate.length != 0) ? <table>
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
                            {bestBowlingStrikeRate.map((p) =>
                                <tr className="data" key={p.playerId}>
                                    <td>{squad[p.playerId - 1].name}</td>
                                    <td>{p.matches}</td>
                                    <td>{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</td>
                                    <td>{p.wickets}</td>
                                    <th>{(p.balls / p.wickets).toFixed(2)}</th>
                                </tr>
                            )}
                        </tbody>
                    </table> : <p>No Data Available Currently!</p>)}
            </div>
        </>
    );
}
export default BowlingStatistics;