import handleSuperOverInning from "./handleSuperOverInning.js";
function handleSuperOverSecondInning() {
    const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
    if (matchData.superOverInning2.balls < 6 && matchData.superOverInning2.wickets < 2 && matchData.superOverInning1.runs >= matchData.superOverInning2.runs) {
        handleSuperOverInning(2, match.matchId);
        handleSuperOverSecondInning();
    }
}
export default handleSuperOverSecondInning;