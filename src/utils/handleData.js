function handleData(matchId, matchData, battingStatistics, bowlingStatistics) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
    battingStatistics.sort((a, b) => (b.runs - a.runs));
    localStorage.setItem("orangeCap", JSON.stringify(battingStatistics[0]));
    bowlingStatistics.sort((a, b) => (b.wickets - a.wickets));
    localStorage.setItem("purpleCap", JSON.stringify(bowlingStatistics[0]));
}
export default handleData;