import { useState, useEffect } from 'react';
function BattingStatistics() {
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Most Runs");
    const [teams, setTeams] = useState();
    const [mostRuns, setMostRuns] = useState();
    const [highestScore, setHighestScore] = useState();
    const [bestBattingAverage, setBestBattingAverage] = useState();
    const [bestBattingStrikeRate, setBestBattingStrikeRate] = useState();
    const [mostHundreds, setMostHundreds] = useState();
    const [mostFifties, setMostFifties] = useState();
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
        const mostHundreds = battingStatistics && battingStatistics.filter((p) => (p.centuries != 0)).sort((a, b) => ((a.centuries == b.centuries) ? (b.runs - a.runs) : (b.centuries - a.centuries))).slice(0, 10);
        const mostFifties = battingStatistics && battingStatistics.filter((p) => (p.halfCenturies != 0)).sort((a, b) => ((a.halfCenturies == b.halfCenturies) ? (b.runs - a.runs) : (b.halfCenturies - a.halfCenturies))).slice(0, 10);
        const mostFours = battingStatistics && battingStatistics.filter((p) => (p.fours != 0)).sort((a, b) => ((a.fours == b.fours) ? (b.runs - a.runs) : (b.fours - a.fours))).slice(0, 10);
        const mostSixes = battingStatistics && battingStatistics.filter((p) => (p.sixes != 0)).sort((a, b) => ((a.sixes == b.sixes) ? (b.runs - a.runs) : (b.sixes - a.sixes))).slice(0, 10);
        setSquad(squad);
        setTeams(teams);
        setMostRuns(mostRuns);
        setHighestScore(highestScore);
        setBestBattingAverage(bestBattingAverage);
        setBestBattingStrikeRate(bestBattingStrikeRate);
        setMostHundreds(mostHundreds);
        setMostFifties(mostFifties);
        setMostFours(mostFours);
        setMostSixes(mostSixes);
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row p-0 sticky-top" style={{ backgroundColor: "#009270" }}>
                <p className="col-12 text-light fs-5 fw-bolder m-0 sticky-top p-2 text-center">Batting Statistics</p>
                <div className='col-12 overflow-auto d-flex' style={{ scrollbarWidth: "none" }}>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Most Runs" ? "border-bottom border-4 " : ""}`} value="Most Runs" onClick={handleTabChange}>Most Runs</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Highest Score" ? "border-bottom border-4 " : ""}`} value="Highest Score" onClick={handleTabChange}>Highest Score</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Best Batting Average" ? "border-bottom border-4 " : ""}`} value="Best Batting Average" onClick={handleTabChange}>Best Batting Average</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Best Batting Strike Rate" ? "border-bottom border-4 " : ""}`} value="Best Batting Strike Rate" onClick={handleTabChange}>Best Batting Strike Rate</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Most Hundreds" ? "border-bottom border-4 " : ""}`} value="Most Hundreds" onClick={handleTabChange}>Most Hundreds</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Most Fifties" ? "border-bottom border-4 " : ""}`} value="Most Fifties" onClick={handleTabChange}>Most Fifties</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Most Fours" ? "border-bottom border-4 " : ""}`} value="Most Fours" onClick={handleTabChange}>Most Fours</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab === "Most Sixes" ? "border-bottom border-4 " : ""}`} value="Most Sixes" onClick={handleTabChange}>Most Sixes</button>
                </div>
            </div>
            <div className='row p-0'>
                {tab == "Most Runs" &&
                    ((mostRuns && mostRuns.length != 0) ? <>
                        <div className="row m-0 p-0 py-2 px-2 fw-bold bg-gray">
                            <p className='col-5 m-0 p-0'>Batter</p>
                            <div className="col-7 m-0 p-0 d-flex">
                                <p className='col-3 text-center m-0 p-0'>M</p>
                                <p className='col-2 text-center m-0 p-0'>I</p>
                                <p className='col-3 text-center m-0 p-0'>R</p>
                                <p className='col-4 text-center m-0 p-0'>Avg</p>
                            </div>
                        </div>
                        {mostRuns.map((p) =>
                            <div className="row m-0 p-0 py-2 px-2 border-bottom border-2">
                                <p className='col-5 fw-semibold m-0 p-0 text-truncate'>{squad[p.playerId - 1].name}</p>
                                <div className="col-7 m-0 p-0 d-flex">
                                    <p className='col-3 p-0 text-center m-0'>{p.matches}</p>
                                    <p className='col-2 p-0 text-center m-0'>{p.innings}</p>
                                    <p className='col-3 text-center fw-bold p-0 m-0'>{p.runs}</p>
                                    <p className='col-4 text-center p-0 m-0'>{(p.dismissed == 0) ? "-" : (p.runs / p.dismissed).toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                    </> : <p>No Data Available Currently!</p>)}
                {tab == "Highest Score" &&
                    ((highestScore && highestScore.length != 0) ? <>
                        <div className="row m-0 p-0 py-2 px-2 fw-bold bg-gray">
                            <p className='col-5 m-0 p-0'>Batter</p>
                            <div className="col-7 m-0 p-0 d-flex">
                                <p className='col-3 text-center m-0 p-0'>R</p>
                                <p className='col-2 text-center m-0 p-0'>B</p>
                                <p className='col-4 text-center m-0 p-0'>SR</p>
                                <p className='col-3 text-center m-0 p-0'>Vs</p>
                            </div>
                        </div>
                        {highestScore.map((p) =>
                            <div className="row m-0 p-0 py-2 px-2 border-bottom border-2">
                                <p className='col-5 fw-semibold m-0 p-0 text-truncate'>{squad[p.playerId - 1].name}</p>
                                <div className="col-7 m-0 p-0 d-flex">
                                    <p className='col-3 p-0 text-center fw-bold m-0'>{p.highestScoreRuns}</p>
                                    <p className='col-2 p-0 text-center m-0'>{p.highestScoreBalls}</p>
                                    <p className='col-4 text-center p-0 m-0'>{((p.highestScoreRuns / p.highestScoreBalls) * 100).toFixed(2)}</p>
                                    <p className='col-3 text-center p-0 m-0'>{teams[p.highestScoreOpponentTeamId - 1].shortName}</p>
                                </div>
                            </div>
                        )}
                    </> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Best Batting Average" &&
                    ((bestBattingAverage && bestBattingAverage.length != 0) ? <>
                        <div className="row m-0 p-0 py-2 px-2 fw-bold bg-gray">
                            <p className='col-5 m-0 p-0'>Batter</p>
                            <div className="col-7 m-0 p-0 d-flex">
                                <p className='col-3 text-center m-0 p-0'>M</p>
                                <p className='col-2 text-center m-0 p-0'>I</p>
                                <p className='col-3 text-center m-0 p-0'>R</p>
                                <p className='col-4 text-center m-0 p-0'>Avg</p>
                            </div>
                        </div>
                        {bestBattingAverage.map((p) =>
                            <div className="row m-0 p-0 py-2 px-2 border-bottom border-2">
                                <p className='col-5 fw-semibold m-0 p-0 text-truncate'>{squad[p.playerId - 1].name}</p>
                                <div className="col-7 m-0 p-0 d-flex">
                                    <p className='col-3 p-0 text-center m-0'>{p.matches}</p>
                                    <p className='col-2 p-0 text-center m-0'>{p.innings}</p>
                                    <p className='col-3 text-center p-0 m-0'>{p.runs}</p>
                                    <p className='col-4 fw-bold text-center p-0 m-0'>{(p.dismissed == 0) ? "-" : (p.runs / p.dismissed).toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                    </> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Best Batting Strike Rate" &&
                    ((bestBattingStrikeRate && bestBattingStrikeRate.length != 0) ?
                        <table className='table'>
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
                        </table> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Most Hundreds" &&
                    ((mostHundreds && mostHundreds.length != 0) ?
                        <table className='table'>
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
                        </table> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Most Fifties" &&
                    ((mostFifties && mostFifties.length != 0) ?
                        <table className='table'>
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
                        </table> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Most Fours" &&
                    ((mostFours && mostFours.length != 0) ?
                        <table className='table'>
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
                        </table> : <p>No Data Available Currently!</p>)
                }
                {
                    tab == "Most Sixes" &&
                    ((mostSixes && mostSixes.length != 0) ?
                        <table className='table'>
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
                        </table> : <p>No Data Available Currently!</p>)
                }
            </div >
        </>
    );
}
export default BattingStatistics;