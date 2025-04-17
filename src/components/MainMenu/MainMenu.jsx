import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import setMatchData from "../../utils/setMatchData.js";
import simulateInning from "../../utils/simulateInning.js";
import simulateSuperOverInning from "../../utils/simulateSuperOverInning.js";
function MainMenu() {
    const [nextMatch, setNextMatch] = useState(null);
    const [winner, setWinner] = useState(null);
    const [runnerUp, setRunnerUp] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [fixture, setFixture] = useState([]);
    const [venues, setVenues] = useState([]);
    const [teams, setTeams] = useState([]);
    const [pointsTable, setPointsTable] = useState([]);
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const nextMatch = JSON.parse(localStorage.getItem("nextMatchId"));
        const winner = Number(localStorage.getItem("winnerTeamId"));
        const runnerUp = Number(localStorage.getItem("runnerUpTeamId"));
        const userTeamId = Number(localStorage.getItem('userTeamId'));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        setNextMatch(nextMatch);
        setWinner(winner);
        setRunnerUp(runnerUp);
        setUserTeamId(userTeamId);
        setFixture(fixture);
        setVenues(venues);
        setTeams(teams);
        setPointsTable(pointsTable);
    }, []);
    useEffect(() => {
        simulateOtherMatches();
    }, [fixture]);
    const navigate = useNavigate();
    function simulateOtherMatches() {
        for (let i = 0; i < fixture.length; i++) {
            const match = fixture[i];
            const tossStatus = match.tossStatus;
            const matchStatus = match.matchStatus;
            if (tossStatus != "completed" || matchStatus != "completed") {
                if (isUserMatch(match)) {
                    localStorage.setItem("nextMatchId", JSON.stringify(match));
                    break;
                }
                else {
                    const tossCall = getTossCall();
                    const tossOutcome = getTossOutcome();
                    const optionOutcome = getOptionOutcome();
                    match.tossStatus = "completed";
                    if (tossCall === tossOutcome) {
                        match.tossResult = `${teams[match.awayTeamId - 1].teamShortName} elected to ${optionOutcome} first`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.awayTeamId, match.homeTeamId, match);
                            simulateInning(1, match.matchId);
                            const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
                            if (matchData.inning1.runs === matchData.inning2.runs) {
                                simulateSuperOverInning(1, match.matchId);
                            }
                            saveResult(match.matchId);
                        } else {
                            setMatchData(match.homeTeamId, match.awayTeamId, match);
                            simulateInning(1, match.matchId);
                            const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
                            if (matchData.inning1.runs === matchData.inning2.runs) {
                                simulateSuperOverInning(1, match.matchId);
                            }
                            saveResult(match.matchId);
                        }
                    } else {
                        match.tossResult = `${teams[match.homeTeamId - 1].teamShortName} elected to ${optionOutcome} first`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.homeTeamId, match.awayTeamId, match);
                            simulateInning(1, match.matchId);
                            const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
                            if (matchData.inning1.runs === matchData.inning2.runs) {
                                simulateSuperOverInning(1, match.matchId);
                            }
                            saveResult(match.matchId);
                        } else {
                            setMatchData(match.awayTeamId, match.homeTeamId, match);
                            simulateInning(1, match.matchId);
                            const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
                            if (matchData.inning1.runs === matchData.inning2.runs) {
                                simulateSuperOverInning(1, match.matchId);
                            }
                            saveResult(match.matchId);
                        }
                    }
                }
            }
        }
    }
    function isUserMatch(match) {
        return ((match.homeTeamId === userTeamId) || (match.awayTeamId === userTeamId));
    }
    function getTossCall() {
        return (Math.random() < 0.5) ? "Heads" : "Tails"
    }
    function getTossOutcome() {
        return (Math.random() < 0.5) ? "Heads" : "Tails";
    }
    function getOptionOutcome() {
        return (Math.random() < 0.5) ? "Bat" : "Bowl";
    }
    function updateStatistics(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || [];
        const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
        const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
        const players = [];
        function updatePlayerPoints(playerId, points) {
            const existingPlayer = players.find(p => p.playerId === playerId);
            if (existingPlayer) {
                existingPlayer.points += points;
            } else {
                players.push({
                    playerId: playerId,
                    points: points
                });
            }
        }
        for (let i = 0; i < matchData.inning1Batsman.length; i++) {
            updatePlayerPoints(
                matchData.inning1Batsman[i].playerId,
                matchData.inning1Batsman[i].points
            );
            const playerIndex = battingStatistics.findIndex(p => p.playerId === matchData.inning1Batsman[i].playerId);
            if (playerIndex != -1) {
                if (matchData.inning1Batsman[i].runs >= 50 && matchData.inning1Batsman[i].runs < 100) {
                    battingStatistics[playerIndex].halfCenturies++;
                }
                else if (matchData.inning1Batsman[i].runs >= 100) {
                    battingStatistics[playerIndex].centuries++;
                }
                if (battingStatistics[playerIndex].innings == 1) {
                    battingStatistics[playerIndex].highestScoreRuns = matchData.inning1Batsman[i].runs;
                    battingStatistics[playerIndex].highestScoreBalls = matchData.inning1Batsman[i].balls;
                    battingStatistics[playerIndex].highestScoreOpponentTeam = matchData.inning2.teamId;
                }
                else if ((matchData.inning1Batsman[i].runs > battingStatistics[playerIndex].highestScoreRuns) || ((matchData.inning1Batsman[i].runs == battingStatistics[playerIndex].highestScoreRuns) && (matchData.inning1Batsman[i].balls < battingStatistics[playerIndex].highestScoreBalls))) {
                    battingStatistics[playerIndex].highestScoreRuns = matchData.inning1Batsman[i].runs;
                    battingStatistics[playerIndex].highestScoreBalls = matchData.inning1Batsman[i].balls;
                    battingStatistics[playerIndex].highestScoreOpponentTeam = matchData.inning2.teamId;
                }
                if (matchData.inning1Batsman[i].isNotOut && !matchData.inning1Batsman[i].didNotBat) {
                    battingStatistics[playerIndex].notOut += 1;
                }
            }
        }
        for (let i = 0; i < matchData.inning1Bowler.length; i++) {
            updatePlayerPoints(
                matchData.inning1Bowler[i].playerId,
                matchData.inning1Bowler[i].points
            );
            const playerIndex = bowlingStatistics.findIndex(p => p.playerId === matchData.inning1Bowler[i].playerId);
            if (playerIndex != -1) {
                if (matchData.inning1Bowler[i].wickets >= 5) {
                    bowlingStatistics[playerIndex].fiveWickets++;
                }
                if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning1Bowler[i].balls > 0) {
                    bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                    bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                    bowlingStatistics[playerIndex].bestBowlingOpponentTeam = matchData.inning2.teamId;
                }
                else if ((matchData.inning1Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning1Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning1Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                    bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                    bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                    bowlingStatistics[playerIndex].bestBowlingOpponentTeam = matchData.inning2.teamId;
                }
            }
        }
        for (let i = 0; i < matchData.inning2Batsman.length; i++) {
            updatePlayerPoints(
                matchData.inning2Batsman[i].playerId,
                matchData.inning2Batsman[i].points
            );
            const playerIndex = battingStatistics.findIndex(p => p.playerId === matchData.inning2Batsman[i].playerId);
            if (playerIndex != -1) {
                if (matchData.inning2Batsman[i].runs >= 50 && matchData.inning2Batsman[i].runs < 100) {
                    battingStatistics[playerIndex].halfCenturies++;
                }
                else if (matchData.inning2Batsman[i].runs >= 100) {
                    battingStatistics[playerIndex].centuries++;
                }
                if (battingStatistics[playerIndex].innings == 1) {
                    battingStatistics[playerIndex].highestScoreRuns = matchData.inning2Batsman[i].runs;
                    battingStatistics[playerIndex].highestScoreBalls = matchData.inning2Batsman[i].balls;
                    battingStatistics[playerIndex].highestScoreOpponentTeam = matchData.inning1.teamId;
                }
                else if ((matchData.inning2Batsman[i].runs > battingStatistics[playerIndex].highestScoreRuns) || ((matchData.inning2Batsman[i].runs == battingStatistics[playerIndex].highestScoreRuns) && (matchData.inning2Batsman[i].balls < battingStatistics[playerIndex].highestScoreBalls))) {
                    battingStatistics[playerIndex].highestScoreRuns = matchData.inning2Batsman[i].runs;
                    battingStatistics[playerIndex].highestScoreBalls = matchData.inning2Batsman[i].balls;
                    battingStatistics[playerIndex].highestScoreOpponentTeam = matchData.inning1.teamId;
                }
                if (matchData.inning2Batsman[i].isNotOut && !matchData.inning2Batsman[i].didNotBat) {
                    battingStatistics[playerIndex].notOut += 1;
                }
            }
        }
        for (let i = 0; i < matchData.inning2Bowler.length; i++) {
            updatePlayerPoints(
                matchData.inning2Bowler[i].playerId,
                matchData.inning2Bowler[i].points
            );
            const playerIndex = bowlingStatistics.findIndex(p => p.playerId === matchData.inning2Bowler[i].playerId);
            if (playerIndex != -1) {
                if (matchData.inning2Bowler[i].wickets >= 5) {
                    bowlingStatistics[playerIndex].fiveWickets++;
                }
                if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning2Bowler[i].balls > 0) {
                    bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                    bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                    bowlingStatistics[playerIndex].bestBowlingOpponentTeam = matchData.inning1.teamId;
                }
                else if ((matchData.inning2Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning2Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning2Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                    bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                    bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                    bowlingStatistics[playerIndex].bestBowlingOpponentTeam = matchData.inning1.teamId;
                }
            }
        }
        console.log(players);
        players.sort((a, b) => b.points - a.points);
        fixture[matchId - 1].playerOfMatch = players[0].playerId;
        localStorage.setItem("fixture", JSON.stringify(fixture));
        localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
        localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
    }
    function saveResult(matchId) {
        updateStatistics(matchId);
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        fixture[matchId - 1].matchStatus = "completed";
        if (matchData.inning1.runs > matchData.inning2.runs) {
            fixture[matchId - 1].matchResult = `${matchData.inning1.teamShortName} won by ${matchData.inning1.runs - matchData.inning2.runs} ${(matchData.inning1.runs - matchData.inning2.runs) > 1 ? "Runs" : "Run"}`;
            savePointsTable(1, 2, matchData, matchId, false, false)
        }
        else if (matchData.inning2.runs > matchData.inning1.runs) {
            fixture[matchId - 1].matchResult = `${matchData.inning2.teamShortName} won by ${10 - matchData.inning2.wickets} ${(10 - matchData.inning2.wickets) > 1 ? "Wickets" : "Wicket"}`;
            savePointsTable(2, 1, matchData, matchId, false, false);
        }
        else {
            if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
                fixture[matchId - 1].matchResult = `${matchData.superOverInning1.teamShortName} won Super Over`;
                savePointsTable(1, 2, matchData, matchId, true, false);
            }
            else if (matchData.superOverInning2.runs > matchData.superOverInning1.runs) {
                fixture[matchId - 1].matchResult = `${matchData.superOverInning2.teamShortName} won Super Over`;
                savePointsTable(2, 1, matchData, matchId, true, false);
            }
            else {
                fixture[matchId - 1].matchResult = "Match Tied";
                savePointsTable(1, 2, matchData, matchId, true, true);
            }
        }
        if (matchId === 70) {
            fixture[matchId].homeTeamId = pointsTable[0].teamId;
            fixture[matchId].awayTeamId = pointsTable[1].teamId;
            fixture[matchId + 1].homeTeamId = pointsTable[2].teamId;
            fixture[matchId + 1].awayTeamId = pointsTable[3].teamId;
        }
        else if (matchId === 71) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId + 1].awayTeamId = matchData.inning2.teamId;
                fixture[matchId + 2].homeTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId + 1].awayTeamId = matchData.inning1.teamId;
                fixture[matchId + 2].homeTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId == 72) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId].homeTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId].homeTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId === 73) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId].awayTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId].awayTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId === 74) {
            localStorage.setItem("nextMatchId", null);
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                localStorage.setItem("winnerTeamId", matchData.inning1.teamId);
                localStorage.setItem("runnerUpTeamId", matchData.inning2.teamId);
            }
            else {
                localStorage.setItem("winnerTeamId", matchData.inning2.teamId);
                localStorage.setItem("runnerUpTeamId", matchData.inning1.teamId);
            }
            setWinner(Number(localStorage.getItem("winnerTeamId")));
            setRunnerUp(Number(localStorage.getItem("runnerUpTeamId")));
        }
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setFixture(fixture);
    }
    function savePointsTable(winningTeamInning, losingTeamInning, matchData, matchId, isSuperOver, isTied) {
        if (matchId <= 70) {
            const winningTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${winningTeamInning}`].teamId);
            const losingTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${losingTeamInning}`].teamId);
            pointsTable[winningTeamIndex].matchesPlayed += 1;
            pointsTable[losingTeamIndex].matchesPlayed += 1;
            if (isTied) {
                pointsTable[winningTeamIndex].matchesTied += 1;
                pointsTable[losingTeamIndex].matchesTied += 1;
            }
            else {
                pointsTable[winningTeamIndex].matchesWon += 1;
                pointsTable[winningTeamIndex].points += 2;
                pointsTable[losingTeamIndex].matchesLost += 1;
            }
            if (!isSuperOver) {
                pointsTable[winningTeamIndex].runRate = pointsTable[winningTeamIndex].runRate + (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6))) - (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6)));
                pointsTable[losingTeamIndex].runRate = pointsTable[losingTeamIndex].runRate + (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6))) - (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6)));
            }
            pointsTable[winningTeamIndex].netRunRate = pointsTable[winningTeamIndex].runRate / pointsTable[winningTeamIndex].matchesPlayed;
            pointsTable[losingTeamIndex].netRunRate = pointsTable[losingTeamIndex].runRate / pointsTable[losingTeamIndex].matchesPlayed;
            pointsTable.sort((a, b) => {
                if (a.points === b.points) {
                    return b.netRunRate - a.netRunRate;
                }
                return b.points - a.points;
            });
            localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
            setPointsTable(pointsTable);
            const tableTopperLength = pointsTable.filter((t) => (t.points > 0)).length;
            const tableTopper = pointsTable.slice(0, Math.min(tableTopperLength, 4));
            localStorage.setItem("tableTopper", JSON.stringify(tableTopper));
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
    function handlePlay(matchId) {
        if (fixture[matchId - 1].tossStatus != "completed") {
            navigate(`/toss/${matchId}`);
        }
        else {
            navigate(`/match/${matchId}`);
        }
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
                            <p>{(winner) ? "Tournament Result" : (fixture[nextMatch?.matchId - 1]?.tossStatus == "not completed" || fixture[nextMatch?.matchId - 1]?.matchStatus == "not completed") ? "Current Match" : "Next Match"}</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(nextMatch) ?
                                <>
                                    <div className={style.detailsContainer}>
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {venues[nextMatch.venueId - 1].venueCity}</span>
                                    </div>
                                    <div className={style.imageContainer}>
                                        <img src={teams[nextMatch.homeTeamId - 1].logo} alt={teams[nextMatch.homeTeamId - 1].teamName} title={teams[nextMatch.homeTeamId - 1].teamName} />
                                        <span>V/S</span>
                                        <img src={teams[nextMatch.awayTeamId - 1].logo} alt={teams[nextMatch.awayTeamId - 1].teamName} title={teams[nextMatch.awayTeamId - 1].teamName} />
                                    </div>
                                    <button onClick={() => handlePlay(nextMatch.matchId)}>
                                        {(fixture[nextMatch.matchId - 1].tossStatus == "not completed" || fixture[nextMatch.matchId - 1].matchStatus == "not completed") ? "Resume" : "Start"}
                                    </button>
                                </> : (winner) ?
                                    <>
                                        <div className={style.detailsContainer}>
                                            <span>Winner: {teams[winner - 1].teamShortName}</span>
                                            <span>Runner Up: {teams[runnerUp - 1].teamShortName}</span>
                                        </div>
                                        <div className={style.imageContainer}>
                                            <img src={teams[winner - 1].logo} alt={teams[winner - 1].teamName} title={teams[winner - 1].teamName} />
                                            <img src={teams[runnerUp - 1].logo} alt={teams[runnerUp - 1].teamName} title={teams[runnerUp - 1].teamName} />
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