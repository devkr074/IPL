import handleInning from "./handleInning.js";
function handleFirstInning() {
    const matchData = JSON.parse(localStorage.getItem(`match-${fixture[i].matchId}`));
    if (matchData.inning1.balls < 120 && matchData.inning1.wickets < 10) {
        handleInning(1, fixture[i].matchId);
        handleFirstInning();
    }
}
export default handleFirstInning;