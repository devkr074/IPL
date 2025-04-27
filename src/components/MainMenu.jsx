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
        const runnerUpTeamId = Number(localStorage.getItem("runnerUpTeamId"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(fixture);
        setRunnerUpTeamId(runnerUpTeamId);
        setTeams(teams);
        setVenues(venues);
    }, []);
    useEffect(() => {
        handleMatch();
        const nextMatch = JSON.parse(localStorage.getItem("nextMatch"));
        const winnerTeamId = Number(localStorage.getItem("winnerTeamId"));
        setNextMatch(nextMatch);
        setWinnerTeamId(winnerTeamId);
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
                <p>IPL - Main Menu</p>
            </div>
            <div>
                <div>
                    <p>{winnerTeamId ? "Tournament Result" : "Next Match"}</p>
                    {nextMatch ?
                        <>
                            <p>{nextMatch.matchId == 71 ? "Qualifier 1" : nextMatch.matchId == 72 ? "Eliminator" : nextMatch.matchId == 73 ? "Qualifier 2" : nextMatch.matchId == 74 ? "Final" : "Match #" + nextMatch.matchId}</p>
                            <p>Venue: {venues[nextMatch.venueId - 1].city}</p>
                            <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                            <p>v/s</p>
                            <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                            <button onClick={() => handlePlay(nextMatch.matchId)}>Play</button>
                        </> : winnerTeamId ?
                            <>
                                <p>Winner: {teams[winnerTeamId - 1].shortName}</p>
                                <p>Runner Up: {teams[runnerUpTeamId - 1].shortName}</p>
                                <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                            </> : <p>No Data Available Currently!</p>}
                </div>
                <div>
                    <button onClick={handleFixture}>Fixture</button>
                </div>
                <div>
                    <button onClick={handleSquad}>Squad</button>
                </div>
                <div>
                    <button onClick={handleVenues}>Venues</button>
                </div>
                <div>
                    <button onClick={handlePointsTable}>Points Table</button>
                </div>
                <div>
                    <button onClick={handleBattingStatistics}>Batting Statistics</button>
                </div>
                <div>
                    <button onClick={handleBowlingStatistics}>Bowling Statistics</button>
                </div>
            </div>
        </>
    );
}
export default MainMenu;