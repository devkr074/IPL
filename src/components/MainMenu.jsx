import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleMatch from "../utils/handleMatch.js";
function MainMenu() {
    const [status, setStatus] = useState();
    const [nextMatch, setNextMatch] = useState();
    const [winnerTeamId, setWinnerTeamId] = useState();
    const [runnerUpTeamId, setRunnerUpTeamId] = useState();
    const [fixture, setFixture] = useState();
    const [venues, setVenues] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        setStatus(localStorage.getItem("status"));
        setFixture(JSON.parse(localStorage.getItem("fixture")));
        setVenues(JSON.parse(localStorage.getItem("venues")));
        setTeams(JSON.parse(localStorage.getItem("teams")));
    }, []);
    useEffect(() => {
        if (status) {
            handleMatch();
            setNextMatch(JSON.parse(localStorage.getItem("nextMatch")));
            setWinnerTeamId(Number(localStorage.getItem("winnerTeamId")));
            setRunnerUpTeamId(Number(localStorage.getItem("runnerUpTeamId")));
        }
    }, [fixture]);
    const navigate = useNavigate();
    function handlePlay(matchId) {
        if (fixture[matchId - 1].tossStatus != "Completed") {
            navigate(`/toss/${matchId}`);
        }
        else {
            navigate(`/match/${matchId}`);
        }
    }
    function handleFixture() {
        navigate("/fixture");
    }
    function handlePointsTable() {
        navigate("/points-table");
    }
    function handleBattingStatistics() {
        navigate("/batting-statistics");
    }
    function handleBowlingStatistics() {
        navigate("/bowling-statistics");
    }
    function handleSquad() {
        navigate("/squad");
    }
    function handleVenues() {
        navigate("/venues");
    }
    return (
        <>
            <div className="row border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Main Menu</p>
            </div>
            {(status) ?
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <p className="col-12 fw-semibold text-light bg-green p-2 rounded-top m-0">{(winnerTeamId) ? "Tournament Result" : "Next Match"}</p>
                        {(nextMatch) ?
                            <>
                                <div className="col-12 d-flex justify-content-between bg-gray p-2">
                                    <p className="m-0">{(nextMatch.matchId == 71) ? "Qualifier 1" : (nextMatch.matchId == 72) ? "Eliminator" : (nextMatch.matchId == 73) ? "Qualifier 2" : (nextMatch.matchId == 74) ? "Final" : `Match #${nextMatch.matchId}`}</p>
                                    <p className="m-0">Venue: {venues[nextMatch.venueId - 1].city}</p>
                                </div>
                                <div className="col-12 d-flex align-items-center bg-body-tertiary rounded-bottom p-2">
                                    <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} className="col-5" />
                                    <p className="col-2 fs-5 fw-semibold text-center m-0">v/s</p>
                                    <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} className="col-5" />
                                </div>
                                <button className="col-12 btn-green fs-5 fw-semibold py-1 rounded-0 rounded-bottom" onClick={() => handlePlay(nextMatch.matchId)}>Play</button>
                            </> : (winnerTeamId) ?
                                <>
                                    <div className="col-12 d-flex justify-content-between bg-gray p-2">
                                        <p className="m-0">Winner: {teams[winnerTeamId - 1].shortName}</p>
                                        <p className="m-0">Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between bg-body-tertiary p-2 rounded-bottom">
                                        <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} className="col-4" />
                                        <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} className="col-4" />
                                    </div>
                                </> : <p className="fw-semibold bg-body-tertiary p-2 rounded-bottom">No Data Available Currently!</p>}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column gap-3 p-2">
                        <button className="btn-green h-100 fs-5 fw-semibold p-3" onClick={handleFixture}>Fixture</button>
                        <button className="btn-green h-100 fs-5 fw-semibold p-3" onClick={handlePointsTable}>Points Table</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="btn-green w-100 fs-5 fw-semibold p-3" onClick={handleBattingStatistics}>Batting Statistics</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="btn-green w-100 fs-5 fw-semibold p-3" onClick={handleBowlingStatistics}>Bowling Statistics</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="btn-green w-100 fs-5 fw-semibold p-3" onClick={handleSquad}>Squad</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="btn-green w-100 fs-5 fw-semibold p-3" onClick={handleVenues}>Venues</button>
                    </div>
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default MainMenu;