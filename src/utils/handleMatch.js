import handleUserMatch from "./handleUserMatch.js";
import handleTossCall from "./handleTossCall.js";
import handleTossOutcome from "./handleTossOutcome.js";
import handleOptionOutcome from "./handleOptionOutcome.js";
import handleMatchData from "./handleMatchData.js";
import handleFirstInning from "./handleFirstInning.js";
import handleSecondInning from "./handleSecondInning.js";
import handlePointsTable from "./handlePointsTable.js";
import handleStatistics from "./handleStatistics.js";
function handleMatch() {
    const fixture = JSON.parse(localStorage.getItem("fixture"));
    const teams = JSON.parse(localStorage.getItem("teams"));
    for (let i = 0; i < fixture.length; i++) {
        if (fixture[i].tossStatus != "Completed" || fixture[i].matchStatus != "Completed") {
            if (handleUserMatch(fixture[i])) {
                localStorage.setItem("nextMatch", JSON.stringify(fixture[i]));
                break;
            }
            else {
                const tossCall = handleTossCall();
                const tossOutcome = handleTossOutcome();
                const optionOutcome = handleOptionOutcome();
                fixture[i].tossStatus = "Completed";
                if (tossCall == tossOutcome) {
                    fixture[i].tossResult = `${teams[fixture[i].awayTeamId - 1].name} opt to ${optionOutcome}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    if (optionOutcome == "Bat") {
                        handleMatchData(fixture[i].awayTeamId, fixture[i].homeTeamId, fixture[i]);
                    }
                    else {
                        handleMatchData(fixture[i].homeTeamId, fixture[i].awayTeamId, fixture[i]);
                    }
                }
                else {
                    fixture[i].tossResult = `${teams[fixture[i].homeTeamId - 1].name} opt to ${optionOutcome}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    if (optionOutcome == "Bat") {
                        handleMatchData(fixture[i].homeTeamId, fixture[i].awayTeamId, fixture[i]);
                    }
                    else {
                        handleMatchData(fixture[i].awayTeamId, fixture[i].homeTeamId, fixture[i]);
                    }
                }
                handleFirstInning(fixture[i].matchId);
                handleSecondInning(fixture[i].matchId);
                const matchData = JSON.parse(localStorage.getItem(`match-${fixture[i].matchId}`));
                fixture[i].matchStatus = "Completed";
                if (matchData.inning1.runs > matchData.inning2.runs) {
                    fixture[i].matchResult = `${teams[matchData.inning1.teamId - 1].name} won by ${matchData.inning1.runs - matchData.inning2.runs} ${(matchData.inning1.runs - matchData.inning2.runs) > 1 ? "Runs" : "Run"}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    handlePointsTable(1, 2, matchData, fixture[i].matchId, false, false)
                }
                else if (matchData.inning2.runs > matchData.inning1.runs) {
                    fixture[i].matchResult = `${teams[matchData.inning2.teamId - 1].name} won by ${10 - matchData.inning2.wickets} ${(10 - matchData.inning2.wickets) > 1 ? "Wickets" : "Wicket"}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    handlePointsTable(2, 1, matchData, fixture[i].matchId, false, false);
                }
                else {
                    if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
                        fixture[i].matchResult = `${teams[matchData.superOverInning1.teamId - 1].name} won Super Over`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        handlePointsTable(2, 1, matchData, fixture[i].matchId, true, false);
                    }
                    else if (matchData.superOverInning2.runs > matchData.superOverInning1.runs) {
                        fixture[i].matchResult = `${teams[matchData.superOverInning2.teamId - 1].name} won Super Over`;
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        handlePointsTable(1, 2, matchData, fixture[i].matchId, true, false);
                    }
                    else {
                        fixture[i].matchResult = "Match Tied";
                        localStorage.setItem("fixture", JSON.stringify(fixture));
                        handlePointsTable(1, 2, matchData, fixture[i].matchId, true, true);
                    }
                }
                if (i == 69) {
                    const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
                    fixture[i + 1].homeTeamId = pointsTable[0].teamId;
                    fixture[i + 1].awayTeamId = pointsTable[1].teamId;
                    fixture[i + 2].homeTeamId = pointsTable[2].teamId;
                    fixture[i + 2].awayTeamId = pointsTable[3].teamId;
                }
                else if (i == 70) {
                    if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                        fixture[i + 2].awayTeamId = matchData.inning2.teamId;
                        fixture[i + 3].homeTeamId = matchData.inning1.teamId;
                    }
                    else {
                        fixture[i + 2].awayTeamId = matchData.inning1.teamId;
                        fixture[i + 3].homeTeamId = matchData.inning2.teamId;
                    }
                }
                else if (i == 71) {
                    if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                        fixture[i + 1].homeTeamId = matchData.inning1.teamId;
                    }
                    else {
                        fixture[i + 1].homeTeamId = matchData.inning2.teamId;
                    }
                }
                else if (i == 72) {
                    if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                        fixture[i + 1].awayTeamId = matchData.inning1.teamId;
                    }
                    else {
                        fixture[i + 1].awayTeamId = matchData.inning2.teamId;
                    }
                }
                else if (i == 73) {
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
                handleStatistics(fixture[i].matchId);
                localStorage.setItem("fixture", JSON.stringify(fixture));
                localStorage.setItem("fixture", JSON.stringify(fixture));
            }
        }
    }
}
export default handleMatch;