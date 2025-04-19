function handleNewBowler(inning, matchData) {
    const bowlerData = matchData[`inning${inning}Bowler`].filter((b) => ((b.playerId != matchData[`inning${inning}`].bowlerId) && (b.balls < 24)));
    const bowler = Math.floor(Math.random() * bowlerData.length);
    return (bowlerData[bowler].playerId);
}
export default handleNewBowler;