import handleSuperOverInning from "./handleSuperOverInning.js";
function handleSuperOverFirstInning() {
    const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
    if (matchData.superOverInning1.balls < 6 && matchData.superOverInning1.wickets < 2) {
        handleSuperOverInning(1, match.matchId);
        handleSuperOverFirstInning();
    }
}
export default handleSuperOverFirstInning;