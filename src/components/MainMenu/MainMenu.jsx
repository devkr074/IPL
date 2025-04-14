import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import getIsUserMatch from "../../utils/getIsUserMatch.js";
import getTossOutcome from "../../utils/getTossOutcome.js";
import getOptionOutcome from "../../utils/getOptionOucome.js";
import setMatchData from "../../utils/setMatchData.js";
import simulateMatch from "../../utils/simulateMatch.js";
import simulateSuperOver from "../../utils/simulateSuperOver.js";
function MainMenu() {
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [squad, setSquad] = useState([]);
    const [pointsTable, setPointsTable] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        setFixture(fixture);
        setTeams(teams);
        setSquad(squad);
        setPointsTable(pointsTable);
    }, []);
    useEffect(() => {
        for (let i = 0; i < fixture.length; i++) {
            const match = fixture[i];
            const matchStatusId = match.matchStatusId;
            if (matchStatusId == null) {
                if (getIsUserMatch(match)) {
                    return;
                } else {
                    const tossCall = Math.random() < 0.5 ? "Heads" : "Tails";
                    const tossOutcome = getTossOutcome();
                    const optionOutcome = getOptionOutcome();
                    match.tossStatusId = 1;
                    if (tossCall === tossOutcome) {
                        match.tossResult = `${teams[match.awayTeamsId - 1].teamsShortName} elected to ${optionOutcome} first`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.awayTeamsId, match.homeTeamsId, match, teams, squad, battingStatistic, bowlingStatistic);
                            simulateMatch(1, match.matchId, 0);
                            checkForSuperOver(match.matchId);
                        } else {
                            setMatchData(match.homeTeamsId, match.awayTeamsId, match, teams, squad, battingStatistic, bowlingStatistic);
                            simulateMatch(1, match.matchId, 0);
                            checkForSuperOver(match.matchId);
                        }
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                    } else {
                        match.tossResult = `${teams[match.homeTeamsId - 1].teamsShortName} elected to ${optionOutcome} first`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.homeTeamsId, match.awayTeamsId, match, teams, squad, battingStatistic, bowlingStatistic);
                            simulateMatch(1, match.matchId, 0);
                            checkForSuperOver(match.matchId);
                        } else {
                            setMatchData(match.awayTeamsId, match.homeTeamsId, match, teams, squad, battingStatistic, bowlingStatistic);
                            simulateMatch(1, match.matchId, 0);
                            checkForSuperOver(match.matchId);
                        }
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                    }
                }
            }
        }
    }, [fixture]);
    function checkForSuperOver(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if (matchData.inning1.runs == matchData.inning2.runs) {
            matchData.isSuperOver = true;
            localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
            simulateSuperOver(1, matchId, 0);
            setResult(matchId);
        }
        else {
            setResult(matchId);
        }
    }
    function setResult(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const match = fixture[matchId - 1];
        match.matchStatusId = 2;
        if (matchData.isSuperOver) {
            if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
                match.matchResult = `Match tied (${matchData.superOverInning1.teamsShortName} won in Super Over)`;
            }
            else if (matchData.superOverInning1.runs < matchData.superOverInning2.runs) {
                match.matchResult = `Match tied (${matchData.superOverInning2.teamsShortName} won in Super Over)`;
            }
            else {
                match.matchResult = `Match tied (Super Over also tied)`;
            }
        }
        else {
            if (matchData.inning1.runs > matchData.inning2.runs) {
                match.matchResult = `${matchData.inning1.teamsShortName} won by ${matchData.inning1.runs - matchData.inning2.runs} runs`;
            }
            else {
                match.matchResult = `${matchData.inning2.teamsShortName} won by ${10 - matchData.inning2.wickets} wickets`;
            }
        }
        localStorage.fixture = JSON.stringify(fixture);
        setPointTable(matchId);
    }
    function setPointTable(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if (matchData.isSuperOver) {
            const index1 = pointsTable.findIndex((teams) => teams.teamsId == matchData.superOverInning1.teamsId);
            const index2 = pointsTable.findIndex((teams) => teams.teamsId == matchData.superOverInning2.teamsId);
            if (matchData.superOverInning1.runs == matchData.superOverInning2.runs) {
                pointsTable[index1].matchesPlayed += 1;
                pointsTable[index1].matchesTied += 1;
                pointsTable[index1].points += 1;
                pointsTable[index2].matchesPlayed += 1;
                pointsTable[index2].matchesTied += 1;
                pointsTable[index2].points += 1;
            }
            else if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
                pointsTable[index1].matchesPlayed += 1;
                pointsTable[index1].matchesWon += 1;
                pointsTable[index1].points += 2;
                pointsTable[index2].matchesPlayed += 1;
                pointsTable[index2].matchesLost += 1;
                pointsTable[index2].points += 0;
            }
            else {
                pointsTable[index1].matchesPlayed += 1;
                pointsTable[index1].matchesLost += 1;
                pointsTable[index1].points += 0;
                pointsTable[index2].matchesPlayed += 1;
                pointsTable[index2].matchesWon += 1;
                pointsTable[index2].points += 2;
            }
        }
        else {
            const index1 = pointsTable.findIndex((teams) => teams.teamsId == matchData.inning1.teamsId);
            const index2 = pointsTable.findIndex((teams) => teams.teamsId == matchData.inning2.teamsId);
            if (matchData.inning1.runs > matchData.inning2.runs) {
                pointsTable[index1].matchesPlayed += 1;
                pointsTable[index1].matchesWon += 1;
                pointsTable[index1].points += 2;
                pointsTable[index2].matchesPlayed += 1;
                pointsTable[index2].matchesLost += 1;
                pointsTable[index2].points += 0;
                pointsTable[index1].runRate = (pointsTable[index1].runRate + (matchData.inning1.runs / (Math.floor(matchData.inning1.balls / 6) + ((matchData.inning1.balls % 6) / 6))) - (matchData.inning2.runs / (Math.floor(matchData.inning2.balls / 6) + ((matchData.inning2.balls % 6) / 6))));
                pointsTable[index2].runRate = (pointsTable[index2].runRate + (matchData.inning2.runs / (Math.floor(matchData.inning2.balls / 6) + ((matchData.inning2.balls % 6) / 6))) - (matchData.inning1.runs / (Math.floor(matchData.inning1.balls / 6) + ((matchData.inning1.balls % 6) / 6))));
                pointsTable[index1].netRunRate = pointsTable[index1].runRate / pointsTable[index1].matchesPlayed;
                pointsTable[index2].netRunRate = pointsTable[index2].runRate / pointsTable[index2].matchesPlayed;
            }
            else {
                pointsTable[index1].matchesPlayed += 1;
                pointsTable[index1].matchesLost += 1;
                pointsTable[index1].points += 0;
                pointsTable[index2].matchesPlayed += 1;
                pointsTable[index2].matchesWon += 1;
                pointsTable[index2].points += 2;
                pointsTable[index1].runRate = (pointsTable[index1].runRate + (matchData.inning1.runs / (Math.floor(matchData.inning1.balls / 6) + ((matchData.inning1.balls % 6) / 6))) - (matchData.inning2.runs / (Math.floor(matchData.inning2.balls / 6) + ((matchData.inning2.balls % 6) / 6))));
                pointsTable[index2].runRate = (pointsTable[index2].runRate + (matchData.inning2.runs / (Math.floor(matchData.inning2.balls / 6) + ((matchData.inning2.balls % 6) / 6))) - (matchData.inning1.runs / (Math.floor(matchData.inning1.balls / 6) + ((matchData.inning1.balls % 6) / 6))));
                pointsTable[index1].netRunRate = pointsTable[index1].runRate / pointsTable[index1].matchesPlayed;
                pointsTable[index2].netRunRate = pointsTable[index2].runRate / pointsTable[index2].matchesPlayed;
            }
        }
        let sortedPointsTable = pointsTable.sort((a, b) => {
            if (a.points === b.points) {
                return b.netRunRate - a.netRunRate;
            }
            return b.points - a.points;
        });
        localStorage.setItem("pointsTable", JSON.stringify(sortedPointsTable));
        setPointsTable(sortedPointsTable);
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