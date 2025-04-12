function setMatchData(match) {
    const matchData = {
        firstInning: { teamShortName: "", teamName: "", runs: 0, wickets: 0, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        secondInning: { teamShortName: "", teamName: "", runs: 0, wickets: 0, balls: 0, wide: 0, noBall: 0, legBye: 0, bye: 0, extras: 0 },
        firstInningBatsman: [],
        secondInningBatsman: [],
        firstInningBowler: [],
        secondInningBowler: [],
        firstInningCommentary: [],
        secondInningCommentary: [],
        isSuperOver: false,
        superOverCommentary: [],
    };
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
}
export default setMatchData;