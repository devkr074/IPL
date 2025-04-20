import { useState, useEffect } from 'react';
import style from "./BowlingStatistics.module.css"
function BowlingStatistics() {
    const [tabs, setTabs] = useState("Most Wickets");
    const [mostWickets, setMostWickets] = useState();
    const [bestBowlingAverage, setBestBowlingAverage] = useState();
    const [bestBowling, setBestBowling] = useState();
    const [mostFifties, setMostFifties] = useState();
    const [mostHundreds, setMostHundreds] = useState();
    const [mostFours, setMostFours] = useState();
    const [mostSixes, setMostSixes] = useState();
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
        // const bestBattingStrikeRate = battingStatistics.filter(p => p.innings != 0).sort((a, b) => ((a.runs / a.balls) * 100) == ((b.runs / b.balls) * 100) ? b.runs - a.runs : ((b.runs / b.balls) * 100) - ((a.runs / a.balls) * 100)).slice(0, 10);
        // setBestBattingStrikeRate(bestBattingStrikeRate);
        // const mostFifties = battingStatistics.filter(p => p.halfCenturies != 0).sort((a, b) => a.halfCenturies == b.halfCenturies ? b.runs - a.runs : b.halfCenturies - a.halfCenturies).slice(0, 10);
        // setMostFifties(mostFifties);
        // const mostHundreds = battingStatistics.filter(p => p.centuries != 0).sort((a, b) => a.centuries == b.centuries ? b.runs - a.runs : b.centuries - a.centuries).slice(0, 10);
        // setMostHundreds(mostHundreds);
        // const mostFours = battingStatistics.filter(p => p.fours != 0).sort((a, b) => a.fours == b.fours ? b.runs - a.runs : b.fours - a.fours).slice(0, 10);
        // setMostFours(mostFours);
        // const mostSixes = battingStatistics.filter(p => p.sixes != 0).sort((a, b) => a.sixes == b.sixes ? b.runs - a.runs : b.sixes - a.sixes).slice(0, 10);
        // setMostSixes(mostSixes);
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
                            <option value="Best Batting Strike Rate">Best Batting Strike Rate</option>
                            <option value="Most Fifties">Most Fifties</option>
                            <option value="Most Hundreds">Most Hundreds</option>
                            <option value="Most Fours">Most Fours</option>
                            <option value="Most Sixes">Most Sixes</option>
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
                                        <td>{teams[p.bestBowlingOpponentTeamId-1].shortName}</td>
                                        <td>{p.bestBowlingWickets}-{p.bestBowlingRuns}</td>
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
                                {mostHundreds && mostHundreds.map((p) =>
                                    <tr className={style.data} key={p.playerId}>
                                        <td>{squad[p.playerId - 1].name}</td>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <td>{p.centuries}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
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
                </div>
            </div>
        </>
    );
}
export default BowlingStatistics;