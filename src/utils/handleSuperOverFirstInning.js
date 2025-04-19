import handleSuperOverInning from "./handleSuperOverInning.js";
function handleSuperOverFirstInning(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    if ((matchData.superOverInning1.balls < 6) && (matchData.superOverInning1.wickets < 2)) {
        handleSuperOverInning(1, matchId);
        handleSuperOverFirstInning(matchId);
    }
}
export default handleSuperOverFirstInning;