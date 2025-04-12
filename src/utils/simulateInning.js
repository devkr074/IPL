function simulateInning(battingTeamId, bowlingTeamId, match, player, inning, target) {
    const matchData = JSON.parse(localStorage.getItem(`match-${match.matchId}`));
    while (((inning == 1) && (matchData.firstInning.balls < 120 && matchData.firstInning.wickets < 10)) || ((inning == 2) && (matchData.secondInning.runs <= matchData.firstInning.runs && matchData.secondInning.balls < 120 && matchData.secondInning.wickets < 10))) {
        matchData[inning == 1 ? 'firstInning' : 'secondInning'].balls++;
    }
}
export default simulateInning;