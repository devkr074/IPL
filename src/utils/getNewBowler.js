function getNewBowler(inning, matchId, currentBowler) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const randomBowler = Math.floor(Math.random() * matchData[`inning${inning}Bowler`].length);
    if ((matchData[`inning${inning}Bowler`][randomBowler].playerId !== currentBowler) && (matchData[`inning${inning}Bowler`][randomBowler].balls < 24)) {
        return matchData[`inning${inning}Bowler`][randomBowler].playerId;
    }
    else {
        return getNewBowler(inning, matchId, currentBowler);
    }
}
export default getNewBowler