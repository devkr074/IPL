function handleFielder(inning, matchData, squad) {
    const bowlingTeamId = ((inning == 1) ? matchData.inning2.teamId : matchData.inning1.teamId);
    let fielderData = [];
    for (let i = 0; i < 11; i++) {
        fielderData.push(squad[(bowlingTeamId - 1) * 11 + i]);
    }
    const fielder = Math.floor(Math.random() * fielderData.length);
    return (fielderData[fielder].playerId);
}
export default handleFielder;