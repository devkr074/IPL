function setMatchData(battingTeam, bowlingTeam, match, team, player, battingStatistic, bowlingStatistic) {
    let inning1Batsman = [];
    let inning2Bowler = [];
    for (let i = 0; i < 11; i++) {
        inning1Batsman.push({ playerId: player[(battingTeam - 1) * 11 + i].playerId, playerName: player[(battingTeam - 1) * 11 + i].playerName, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isNotOut: false, isDidNotBat: false });
        if (player[(battingTeam - 1) * 11 + i].roleId == 2 || player[(battingTeam - 1) * 11 + i].roleId == 3) {
            inning2Bowler.push({ playerId: player[(battingTeam - 1) * 11 + i].playerId, playerName: player[(battingTeam - 1) * 11 + i].playerName, runs: 0, balls: 0, wickets: 0 });
        }
    }
    let inning2Batsman = [];
    let inning1Bowler = [];
    for (let i = 0; i < 11; i++) {
        inning2Batsman.push({ playerId: player[(bowlingTeam - 1) * 11 + i].playerId, playerName: player[(bowlingTeam - 1) * 11 + i].playerName, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isNotOut: false, isDidNotBat: false });
        if (player[(bowlingTeam - 1) * 11 + i].roleId == 2 || player[(bowlingTeam - 1) * 11 + i].roleId == 3) {
            inning1Bowler.push({ playerId: player[(bowlingTeam - 1) * 11 + i].playerId, playerName: player[(bowlingTeam - 1) * 11 + i].playerName, runs: 0, balls: 0, wickets: 0 });
        }
    }
    const matchData = {
        inning1: { teamId: battingTeam, teamShortName: team[battingTeam - 1].teamShortName, teamName: team[battingTeam - 1].teamName, runs: 0, wickets: 0, striker: player[(battingTeam - 1) * 11].playerId, nonStriker: player[((battingTeam - 1) * 11) + 1].playerId, currentBowler: player[((bowlingTeam - 1) * 11) + 10].playerName, lastBowler: null, isLastBallExtra: false, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        inning2: { teamId: bowlingTeam, teamShortName: team[bowlingTeam - 1].teamShortName, teamName: team[bowlingTeam - 1].teamName, runs: 0, wickets: 0, striker: player[(bowlingTeam - 1) * 11].playerId, nonStriker: player[((bowlingTeam - 1) * 11) + 1].playerId, currentBowler: player[((battingTeam - 1) * 11) + 10].playerName, lastBowler: null, isLastBallExtra: false, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        inning1Batsman: inning1Batsman,
        inning2Batsman: inning2Batsman,
        inning1Bowler: inning1Bowler,
        inning2Bowler: inning2Bowler,
        inning1Commentary: [],
        inning2Commentary: [],
        isSuperOver: false,
        superOverCommentary: [],
    };
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
}
export default setMatchData;