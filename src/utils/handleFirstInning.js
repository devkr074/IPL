import handleInning from "./handleInning.js";
function handleFirstInning(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    if ((matchData.inning1.balls < 120) && (matchData.inning1.wickets < 10)) {
        handleInning(1, matchId);
        handleFirstInning(matchId);
    }
}
export default handleFirstInning;