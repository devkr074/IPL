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
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const nextMatch = JSON.parse(localStorage.getItem("nextMatch"));
        const runnerUpTeamId = Number(localStorage.getItem("runnerUpTeamId"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        const winnerTeamId = Number(localStorage.getItem("winnerTeamId"));
        setFixture(fixture);
        setNextMatch(nextMatch);
        setRunnerUpTeamId(runnerUpTeamId);
        setTeams(teams);
        setVenues(venues);
        setWinnerTeamId(winnerTeamId);
    }, []);
    useEffect(() => {
        handleMatch();
        setNextMatch(JSON.parse(localStorage.getItem("nextMatch")));
        setWinnerTeamId(Number(localStorage.getItem("winnerTeamId")));
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
            <div>
                <div>
                    <p>IPL - Main Menu</p>
                </div>
                <div className="containerContent">
                    <div className="section">
                        <div className="sectionHeader">
                            <p>{(winnerTeamId) ? "Tournament Result" : "Next Match"}</p>
                        </div>
                        <div className="sectionContent">
                            {(nextMatch) ?
                                <>
                                    <div className="detailsContainer">
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {venues[nextMatch.venueId - 1].city}</span>
                                    </div>
                                    <div className="imageContainer">
                                        <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                                        <span>V/S</span>
                                        <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                                    </div>
                                    <button className="button" onClick={() => handlePlay(nextMatch.matchId)}>Play</button>
                                </> : (winnerTeamId) ?
                                    <>
                                        <div className="detailsContainer">
                                            <span>Winner: {teams[winnerTeamId - 1].name}</span>
                                            <span>Runner Up: {teams[runnerUpTeamId - 1].name}</span>
                                        </div>
                                        <div className="imageContainer">
                                            <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                            <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                                        </div>
                                    </> : <p className="altMessage" >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className="section">
                        <button className="button" onClick={handleFixture}>
                            <span>Fixture</span>
                        </button>
                    </div>
                    <div className="section">
                        <button className="button" onClick={handleSquad}>
                            <span>Squad</span>
                        </button>
                        <button className="button" onClick={handleVenues}>
                            <span>Venues</span>
                        </button>
                    </div>
                    <div className="section">
                        <button className="button" onClick={handlePointsTable}>
                            <span>Points Table</span>
                        </button>
                    </div>
                    <div className="section">
                        <button className="button" onClick={handleBattingStatistics}>
                            <span>Batting Statistics</span>
                        </button>
                    </div>
                    <div className="section">
                        <button className="button" onClick={handleBowlingStatistics}>
                            <span>Bowling Statistics</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainMenu;