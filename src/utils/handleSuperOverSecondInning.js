import handleSuperOverInning from "./handleSuperOverInning.js";
function handleSuperOverSecondInning(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    if ((matchData.superOverInning2.balls < 6) && (matchData.superOverInning2.wickets < 2) && (matchData.superOverInning1.runs >= matchData.superOverInning2.runs)) {
        handleSuperOverInning(2, matchId);
        handleSuperOverSecondInning(matchId);
    }
}
export default handleSuperOverSecondInning;