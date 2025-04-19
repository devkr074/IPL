function handleSwapPlayer(inning, matchData) {
    const temp = matchData[`inning${inning}`].strikerId;
    matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].nonStrikerId;
    matchData[`inning${inning}`].nonStrikerId = temp;
}
export default handleSwapPlayer;