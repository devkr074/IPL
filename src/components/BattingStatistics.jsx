import { useState, useEffect } from "react";
function BattingStatistics() {
    const [status, setStatus] = useState();
    const [tab, setTab] = useState("Most Runs");
    const [mostRuns, setMostRuns] = useState();
    const [highestScore, setHighestScore] = useState();
    const [bestBattingAverage, setBestBattingAverage] = useState();
    const [bestBattingStrikeRate, setBestBattingStrikeRate] = useState();
    const [mostHundreds, setMostHundreds] = useState();
    const [mostFifties, setMostFifties] = useState();
    const [mostFours, setMostFours] = useState();
    const [mostSixes, setMostSixes] = useState();
    const [squad, setSquad] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Batting Statistics";
        setStatus(localStorage.getItem("status"));
        const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
        const mostRuns = battingStatistics && battingStatistics.filter((p) => (p.runs != 0)).sort((a, b) => ((a.runs == b.runs) ? ((b.runs / b.dismissed) - (a.runs / a.dismissed)) : (b.runs - a.runs))).slice(0, 10);
        const highestScore = battingStatistics && battingStatistics.filter((p) => (p.highestScoreRuns != 0)).sort((a, b) => ((a.highestScoreRuns == b.highestScoreRuns) ? (a.highestScoreBalls - b.highestScoreBalls) : (b.highestScoreRuns - a.highestScoreRuns))).slice(0, 10);
        const bestBattingAverage = battingStatistics && battingStatistics.filter((p) => (p.dismissed != 0)).sort((a, b) => (((a.runs / a.dismissed) == (b.runs / b.dismissed)) ? (b.runs - a.runs) : ((b.runs / b.dismissed) - (a.runs / a.dismissed)))).slice(0, 10);
        const bestBattingStrikeRate = battingStatistics && battingStatistics.filter((p) => (p.runs != 0)).sort((a, b) => ((((a.runs / a.balls) * 100) == ((b.runs / b.balls) * 100)) ? (b.runs - a.runs) : (((b.runs / b.balls) * 100) - ((a.runs / a.balls) * 100)))).slice(0, 10);
        const mostHundreds = battingStatistics && battingStatistics.filter((p) => (p.centuries != 0)).sort((a, b) => ((a.centuries == b.centuries) ? (b.runs - a.runs) : (b.centuries - a.centuries))).slice(0, 10);
        const mostFifties = battingStatistics && battingStatistics.filter((p) => (p.halfCenturies != 0)).sort((a, b) => ((a.halfCenturies == b.halfCenturies) ? (b.runs - a.runs) : (b.halfCenturies - a.halfCenturies))).slice(0, 10);
        const mostFours = battingStatistics && battingStatistics.filter((p) => (p.fours != 0)).sort((a, b) => ((a.fours == b.fours) ? (b.runs - a.runs) : (b.fours - a.fours))).slice(0, 10);
        const mostSixes = battingStatistics && battingStatistics.filter((p) => (p.sixes != 0)).sort((a, b) => ((a.sixes == b.sixes) ? (b.runs - a.runs) : (b.sixes - a.sixes))).slice(0, 10);
        setMostRuns(mostRuns);
        setHighestScore(highestScore);
        setBestBattingAverage(bestBattingAverage);
        setBestBattingStrikeRate(bestBattingStrikeRate);
        setMostHundreds(mostHundreds);
        setMostFifties(mostFifties);
        setMostFours(mostFours);
        setMostSixes(mostSixes);
        setSquad(JSON.parse(localStorage.getItem("squad")));
        setTeams(JSON.parse(localStorage.getItem("teams")));
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row bg-green border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center p-2 m-0">Batting Statistics</p>
                <div className="col-12 d-flex overflow-auto sw-none">
                    <button value="Most Runs" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Runs") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Runs</button>
                    <button value="Highest Score" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Highest Score") && "border-bottom border-4"}`} onClick={handleTabChange}>Highest Score</button>
                    <button value="Best Batting Average" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Batting Average") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Batting Average</button>
                    <button value="Best Batting Strike Rate" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Batting Strike Rate") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Batting Strike Rate</button>
                    <button value="Most Hundreds" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Hundreds") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Hundreds</button>
                    <button value="Most Fifties" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Fifties") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Fifties</button>
                    <button value="Most Fours" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Fours") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Fours</button>
                    <button value="Most Sixes" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Sixes") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Sixes</button>
                </div>
            </div>
            {(status) ?
                <div className="row">
                    {(tab == "Most Runs") &&
                        (((mostRuns) && (mostRuns.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">Avg</p>
                                </div>
                            </div>
                            {mostRuns.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.runs}</p>
                                        <p className="col-3 text-center m-0">{(p.dismissed == 0) ? "-" : (p.runs / p.dismissed).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Highest Score") &&
                        (((highestScore) && (highestScore.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">HS</p>
                                    <p className="col-3 text-center m-0">Balls</p>
                                    <p className="col-3 text-center m-0">SR</p>
                                    <p className="col-3 text-center m-0">Vs</p>
                                </div>
                            </div>
                            {highestScore.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 fw-bold text-center m-0">{p.highestScoreRuns}</p>
                                        <p className="col-3 text-center m-0">{p.highestScoreBalls}</p>
                                        <p className="col-3 text-center m-0">{((p.highestScoreRuns / p.highestScoreBalls) * 100).toFixed(2)}</p>
                                        <p className="col-3 text-center m-0">{teams[p.highestScoreOpponentTeamId - 1].shortName}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Batting Average") &&
                        (((bestBattingAverage) && (bestBattingAverage.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">Avg</p>
                                </div>
                            </div>
                            {bestBattingAverage.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{(p.dismissed == 0) ? "-" : (p.runs / p.dismissed).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Batting Strike Rate") &&
                        (((bestBattingStrikeRate) && (bestBattingStrikeRate.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">SR</p>
                                </div>
                            </div>
                            {bestBattingStrikeRate.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{((p.runs / p.balls) * 100).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Most Hundreds") &&
                        (((mostHundreds) && (mostHundreds.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">100s</p>
                                </div>
                            </div>
                            {mostHundreds.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.centuries}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Most Fifties") &&
                        (((mostFifties) && (mostFifties.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">50s</p>
                                </div>
                            </div>
                            {mostFifties.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.halfCenturies}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Most Fours") &&
                        (((mostFours) && (mostFours.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">4s</p>
                                </div>
                            </div>
                            {mostFours.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.fours}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Most Sixes") &&
                        (((mostSixes) && (mostSixes.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Batter</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">I</p>
                                    <p className="col-3 text-center m-0">R</p>
                                    <p className="col-3 text-center m-0">6s</p>
                                </div>
                            </div>
                            {mostSixes.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{p.innings}</p>
                                        <p className="col-3 text-center m-0">{p.runs}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.sixes}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>
            }
        </>
    );
}
export default BattingStatistics;