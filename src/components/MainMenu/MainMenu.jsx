import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import setMatchData from "../../utils/setMatchData.js";
import simulateInning from "../../utils/simulateInning.js";
import simulateSuperOver from "../../utils/simulateSuperOver.js";
function MainMenu() {
    const [userTeamId, setUserTeamId] = useState(null);
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [pointsTable, setPointsTable] = useState([]);
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const userTeamId = Number(localStorage.getItem('userTeamId'));
        setFixture(fixture);
        setTeams(teams);
        setPointsTable(pointsTable);
        setUserTeamId(userTeamId);
    }, []);
    useEffect(() => {
        simulateOtherMatches();
    }, [fixture]);
    const navigate = useNavigate();
    function simulateOtherMatches() {
        for (let i = 0; i < fixture.length; i++) {
            const match = fixture[i];
            const tossStatus = match.tossStatus;
            if (tossStatus === "upcoming") {
                if (isUserMatch(match)) {
                    saveNextMatch(match);
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
                            saveResult(match.matchId);
                        } else {
                            setMatchData(match.homeTeamId, match.awayTeamId, match);
                            simulateInning(1, match.matchId);
                            saveResult(match.matchId);
                        }
                    } else {
                        match.tossResult = `${teams[match.homeTeamId - 1].teamShortName} elected to ${optionOutcome} first`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.homeTeamId, match.awayTeamId, match);
                            simulateInning(1, match.matchId);
                            saveResult(match.matchId);
                        } else {
                            setMatchData(match.awayTeamId, match.homeTeamId, match);
                            simulateInning(1, match.matchId);
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
    function saveNextMatch(match) {
        const nextMatches = JSON.parse(localStorage.getItem("nextMatch")) || [];
        nextMatches.push(match);
        localStorage.setItem("nextMatch", JSON.stringify(nextMatches));
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
    function saveResult(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        fixture[matchId - 1].matchStatus = "completed";
        if (matchData.inning1.runs > matchData.inning2.runs) {
            fixture[matchId - 1].matchResult = `${matchData.inning1.teamShortName} won by ${matchData.inning1.runs - matchData.inning2.runs} ${(matchData.inning1.runs - matchData.inning2.runs) > 1 ? "Runs" : "Run"}`;
            savePointsTable(1, 2, matchData, false, false)
        }
        else if (matchData.inning2.runs > matchData.inning1.runs) {
            fixture[matchId - 1].matchResult = `${matchData.inning2.teamShortName} won by ${10 - matchData.inning2.wickets} ${(10 - matchData.inning2.wickets) > 1 ? "Wickets" : "Wicket"}`;
            savePointsTable(2, 1, matchData, false, false);
        }
        else {
            if (matchData.superOverInning1 > matchData.superOverInning2) {
                fixture[matchId - 1].matchResult = `${matchData.superOverInning1.teamShortName} won Super Over`;
                savePointsTable(1, 2, matchData, true, false);
            }
            else if (matchData.superOverInning2 > matchData.superOverInning1) {
                fixture[matchId - 1].matchResult = `${matchData.superOverInning2.teamShortName} won Super Over`;
                savePointsTable(2, 1, matchData, true, false);
            }
            else {
                fixture[matchId - 1].matchResult = "Match Tied";
                savePointsTable(1, 2, matchData, true, true);
            }
        }
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setFixture(fixture);
    }
    function savePointsTable(winningTeamInning, losingTeamInning, matchData, isSuperOver, isTied) {
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
            pointsTable[winningTeamIndex].runRate = pointsTable[winningTeamIndex].runRate + (matchData[`inning${winningTeamInning}`].runs / Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6)) - (matchData[`inning${losingTeamInning}`].runs / Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6));
            pointsTable[losingTeamIndex].runRate = pointsTable[losingTeamIndex].runRate + (matchData[`inning${losingTeamInning}`].runs / Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6)) - (matchData[`inning${winningTeamInning}`].runs / Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6));
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
    }
    function handleFixture() {
        navigate("/fixture");
    }
    function handleSquad() {
        navigate("/squad");
    }
    function handleVenue() {
        navigate("/venue");
    }
    function handlePointsTable() {
        navigate("/points-table");
    }
    function handleBattingStatistic() {
        navigate("/batting-statistic");
    }
    function handleBowlingStatistic() {
        navigate("/bowling-statistic");
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
                            <p>Next Match</p>
                        </div>
                        <div className={style.sectionContent}>
                            <p>Section Content</p>
                        </div>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleFixture}>Fixture</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleSquad}>Squad</button>
                        <button className={style.button} onClick={handleVenue}>Venue</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handlePointsTable}>Points Table</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBattingStatistic}>Batting Statistic</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBowlingStatistic}>Bowling Statistic</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainMenu;