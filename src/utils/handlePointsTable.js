function handlePointsTable(winningTeamInning, losingTeamInning, matchData, matchId, superOver, tied) {
    if (matchId <= 70) {
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const winningTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${winningTeamInning}`].teamId);
        const losingTeamIndex = pointsTable.findIndex((t) => t.teamId === matchData[`inning${losingTeamInning}`].teamId);
        pointsTable[winningTeamIndex].played += 1;
        pointsTable[losingTeamIndex].played += 1;
        if (tied == true) {
            pointsTable[winningTeamIndex].tied += 1;
            pointsTable[losingTeamIndex].tied += 1;
        }
        else {
            pointsTable[winningTeamIndex].won += 1;
            pointsTable[winningTeamIndex].points += 2;
            pointsTable[losingTeamIndex].lost += 1;
        }
        if (superOver == false) {
            pointsTable[winningTeamIndex].runRate = pointsTable[winningTeamIndex].runRate + (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6))) - (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6)));
            pointsTable[losingTeamIndex].runRate = pointsTable[losingTeamIndex].runRate + (matchData[`inning${losingTeamInning}`].runs / (Math.floor(matchData[`inning${losingTeamInning}`].balls / 6) + ((matchData[`inning${losingTeamInning}`].balls % 6) / 6))) - (matchData[`inning${winningTeamInning}`].runs / (Math.floor(matchData[`inning${winningTeamInning}`].balls / 6) + ((matchData[`inning${winningTeamInning}`].balls % 6) / 6)));
        }
        pointsTable[winningTeamIndex].netRunRate = pointsTable[winningTeamIndex].runRate / pointsTable[winningTeamIndex].played;
        pointsTable[losingTeamIndex].netRunRate = pointsTable[losingTeamIndex].runRate / pointsTable[losingTeamIndex].played;
        pointsTable.sort((a, b) => {
            if (a.points == b.points) {
                return b.netRunRate - a.netRunRate;
            }
            return b.points - a.points;
        });
        localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
        const tableTopper = pointsTable.slice(0, Math.min(pointsTable.filter((t) => (t.points > 0)).length, 4));
        localStorage.setItem("tableTopper", JSON.stringify(tableTopper));
    }
}
export default handlePointsTable;