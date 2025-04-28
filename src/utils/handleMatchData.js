function handleMatchData(battingTeam, bowlingTeam, match) {
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    let battingTeamWicketKeeperId = null;
    let bowlingTeamWicketKeeperId = null;
    let inning1Batsman = [];
    let inning1Bowler = [];
    let inning2Batsman = [];
    let inning2Bowler = [];
    const squad = JSON.parse(localStorage.getItem("squad"));
    for (let i = 0; i < 11; i++) {
        const player = squad[(battingTeam - 1) * 11 + i];
        if (player.wicketKeeper) {
            battingTeamWicketKeeperId = player.playerId;
        }
        const batsmanIndex = battingStatistics.findIndex((p) => (p.playerId == player.playerId));
        const bowlerIndex = bowlingStatistics.findIndex((p) => (p.playerId == player.playerId));
        if (batsmanIndex == -1) {
            battingStatistics.push({
                playerId: player.playerId,
                matches: 1,
                innings: ((i == 0 || i == 1) ? 1 : 0),
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                halfCenturies: 0,
                centuries: 0,
                dismissed: 0,
                highestScoreRuns: 0,
                highestScoreBalls: 0,
                highestScoreOpponentTeamId: null
            });
        }
        else if (i == 0 || i == 1) {
            battingStatistics[batsmanIndex].matches += 1;
            battingStatistics[batsmanIndex].innings += 1;
        }
        else {
            battingStatistics[batsmanIndex].matches += 1;
        }
        if ((bowlerIndex == -1) && (player.roleId == 2 || player.roleId == 3)) {
            bowlingStatistics.push({
                playerId: player.playerId,
                matches: 1,
                runs: 0,
                balls: 0,
                wickets: 0,
                fiveWickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeamId: null
            })
        }
        else if ((bowlerIndex != -1)) {
            bowlingStatistics[bowlerIndex].matches += 1;
        }
        inning1Batsman.push({
            playerId: player.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            points: 0,
            notOut: true,
            didNotBat: ((i == 0 || i == 1) ? false : true),
            wicketById: null,
            caughtById: null,
            stumpedById: null,
            runOutById: null,
            wicketTypeId: null
        });
        if (player.roleId == 2 || player.roleId == 3) {
            inning2Bowler.push({
                playerId: player.playerId,
                runs: 0,
                balls: 0,
                wickets: 0,
                points: 0
            });
        }
    }
    for (let i = 0; i < 11; i++) {
        const player = squad[(bowlingTeam - 1) * 11 + i];
        if (player.wicketKeeper) {
            bowlingTeamWicketKeeperId = player.playerId;
        }
        const batsmanIndex = battingStatistics.findIndex((p) => p.playerId == player.playerId);
        const bowlerIndex = bowlingStatistics.findIndex((p) => p.playerId == player.playerId);
        if (batsmanIndex == -1) {
            battingStatistics.push({
                playerId: player.playerId,
                matches: 1,
                innings: ((i == 0 || i == 1) ? 1 : 0),
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                halfCenturies: 0,
                centuries: 0,
                dismissed: 0,
                highestScoreRuns: 0,
                highestScoreBalls: 0,
                highestScoreOpponentTeamId: null
            });
        }
        else if (i == 0 || i == 1) {
            battingStatistics[batsmanIndex].matches += 1;
            battingStatistics[batsmanIndex].innings += 1;
        }
        else {
            battingStatistics[batsmanIndex].matches += 1;
        }
        if ((bowlerIndex == -1) && (player.roleId == 2 || player.roleId == 3)) {
            bowlingStatistics.push({
                playerId: player.playerId,
                matches: 1,
                runs: 0,
                balls: 0,
                wickets: 0,
                fiveWickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeamId: null
            });
        } else if ((bowlerIndex != -1)) {
            bowlingStatistics[bowlerIndex].matches += 1;
        }
        inning2Batsman.push({
            playerId: player.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            points: 0,
            notOut: true,
            didNotBat: ((i == 0 || i == 1) ? false : true),
            wicketById: null,
            caughtById: null,
            stumpedById: null,
            runOutById: null,
            wicketTypeId: null
        });
        if (player.roleId == 2 || player.roleId == 3) {
            inning1Bowler.push({
                playerId: player.playerId,
                runs: 0,
                balls: 0,
                wickets: 0,
                points: 0
            });
        }
    }
    const matchData = {
        inning1: {
            teamId: battingTeam,
            runs: 0,
            balls: 0,
            wickets: 0,
            extras: 0,
            wides: 0,
            noBalls: 0,
            legByes: 0,
            byes: 0,
            lastBallExtra: false,
            lastBallFreeHit: false,
            strikerId: squad[(battingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((battingTeam - 1) * 11) + 1].playerId,
            lastNewBatsmanId: squad[((battingTeam - 1) * 11) + 1].playerId,
            bowlerId: squad[((bowlingTeam - 1) * 11) + 10].playerId,
            wicketKeeperId: battingTeamWicketKeeperId
        },
        inning2: {
            teamId: bowlingTeam,
            runs: 0,
            balls: 0,
            wickets: 0,
            extras: 0,
            wides: 0,
            noBalls: 0,
            legByes: 0,
            byes: 0,
            lastBallExtra: false,
            lastBallFreeHit: false,
            strikerId: squad[(bowlingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            lastNewBatsmanId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            bowlerId: squad[((battingTeam - 1) * 11) + 10].playerId,
            wicketKeeperId: bowlingTeamWicketKeeperId
        },
        inning1Batsman: inning1Batsman,
        inning1Bowler: inning1Bowler,
        inning2Batsman: inning2Batsman,
        inning2Bowler: inning2Bowler,
        commentary: [],
        superOverInning1: {
            teamId: bowlingTeam,
            runs: 0,
            balls: 0,
            wickets: 0,
            lastBallFreeHit: false,
            strikerId: squad[(bowlingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            lastNewBatsmanId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            bowlerId: squad[((battingTeam - 1) * 11) + 10].playerId
        },
        superOverInning2: {
            teamId: battingTeam,
            runs: 0,
            balls: 0,
            wickets: 0,
            lastBallFreeHit: false,
            strikerId: squad[(battingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((battingTeam - 1) * 11) + 1].playerId,
            lastNewBatsmanId: squad[((battingTeam - 1) * 11) + 1].playerId,
            bowlerId: squad[((bowlingTeam - 1) * 11) + 10].playerId
        }
    }
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}
export default handleMatchData;