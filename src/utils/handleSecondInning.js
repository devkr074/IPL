import handleInning from "./handleInning.js";
function handleSecondInning() {
    const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
    if (matchData.inning2.balls < 120 && matchData.inning2.wickets < 10 && matchData.inning1.runs >= matchData.inning2.runs) {
        handleInning(2, match.matchId);
        handleSecondInning();
    }
}
export default handleSecondInning;