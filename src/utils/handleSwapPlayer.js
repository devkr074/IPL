function handleSwapPlayer(inningData) {
    const temp = inningData.strikerId;
    inningData.strikerId = inningData.nonStrikerId;
    inningData.nonStrikerId = temp;
}
export default handleSwapPlayer;