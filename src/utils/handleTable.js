function handlePointsTable(winningTeamInning, losingTeamInning, matchData, matchId, isSuperOver, isTied) {
    if (matchId <= 70) {
        const winningTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${winningTeamInning}`].teamId);
        const losingTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${losingTeamInning}`].teamId);
        pointsTable[winningTeamIndex].matchesPlayed += 1;
        pointsTable[losingTeamIndex].matchesPlayed += 1;
        if (isTied) {
            pointsTable[winningTeamIndex].matchesTied += 1;
            pointsTable[losingTeamIndex].matchesTied += 1;
        }
        else {
            pointsTable[winningTeamIndex].matchesWon += 1;
            pointsTable[winningTeamIndex].points += 2;
            pointsTable[losingTeamIndex].matchesLost += 1;
        }
        if (!isSuperOver) {
            pointsTable[winningTeamIndex].runRate = pointsTable[winningTeamIndex].runRate + (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6))) - (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6)));
            pointsTable[losingTeamIndex].runRate = pointsTable[losingTeamIndex].runRate + (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6))) - (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6)));
        }
        pointsTable[winningTeamIndex].netRunRate = pointsTable[winningTeamIndex].runRate / pointsTable[winningTeamIndex].matchesPlayed;
        pointsTable[losingTeamIndex].netRunRate = pointsTable[losingTeamIndex].runRate / pointsTable[losingTeamIndex].matchesPlayed;
        pointsTable.sort((a, b) => {
            if (a.points === b.points) {
                return b.netRunRate - a.netRunRate;
            }
            return b.points - a.points;
        });
        localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
        setPointsTable(pointsTable);
        const tableTopperLength = pointsTable.filter((t) => (t.points > 0)).length;
        const tableTopper = pointsTable.slice(0, Math.min(tableTopperLength, 4));
        localStorage.setItem("tableTopper", JSON.stringify(tableTopper));
    }
}
export default handlePointsTable;