import { useState, useEffect } from 'react';
function BattingStatistics() {
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Most Runs");
    const [teams, setTeams] = useState();
    const [mostRuns, setMostRuns] = useState();
    const [highestScore, setHighestScore] = useState();
    const [bestBattingAverage, setBestBattingAverage] = useState();
    const [bestBattingStrikeRate, setBestBattingStrikeRate] = useState();
    const [mostFifties, setMostFifties] = useState();
    const [mostHundreds, setMostHundreds] = useState();
    const [mostFours, setMostFours] = useState();
    const [mostSixes, setMostSixes] = useState();
    useEffect(() => {
        document.title = "IPL - Batting Statistics";
        const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const mostRuns = battingStatistics && battingStatistics.filter((p) => (p.runs != 0)).sort((a, b) => ((a.runs == b.runs) ? ((b.runs / b.dismissed) - (a.runs / a.dismissed)) : (b.runs - a.runs))).slice(0, 10);
        const highestScore = battingStatistics && battingStatistics.filter((p) => (p.highestScoreRuns != 0)).sort((a, b) => ((a.highestScoreRuns == b.highestScoreRuns) ? (a.highestScoreBalls - b.highestScoreBalls) : (b.highestScoreRuns - a.highestScoreRuns))).slice(0, 10);
        const bestBattingAverage = battingStatistics && battingStatistics.filter((p) => (p.dismissed != 0)).sort((a, b) => (((a.runs / a.dismissed) == (b.runs / b.dismissed)) ? (b.runs - a.runs) : ((b.runs / b.dismissed) - (a.runs / a.dismissed)))).slice(0, 10);
        const bestBattingStrikeRate = battingStatistics && battingStatistics.filter((p) => (p.runs != 0)).sort((a, b) => ((((a.runs / a.balls) * 100) == ((b.runs / b.balls) * 100)) ? (b.runs - a.runs) : (((b.runs / b.balls) * 100) - ((a.runs / a.balls) * 100)))).slice(0, 10);
        const mostFifties = battingStatistics && battingStatistics.filter((p) => (p.halfCenturies != 0)).sort((a, b) => ((a.halfCenturies == b.halfCenturies) ? (b.runs - a.runs) : (b.halfCenturies - a.halfCenturies))).slice(0, 10);
        const mostHundreds = battingStatistics && battingStatistics.filter((p) => (p.centuries != 0)).sort((a, b) => ((a.centuries == b.centuries) ? (b.runs - a.runs) : (b.centuries - a.centuries))).slice(0, 10);
        const mostFours = battingStatistics && battingStatistics.filter((p) => (p.fours != 0)).sort((a, b) => ((a.fours == b.fours) ? (b.runs - a.runs) : (b.fours - a.fours))).slice(0, 10);
        const mostSixes = battingStatistics && battingStatistics.filter((p) => (p.sixes != 0)).sort((a, b) => ((a.sixes == b.sixes) ? (b.runs - a.runs) : (b.sixes - a.sixes))).slice(0, 10);
        setSquad(squad);
        setTeams(teams);
        setMostRuns(mostRuns);
        setHighestScore(highestScore);
        setBestBattingAverage(bestBattingAverage);
        setBestBattingStrikeRate(bestBattingStrikeRate);
        setMostFifties(mostFifties);
        setMostHundreds(mostHundreds);
        setMostFours(mostFours);
        setMostSixes(mostSixes);
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div>
                <button value="Most Runs" onClick={handleTabChange}>Most Runs</button>
                <button value="Highest Score" onClick={handleTabChange}>Highest Score</button>
                <button value="Best Batting Average" onClick={handleTabChange}>Best Batting Average</button>
                <button value="Best Batting Strike Rate" onClick={handleTabChange}>Best Batting Strike Rate</button>
                <button value="Most Fifties" onClick={handleTabChange}>Most Fifties</button>
                <button value="Most Hundreds" onClick={handleTabChange}>Most Hundreds</button>
                <button value="Most Fours" onClick={handleTabChange}>Most Fours</button>
                <button value="Most Sixes" onClick={handleTabChange}>Most Sixes</button>
            </div>
            <div>
                {tab == "Most Runs" &&
                    ((mostRuns && mostRuns.length != 0) ?
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
                                {mostRuns.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <th>{p.runs}</th>
                                        <td>{(p.dismissed == 0) ? "-" : (p.runs / p.dismissed).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Highest Score" &&
                    ((highestScore && highestScore.length != 0) ?
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
                                {highestScore.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <th>{p.highestScoreRuns}</th>
                                        <td>{p.highestScoreBalls}</td>
                                        <td>{((p.highestScoreRuns / p.highestScoreBalls) * 100).toFixed(2)}</td>
                                        <td>{teams[p.highestScoreOpponentTeamId - 1].shortName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Batting Average" &&
                    ((bestBattingAverage && bestBattingAverage.length != 0) ?
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
                                {bestBattingAverage.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{(p.runs / p.dismissed).toFixed(2)}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Best Batting Strike Rate" &&
                    ((bestBattingStrikeRate && bestBattingStrikeRate.length != 0) ?
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
                                {bestBattingStrikeRate.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{((p.runs / p.balls) * 100).toFixed(2)}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Most Fifties" &&
                    ((mostFifties && mostFifties.length != 0) ?
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
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{p.halfCenturies}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Most Hundreds" &&
                    ((mostHundreds && mostHundreds.length != 0) ?
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
                                {mostHundreds.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{p.centuries}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Most Fours" &&
                    ((mostFours && mostFours.length != 0) ?
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
                                {mostFours.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{p.fours}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
                {tab == "Most Sixes" &&
                    ((mostSixes && mostSixes.length != 0) ?
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
                                {mostSixes.map((p) =>
                                    <tr key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{p.sixes}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table> : <p>No Data Available Currently!</p>)}
            </div>
        </>
    );
}
export default BattingStatistics;