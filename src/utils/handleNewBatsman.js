function handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData) {
    matchData[`inning${inning}Batsman`][strikerIndexMatchData].notOut = false;
    if (matchData[`inning${inning}`].wickets == 10 || matchData[`inning${inning}`].balls == 120) {
        matchData[`inning${inning}`].strikerId = null;
        return;
    }
    else {
        matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].lastNewBatsmanId + 1;
        matchData[`inning${inning}`].lastNewBatsmanId++;
        const newBatsmanIndexMatchData = matchData[`inning${inning}Batsman`].findIndex((p) => p.playerId == matchData[`inning${inning}`].strikerId);
        const newBatsmanIndexStatistics = battingStatistics.findIndex((p) => p.playerId == matchData[`inning${inning}`].strikerId);
        matchData[`inning${inning}Batsman`][newBatsmanIndexMatchData].didNotBat = false;
        battingStatistics[newBatsmanIndexStatistics].innings++;
    }
}
export default handleNewBatsman;