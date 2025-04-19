import handlePointsTable from "./handlePointsTable.js";
import handleStatistics from "./handleStatistics.js";
function handleResult(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const fixture = JSON.parse(localStorage.getItem("fixture"));
    fixture[matchId - 1].matchStatus = "Completed";
    if (matchData.inning1.runs > matchData.inning2.runs) {
        fixture[matchId - 1].matchResult = `${matchData.inning1.teamShortName} won by ${matchData.inning1.runs - matchData.inning2.runs} ${(matchData.inning1.runs - matchData.inning2.runs) > 1 ? "Runs" : "Run"}`;
        handlePointsTable(1, 2, matchData, matchId, false, false)
    }
    else if (matchData.inning2.runs > matchData.inning1.runs) {
        fixture[matchId - 1].matchResult = `${matchData.inning2.teamShortName} won by ${10 - matchData.inning2.wickets} ${(10 - matchData.inning2.wickets) > 1 ? "Wickets" : "Wicket"}`;
        handlePointsTable(2, 1, matchData, matchId, false, false);
    }
    else {
        if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
            fixture[matchId - 1].matchResult = `${matchData.superOverInning1.teamShortName} won Super Over`;
            handlePointsTable(1, 2, matchData, matchId, true, false);
        }
        else if (matchData.superOverInning2.runs > matchData.superOverInning1.runs) {
            fixture[matchId - 1].matchResult = `${matchData.superOverInning2.teamShortName} won Super Over`;
            handlePointsTable(2, 1, matchData, matchId, true, false);
        }
        else {
            fixture[matchId - 1].matchResult = "Match Tied";
            handlePointsTable(1, 2, matchData, matchId, true, true);
        }
    }
    if (matchId == 70) {
        fixture[matchId].homeTeamId = pointsTable[0].teamId;
        fixture[matchId].awayTeamId = pointsTable[1].teamId;
        fixture[matchId + 1].homeTeamId = pointsTable[2].teamId;
        fixture[matchId + 1].awayTeamId = pointsTable[3].teamId;
    }
    else if (matchId == 71) {
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
    else if (matchId == 73) {
        if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
            fixture[matchId].awayTeamId = matchData.inning1.teamId;
        }
        else {
            fixture[matchId].awayTeamId = matchData.inning2.teamId;
        }
    }
    else if (matchId == 74) {
        localStorage.setItem("nextMatch", null);
        if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
            localStorage.setItem("winnerTeamId", matchData.inning1.teamId);
            localStorage.setItem("runnerUpTeamId", matchData.inning2.teamId);
        }
        else {
            localStorage.setItem("winnerTeamId", matchData.inning2.teamId);
            localStorage.setItem("runnerUpTeamId", matchData.inning1.teamId);
        }
    }
    localStorage.setItem("fixture", JSON.stringify(fixture));
    handleStatistics(matchId);
}
export default handleResult;