function getNewBowler(bowlingTeamId, player, matchData, match, inning) {
    const maxAttempts = 20;
    let attempts = 0;
    let playerId, roleId, bowlerIndex;
    matchData[`inning${inning}`].lastBowler = matchData[`inning${inning}`].currentBowler;
    while (attempts < maxAttempts) {
        attempts++;
        const random = Math.round(Math.random() * 11);
        playerId = player[(bowlingTeamId - 1) * 11 + random].playerId;
        roleId = player[(bowlingTeamId - 1) * 11 + random].roleId;
        const inningBowlerKey = `inning${inning}Bowler`;
        if (roleId === 2 || roleId === 3) {
            bowlerIndex = matchData[inningBowlerKey].findIndex(obj => obj.playerId === playerId);
            if (bowlerIndex === -1) {
                matchData[inningBowlerKey].push({
                    playerId: playerId,
                    balls: 0,
                    maiden: 0,
                        runs: 0,
                    wickets: 0,
                });
                break;
            }else {
                const bowlerData = matchData[inningBowlerKey][bowlerIndex];
                if (bowlerData.balls == 24 || matchData[`inning${inning}`].lastBowler == playerId) {
                    continue;
                }
            }
        }
    }
    matchData[`inning${inning}`].currentBowler = playerId;
}
export default getNewBowler