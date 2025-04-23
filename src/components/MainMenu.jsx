import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import handleMatch from "../../utils/handleMatch.js";
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
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Main Menu</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>{(nextMatch) ? "Next Match" : "Tournament Result"}</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(nextMatch) ?
                                <>
                                    <div className={style.detailsContainer}>
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {venues[nextMatch.venueId - 1].city}</span>
                                    </div>
                                    <div className={style.imageContainer}>
                                        <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].name} title={teams[nextMatch.homeTeamId - 1].name} />
                                        <span>V/S</span>
                                        <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].name} title={teams[nextMatch.awayTeamId - 1].name} />
                                    </div>
                                    <button className={style.button} onClick={() => handlePlay(nextMatch.matchId)}>Play</button>
                                </> : (winnerTeamId) ?
                                    <>
                                        <div className={style.detailsContainer}>
                                            <span>Winner: {teams[winnerTeamId - 1].name}</span>
                                            <span>Runner Up: {teams[runnerUpTeamId - 1].name}</span>
                                        </div>
                                        <div className={style.imageContainer}>
                                            <img src={teams[winnerTeamId - 1].logo} alt={teams[winnerTeamId - 1].name} title={teams[winnerTeamId - 1].name} />
                                            <img src={teams[runnerUpTeamId - 1].logo} alt={teams[runnerUpTeamId - 1].name} title={teams[runnerUpTeamId - 1].name} />
                                        </div>
                                    </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleFixture}>
                            <span>Fixture</span>
                        </button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleSquad}>
                            <span>Squad</span>
                        </button>
                        <button className={style.button} onClick={handleVenues}>
                            <span>Venues</span>
                        </button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handlePointsTable}>
                            <span>Points Table</span>
                        </button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBattingStatistics}>
                            <span>Batting Statistics</span>
                        </button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBowlingStatistics}>
                            <span>Bowling Statistics</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainMenu;