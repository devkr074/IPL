import handleUserMatch from "./handleUserMatch.js";
import handleTossCall from "./handleTossCall.js";
import handleTossOutcome from "./handleTossOutcome.js";
import handleOptionOutcome from "./handleOptionOutcome.js";
import handleMatchData from "./handleMatchData.js";
import handleFirstInning from "./handleFirstInning.js";
import handleSecondInning from "./handleSecondInning.js";
import handleSuperOverFirstInning from "./handleSuperOverFirstInning.js";
import handleSuperOverSecondInning from "./handleSuperOverSecondInning.js";
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
                    fixture[i].tossResult = `${teams[match.awayTeamId - 1].name} opt to ${optionOutcome}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    if (optionOutcome == "Bat") {
                        handleMatchData(fixture[i].awayTeamId, fixture[i].homeTeamId, fixture[i]);
                    }
                    else {
                        handleMatchData(fixture[i].homeTeamId, fixture[i].awayTeamId, fixture[i]);
                    }
                }
                else {
                    fixture[i].tossResult = `${teams[match.homeTeamId - 1].name} opt to ${optionOutcome}`;
                    localStorage.setItem("fixture", JSON.stringify(fixture));
                    if (optionOutcome == "Bat") {
                        handleMatchData(fixture[i].homeTeamId, fixture[i].awayTeamId, fixture[i]);
                    }
                    else {
                        handleMatchData(fixture[i].awayTeamId, fixture[i].homeTeamId, fixture[i]);
                    }
                }
                handleFirstInning();
                handleSecondInning();
                const matchData = JSON.parse(localStorage.getItem(`match-${fixture[i].matchId}`));
                if (matchData.inning1.runs == matchData.inning2.runs) {
                    handleSuperOverFirstInning();
                    handleSuperOverSecondInning();
                }
                saveResult(fixture[i].matchId);
            }
        }
    }
}
export default handleMatch;