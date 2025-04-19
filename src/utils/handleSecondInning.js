import handleInning from "./handleInning.js";
function handleSecondInning(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    if ((matchData.inning2.balls < 120) && (matchData.inning2.wickets < 10) && (matchData.inning1.runs >= matchData.inning2.runs)) {
        handleInning(2, matchId);
        handleSecondInning(matchId);
    }
}
export default handleSecondInning;