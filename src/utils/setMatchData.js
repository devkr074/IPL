function setMatchData(battingTeam, bowlingTeam, match) {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    let battingTeamCaptainId = null;
    let battingTeamWicketKeeperId = null;
    let bowlingTeamCaptainId = null;
    let bowlingTeamWicketKeeperId = null;
    const inning1Batsman = [];
    const inning2Bowler = [];
    const processTeam = (teamId, isBattingTeam) => {
        const startIndex = (teamId - 1) * 11;
        const teamPlayers = Array.from({ length: 11 }, (_, i) => squad[startIndex + i]);
        const batsmen = [];
        const bowlers = [];
        let captainId = null;
        let wicketKeeperId = null;
        teamPlayers.forEach((player, index) => {
            if (!player) return;
            if (player.isCaptain) captainId = player.playerId;
            if (player.isWicketKeeper) wicketKeeperId = player.playerId;
            const batsmanIndex = battingStatistics.findIndex((p) => p.playerId === player.playerId);
            const bowlerIndex = bowlingStatistics.findIndex((p) => p.playerId === player.playerId);
            if (batsmanIndex === -1) {
                battingStatistics.push({
                    playerId: player.playerId,
                    matches: 1,
                    innings: (index === 0 || index === 1) ? 1 : 0,
                    runs: 0,
                    balls: 0,
                    fours: 0,
                    sixes: 0,
                    halfCenturies: 0,
                    centuries: 0,
                    notOut: 0,
                    highestScoreRuns: 0,
                    highestScoreBalls: 0,
                    highestScoreOpponentTeam: null,
                });
            } else {
                battingStatistics[batsmanIndex].matches += 1;
                if (index === 0 || index === 1) {
                    battingStatistics[batsmanIndex].innings += 1;
                }
            }
            const batsmanInningData = {
                playerId: player.playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true,
                didNotBat: !(index === 0 || index === 1),
                wicketById: null,
                caughtById: null,
                runOutById: null,
                stumpedById: null,
                wicketTypeId: null,
                points: 0,
            };
            batsmen.push(batsmanInningData);
            if ((player.roleId === 2 || player.roleId === 3)) {
                if (bowlerIndex === -1) {
                    bowlingStatistics.push({
                        playerId: player.playerId,
                        matches: 1,
                        runs: 0,
                        wickets: 0,
                        bestBowlingWickets: 0,
                        bestBowlingRuns: 0,
                        bestBowlingOpponentTeam: null,
                    });
                } else {
                    bowlingStatistics[bowlerIndex].matches += 1;
                }
                bowlers.push({
                    playerId: player.playerId,
                    runs: 0,
                    balls: 0,
                    wickets: 0,
                    points: 0,
                });
            }
        });
        return { captainId, wicketKeeperId, batsmen, bowlers };
    };
    const battingTeamData = processTeam(battingTeam, true);
    battingTeamCaptainId = battingTeamData.captainId;
    battingTeamWicketKeeperId = battingTeamData.wicketKeeperId;
    inning1Batsman.push(...battingTeamData.batsmen);
    inning2Bowler.push(...battingTeamData.bowlers);
    const bowlingTeamData = processTeam(bowlingTeam, false);
    bowlingTeamCaptainId = bowlingTeamData.captainId;
    bowlingTeamWicketKeeperId = bowlingTeamData.wicketKeeperId;
    const inning2Batsman = bowlingTeamData.batsmen;
    const inning1Bowler = bowlingTeamData.bowlers;
    const getTeamInfo = (teamId) => {
        const team = teams.find((t) => t.teamId === teamId);
        return team
            ? {
                teamId: team.teamId,
                teamShortName: team.teamShortName,
                teamName: team.teamName,
            }
            : { teamId: null, teamShortName: null, teamName: null };
    };
    const battingTeamInfo = getTeamInfo(battingTeam);
    const bowlingTeamInfo = getTeamInfo(bowlingTeam);
    const getInitialStrikerNonStriker = (teamId) => {
        const startIndex = (teamId - 1) * 11;
        return {
            strikerId: squad[startIndex]?.playerId || null,
            nonStrikerId: squad[startIndex + 1]?.playerId || null,
            playedId: squad[startIndex + 1]?.playerId || null,
        };
    };
    const battingOrder = getInitialStrikerNonStriker(battingTeam);
    const bowlingOrder = getInitialStrikerNonStriker(bowlingTeam);
    const matchData = {
        inning1: {
            ...battingTeamInfo,
            captainId: battingTeamCaptainId,
            wicketKeeperId: battingTeamWicketKeeperId,
            runs: 0,
            balls: 0,
            wickets: 0,
            extras: 0,
            wide: 0,
            noBall: 0,
            legBye: 0,
            bye: 0,
            isLastBallExtra: false,
            isFreeHit: false,
            strikerId: battingOrder.strikerId,
            nonStrikerId: battingOrder.nonStrikerId,
            playedId: battingOrder.playedId,
            currentBowlerId: squad[((bowlingTeam - 1) * 11) + 10]?.playerId || null,
            lastBowlerId: null,
        },
        inning2: {
            ...bowlingTeamInfo,
            captainId: bowlingTeamCaptainId,
            wicketKeeperId: bowlingTeamWicketKeeperId,
            runs: 0,
            balls: 0,
            wickets: 0,
            extras: 0,
            wide: 0,
            noBall: 0,
            legBye: 0,
            bye: 0,
            isLastBallExtra: false,
            isFreeHit: false,
            strikerId: bowlingOrder.strikerId,
            nonStrikerId: bowlingOrder.nonStrikerId,
            playedId: bowlingOrder.playedId,
            currentBowlerId: squad[((battingTeam - 1) * 11) + 10]?.playerId || null,
            lastBowlerId: null,
        },
        inning1Batsman,
        inning1Bowler,
        inning1Commentary: [],
        inning2Batsman,
        inning2Bowler,
        inning2Commentary: [],
        isSuperOver: false,
        superOverInning1: {
            ...bowlingTeamInfo,
            runs: 0,
            balls: 0,
            wickets: 0,
            strikerId: bowlingOrder.strikerId,
            nonStrikerId: bowlingOrder.nonStrikerId,
            playedId: bowlingOrder.playedId,
            currentBowlerId: squad[((battingTeam - 1) * 11) + 10]?.playerId || null,
        },
        superOverInning1Commentary: [],
        superOverInning2: {
            ...battingTeamInfo,
            runs: 0,
            balls: 0,
            wickets: 0,
            strikerId: battingOrder.strikerId,
            nonStrikerId: battingOrder.nonStrikerId,
            playedId: battingOrder.playedId,
            currentBowlerId: squad[((bowlingTeam - 1) * 11) + 10]?.playerId || null,
        },
        superOverInning2Commentary: [],
    };
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}
export default setMatchData;