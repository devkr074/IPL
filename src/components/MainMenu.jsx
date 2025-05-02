import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleMatch from "../utils/handleMatch.js";
function MainMenu() {
    const [fixture, setFixture] = useState();
    const [nextMatch, setNextMatch] = useState();
    const [runnerUpTeamId, setRunnerUpTeamId] = useState();
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    const [winnerTeamId, setWinnerTeamId] = useState();
    const [gameStatus, setGameStatus] = useState();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setGameStatus(localStorage.getItem("status"));
        setFixture(fixture);
        setTeams(teams);
        setVenues(venues);
    }, []);
    useEffect(() => {
        if (gameStatus) {
            handleMatch();
            const nextMatch = JSON.parse(localStorage.getItem("nextMatch"));
            const runnerUpTeamId = Number(localStorage.getItem("runnerUpTeamId"));
            const winnerTeamId = Number(localStorage.getItem("winnerTeamId"));
            setNextMatch(nextMatch);
            setRunnerUpTeamId(runnerUpTeamId);
            setWinnerTeamId(winnerTeamId);
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
    function handleSquad() {
        navigate("/squad");
    }
    function handleVenues() {
        navigate("/venues");
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
    return (
        <>
            <div className="row sticky-top shadow">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Main Menu</p>
            </div>
            {gameStatus ?
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">{winnerTeamId ? "Tournament Result" : "Next Match"}</p>
                        {nextMatch ?
                            <>
                                <div className="col-12 p-2 d-flex justify-content-between bg-gray">
                                    <p className="m-0">{nextMatch.matchId == 71 ? "Qualifier 1" : nextMatch.matchId == 72 ? "Eliminator" : nextMatch.matchId == 73 ? "Qualifier 2" : nextMatch.matchId == 74 ? "Final" : "Match #" + nextMatch.matchId}</p>
                                    <p className="m-0">Venue: {venues[nextMatch.venueId - 1].city}</p>
                                </div>
                                <div className="col-12 p-2 d-flex bg-body-tertiary align-items-center">
                                    <img className="col-5" src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                                    <p className="col-2 m-0 text-center fs-5 fw-semibold">v/s</p>
                                    <img className="col-5" src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                                </div>
                                <button className="fs-5 fw-semibold text-light btn btn-green col-12 rounded-0 rounded-bottom" onClick={() => handlePlay(nextMatch.matchId)}>Play</button>
                            </> : winnerTeamId ?
                                <>
                                    <div className="col-12 p-2 d-flex justify-content-between bg-gray">
                                        <p className="m-0">Winner: {teams[winnerTeamId - 1].shortName}</p>
                                        <p className="m-0">Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                    </div>
                                    <div className="col-12 p-2 d-flex bg-body-tertiary justify-content-between align-items-center">
                                        <img className="col-4" src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                        <img className="col-4" src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                                    </div>
                                </> : <p className="bg-body-tertiary fw-semibold p-2 rounded-bottom">No Data Available Currently!</p>}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2 d-flex flex-column gap-3">
                        <button className="h-100 w-100 btn btn-green text-light fs-5 fw-semibold p-3" onClick={handleFixture}>Fixture</button>
                        <button className="h-100 btn btn-green text-light fs-5 fw-semibold p-3" onClick={handlePointsTable}>Points Table</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="w-100 p-3 btn btn-green text-light fs-5 fw-semibold" onClick={handleBattingStatistics}>Batting Statistics</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="w-100 p-3 btn btn-green text-light fs-5 fw-semibold" onClick={handleBowlingStatistics}>Bowling Statistics</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="w-100 p-3 btn btn-green text-light fs-5 fw-semibold" onClick={handleSquad}>Squad</button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 p-2">
                        <button className="w-100 p-3 btn btn-green text-light fs-5 fw-semibold" onClick={handleVenues}>Venues</button>
                    </div>
                </div> : <p>Tournament not started first select team</p>}
        </>
    );
}
export default MainMenu;