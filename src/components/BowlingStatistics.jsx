import { useState, useEffect } from "react";
function BowlingStatistics() {
    const [status, setStatus] = useState();
    const [tab, setTab] = useState("Most Wickets");
    const [mostWickets, setMostWickets] = useState();
    const [bestBowlingAverage, setBestBowlingAverage] = useState();
    const [bestBowling, setBestBowling] = useState();
    const [mostFiveWicketsHaul, setMostFiveWicketsHaul] = useState();
    const [bestEconomy, setBestEconomy] = useState();
    const [bestBowlingStrikeRate, setBestBowlingStrikeRate] = useState();
    const [squad, setSquad] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Bowling Statistics";
        setStatus(localStorage.getItem("status"));
        const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
        const mostWickets = bowlingStatistics && bowlingStatistics.filter((p) => (p.wickets != 0)).sort((a, b) => ((a.wickets == b.wickets) ? ((a.runs / a.wickets) - (b.runs / b.wickets)) : (b.wickets - a.wickets))).slice(0, 10);
        const bestBowlingAverage = bowlingStatistics && bowlingStatistics.filter((p) => (p.wickets != 0)).sort((a, b) => (((a.runs / a.wickets) == (b.runs / b.wickets)) ? (b.wickets - a.wickets) : ((a.runs / a.wickets) - (b.runs / b.wickets)))).slice(0, 10);
        const bestBowling = bowlingStatistics && bowlingStatistics.filter((p) => (p.bestBowlingWickets != 0)).sort((a, b) => ((a.bestBowlingWickets == b.bestBowlingWickets) ? (a.bestBowlingRuns - b.bestBowlingRuns) : (b.bestBowlingWickets - a.bestBowlingWickets))).slice(0, 10);
        const mostFiveWicketsHaul = bowlingStatistics && bowlingStatistics.filter((p) => (p.fiveWickets != 0)).sort((a, b) => ((a.fiveWickets == b.fiveWickets) ? (b.wickets - a.wickets) : (b.fiveWickets - a.fiveWickets))).slice(0, 10);
        const bestEconomy = bowlingStatistics && bowlingStatistics.filter((p) => (p.balls != 0)).sort((a, b) => ((a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) == (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))) ? (b.wickets - a.wickets) : (a.runs / ((a.balls / 6) + ((a.balls % 6) / 6))) - (b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))))).slice(0, 10);
        const bestBowlingStrikeRate = bowlingStatistics && bowlingStatistics.filter((p) => (p.wickets != 0)).sort((a, b) => ((a.balls / a.wickets) == (b.balls / b.wickets) ? (b.wickets - a.wickets) : ((a.balls / a.wickets) - (b.balls / b.wickets)))).slice(0, 10);
        setMostWickets(mostWickets);
        setBestBowlingAverage(bestBowlingAverage);
        setBestBowling(bestBowling);
        setMostFiveWicketsHaul(mostFiveWicketsHaul);
        setBestEconomy(bestEconomy);
        setBestBowlingStrikeRate(bestBowlingStrikeRate);
        setSquad(JSON.parse(localStorage.getItem("squad")));
        setTeams(JSON.parse(localStorage.getItem("teams")));
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row bg-green border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center p-2 m-0">Bowling Statistics</p>
                <div className="col-12 d-flex overflow-auto sw-none">
                    <button value="Most Wickets" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Wickets") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Wickets</button>
                    <button value="Best Bowling Average" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Bowling Average") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Bowling Average</button>
                    <button value="Best Bowling" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Bowling") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Bowling</button>
                    <button value="Most Five Wickets Haul" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Most Five Wickets Haul") && "border-bottom border-4"}`} onClick={handleTabChange}>Most Five Wickets Haul</button>
                    <button value="Best Economy" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Economy") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Economy</button>
                    <button value="Best Bowling Strike Rate" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Best Bowling Strike Rate") && "border-bottom border-4"}`} onClick={handleTabChange}>Best Bowling Strike Rate</button>
                </div>
            </div>
            {(status) ?
                <div className="row">
                    {(tab == "Most Wickets") &&
                        (((mostWickets) && (mostWickets.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Bowler</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">O</p>
                                    <p className="col-3 text-center m-0">W</p>
                                    <p className="col-3 text-center m-0">Avg</p>
                                </div>
                            </div>
                            {mostWickets.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.wickets}</p>
                                        <p className="col-3 text-center m-0">{(p.runs / p.wickets).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Bowling Average") &&
                        (((bestBowlingAverage) && (bestBowlingAverage.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Bowler</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">O</p>
                                    <p className="col-3 text-center m-0">W</p>
                                    <p className="col-3 text-center m-0">Avg</p>
                                </div>
                            </div>
                            {bestBowlingAverage.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</p>
                                        <p className="col-3 text-center m-0">{p.wickets}</p>
                                        <p className="col-3 fw-bold text-center m-0">{(p.runs / p.wickets).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Bowling") &&
                        (((bestBowling) && (bestBowling.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-7 m-0">Bowler</p>
                                <div className="col-5 d-flex">
                                    <p className="col-6 text-center m-0">Vs</p>
                                    <p className="col-6 text-center m-0">BBI</p>
                                </div>
                            </div>
                            {bestBowling.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-7 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-5 d-flex">
                                        <p className="col-6 text-center m-0">{teams[p.bestBowlingOpponentTeamId - 1].shortName}</p>
                                        <p className="col-6 fw-bold text-center m-0">{p.bestBowlingWickets}-{p.bestBowlingRuns}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Most Five Wickets Haul") &&
                        (((mostFiveWicketsHaul) && (mostFiveWicketsHaul.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Bowler</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">O</p>
                                    <p className="col-3 text-center m-0">W</p>
                                    <p className="col-3 text-center m-0">5Wkts</p>
                                </div>
                            </div>
                            {mostFiveWicketsHaul.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</p>
                                        <p className="col-3 text-center m-0">{p.wickets}</p>
                                        <p className="col-3 fw-bold text-center m-0">{p.fiveWickets}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Economy") &&
                        (((bestEconomy) && (bestEconomy.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Bowler</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">O</p>
                                    <p className="col-3 text-center m-0">W</p>
                                    <p className="col-3 text-center m-0">Eco</p>
                                </div>
                            </div>
                            {bestEconomy.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</p>
                                        <p className="col-3 text-center m-0">{p.wickets}</p>
                                        <p className="col-3 fw-bold text-center m-0">{(p.runs / ((p.balls / 6) + ((p.balls % 6) / 6))).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                    {(tab == "Best Bowling Strike Rate") &&
                        (((bestBowlingStrikeRate) && (bestBowlingStrikeRate.length != 0)) ? <>
                            <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                                <p className="col-5 m-0">Bowler</p>
                                <div className="col-7 d-flex">
                                    <p className="col-3 text-center m-0">M</p>
                                    <p className="col-3 text-center m-0">O</p>
                                    <p className="col-3 text-center m-0">W</p>
                                    <p className="col-3 text-center m-0">SR</p>
                                </div>
                            </div>
                            {bestBowlingStrikeRate.map((p) => (
                                <div key={p.playerId} className="row fs-8 border-bottom px-0 py-2 m-0">
                                    <p className="col-5 fw-semibold text-truncate m-0">{squad[p.playerId - 1].name}</p>
                                    <div className="col-7 d-flex">
                                        <p className="col-3 text-center m-0">{p.matches}</p>
                                        <p className="col-3 text-center m-0">{Math.floor(p.balls / 6) + "." + (p.balls % 6)}</p>
                                        <p className="col-3 text-center m-0">{p.wickets}</p>
                                        <p className="col-3 fw-bold text-center m-0">{(p.balls / p.wickets).toFixed(2)}</p>
                                    </div>
                                </div>))}
                        </> : <p className="fw-semibold p-2">No Data Available Currently!</p>)}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default BowlingStatistics;