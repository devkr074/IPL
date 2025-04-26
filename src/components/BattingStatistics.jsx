import { useState, useEffect } from 'react';
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

            <div className="container">
                <div className="row">
                    <div className="vw-100 d-flex py-2 overflow-auto batting-stats-tab-container">
                        <button className={`btn border border-2 border-dark me-2 ${tabs === 'Most Runs' ? 'btn-dark' : ''}`} onClick={() => setTabs('Most Runs')}>Most Runs</button>
                        <button className={`btn border border-2 border-dark me-2 ${tabs === 'Highest Score' ? 'btn-dark' : ''}`} onClick={() => setTabs('Highest Score')}>Highest Score</button>
                        <button className={`btn border border-2 border-dark me-2 ${tabs === 'Best Batting Average' ? 'btn-dark' : ''}`} onClick={() => setTabs('Best Batting Average')}>Best Batting Average</button>
                        <button className={`btn border border-2 border-dark me-2 ${tabs === 'Best Batting Strike Rate' ? 'btn-dark' : ''}`} onClick={() => setTabs('Best Batting Strike Rate')}>Best Batting Strike Rate</button>
                        <button className={`btn border border-2 border-dark me-2 ${tabs === 'Most Fours' ? 'btn-dark' : ''}`} onClick={() => setTabs('Most Fours')}>Most Fours</button>
                    </div>
                </div>
                <div className="row">
                    {tabs == "Most Runs" &&
                            <table className='table p-0'>
                                <thead className='table-dark'>
                                    <tr className=''>
                                        <th className='col-8'>Batter</th>
                                        <th className='col-1'>M</th>
                                        <th className='col-1'>I</th>
                                        <th className='col-1'>R</th>
                                        <th className='col-1'>Avg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostRuns && mostRuns.map((p) =>
                                        <tr key={p.playerId}>
                                            <th className='text-truncate'>{squad[p.playerId - 1].name}</th>
                                            <td>{p.matches}</td>
                                            <td>{p.innings}</td>
                                            <th>{p.runs}</th>
                                            <td>{((p.runs / (p.innings - p.notOut)) == "Infinity") ? "-" : (p.runs / (p.innings - p.notOut)).toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    }
                    {tabs == "Highest Score" &&
                        <div className="col-12">
                            <table className='table p-0'>
                                <thead className='table-dark'>
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
                                        <tr className="data" key={p.playerId}>
                                            <th className='text-truncate'>{squad[p.playerId - 1].name}</th>
                                            <th>{p.highestScoreRuns}</th>
                                            <td>{p.highestScoreBalls}</td>
                                            <td>{((p.highestScoreRuns / p.highestScoreBalls) * 100).toFixed(2)}</td>
                                            <td>{teams[p.highestScoreOpponentTeamId - 1].shortName}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>}
                    {tabs == "Best Batting Average" &&
                        <table className='table table-striped'>
                            <thead className='table-info'>
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
                                    <tr className="data" key={p.playerId}>
                                        <th>{squad[p.playerId - 1].name}</th>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{(p.runs / (p.innings - p.notOut)).toFixed(2)}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    {tabs == "Best Batting Strike Rate" &&
                        <table className='table table-striped'>
                            <thead className='table-info'>
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
                                    <tr className="data" key={p.playerId}>
                                        <th>{squad[p.playerId - 1].name}</th>
                                        <td>{p.matches}</td>
                                        <td>{p.innings}</td>
                                        <td>{p.runs}</td>
                                        <th>{((p.runs / p.balls) * 100).toFixed(2)}</th>
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
                                    <tr className="data" key={p.playerId}>
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
                        ((mostHundreds == null) ? <table>
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
                                    <tr className="data" key={p.playerId}>
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
                                    <tr className="data" key={p.playerId}>
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
                                    <tr className="data" key={p.playerId}>
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