function getNewBowler(inning, matchId, currentBowlerId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const bowlers = matchData[`inning${inning}Bowler`];
    const availableBowlers = bowlers.filter((b) => b.playerId !== currentBowlerId && b.balls < 24);
    const randomIndex = Math.floor(Math.random() * availableBowlers.length);
    return availableBowlers[randomIndex].playerId;
}
export default getNewBowler;