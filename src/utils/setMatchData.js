function setMatchData(battingTeam, bowlingTeam, match, team) {
    const matchData = {
        inning1: { teamShortName: team[battingTeam - 1].teamShortName, teamName: team[battingTeam - 1].teamName, runs: 0, wickets: 0, striker: 0, nonStriker: 1, currentBowler: null, lastBowler: null, isLastBallExtra: false, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        inning2: { teamShortName: team[bowlingTeam - 1].teamShortName, teamName: team[bowlingTeam - 1].teamShortName, runs: 0, wickets: 0, striker: 0, nonStriker: 0, currentBowler: null, lastBowler: null, isLastBallExtra: false, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        inning1Batsman: [],
        inning2Batsman: [],
        inning1Bowler: [],
        inning2Bowler: [],
        inning1Commentary: [],
        inning2Commentary: [],
        isSuperOver: false,
        superOverCommentary: [],
    };
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
}
export default setMatchData;