import handleInning from "./handleInning.js";
import handleSuperOverSecondInning from "./handleSuperOverSecondInning.js";
import handleSuperOverFirstInning from "./handleSuperOverFirstInning.js";
function handleSecondInning(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    if ((matchData.inning2.balls < 120) && (matchData.inning2.wickets < 10) && (matchData.inning1.runs >= matchData.inning2.runs)) {
        handleInning(2, matchId);
        handleSecondInning(matchId);
    }
    else if (matchData.inning1.runs == matchData.inning2.runs) {
        handleSuperOverFirstInning(matchId);
        handleSuperOverSecondInning(matchId);
    }
}
export default handleSecondInning;