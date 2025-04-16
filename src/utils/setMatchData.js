function setMatchData(battingTeam, bowlingTeam, match) {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    let battingTeamWicketKeeperId = null;
    let bowlingTeamWicketKeeperId = null;
    let inning1Batsman = [];
    let inning2Bowler = [];
    let inning2Batsman = [];
    let inning1Bowler = [];
    for (let i = 0; i < 11; i++) {
        const battingTeamPlayer = squad[(battingTeam - 1) * 11 + i];
        if (battingTeamPlayer.isWicketKeeper) {
            battingTeamWicketKeeperId = battingTeamPlayer.playerId;
        }
        const batsmanIndex = battingStatistics.findIndex(p => p.playerId === battingTeamPlayer.playerId);
        const bowlerIndex = bowlingStatistics.findIndex(p => p.playerId === battingTeamPlayer.playerId);
        if (batsmanIndex === -1) {
            battingStatistics.push({
                playerId: battingTeamPlayer.playerId,
                matches: 1,
                innings: (i === 0 || i === 1) ? 1 : 0,
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
        }
        else if (i === 0 || i === 1) {
            battingStatistics[batsmanIndex].matches += 1;
            battingStatistics[batsmanIndex].innings += 1;
        }
        else {
            battingStatistics[batsmanIndex].matches += 1;
        }
        if ((bowlerIndex === -1) && (battingTeamPlayer.roleId === 2 || battingTeamPlayer.roleId === 3)) {
            bowlingStatistics.push({
                playerId: battingTeamPlayer.playerId,
                matches: 1,
                runs: 0,
                balls: 0,
                wickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeam: null,
            });
        }
        else if ((bowlerIndex !== -1)) {
            bowlingStatistics[bowlerIndex].matches += 1;
        }
        inning1Batsman.push({
            playerId: battingTeamPlayer.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isNotOut: true,
            didNotBat: (i === 0 || i === 1) ? false : true,
            bowling: null,
            caught: null,
            runOut: null,
            stumped: null,
            wicketType: null,
            points: 0
        });
        if (battingTeamPlayer.roleId === 2 || battingTeamPlayer.roleId === 3) {
            inning2Bowler.push({
                playerId: battingTeamPlayer.playerId,
                runs: 0,
                balls: 0,
                wickets: 0,
                points: 0
            });
        }
    }
    for (let i = 0; i < 11; i++) {
        const bowlingTeamPlayer = squad[(bowlingTeam - 1) * 11 + i];
        if (bowlingTeamPlayer.isWicketKeeper) {
            bowlingTeamWicketKeeperId = bowlingTeamPlayer.playerId;
        }
        const batsmanIndex = battingStatistics.findIndex(p => p.playerId === bowlingTeamPlayer.playerId);
        const bowlerIndex = bowlingStatistics.findIndex(p => p.playerId === bowlingTeamPlayer.playerId);
        if (batsmanIndex === -1) {
            battingStatistics.push({
                playerId: bowlingTeamPlayer.playerId,
                matches: 1,
                innings: (i === 0 || i === 1) ? 1 : 0,
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
        }
        else if (i == 0 || i == 1) {
            battingStatistics[batsmanIndex].matches += 1;
            battingStatistics[batsmanIndex].innings += 1;
        }
        else {
            battingStatistics[batsmanIndex].matches += 1;
        }
        if ((bowlerIndex === -1) && (bowlingTeamPlayer.roleId === 2 || bowlingTeamPlayer.roleId === 3)) {
            bowlingStatistics.push({
                playerId: bowlingTeamPlayer.playerId,
                matches: 1,
                runs: 0,
                balls: 0,
                wickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeam: null
            });
        } else if ((bowlerIndex !== -1)) {
            bowlingStatistics[bowlerIndex].matches += 1;
        }
        inning2Batsman.push({
            playerId: bowlingTeamPlayer.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isNotOut: true,
            didNotBat: (i === 0 || i === 1) ? false : true,
            bowling: null,
            caught: null,
            runOut: null,
            stumped: null,
            wicketType: null,
            points: 0
        });
        if (bowlingTeamPlayer.roleId === 2 || bowlingTeamPlayer.roleId === 3) {
            inning1Bowler.push({
                playerId: bowlingTeamPlayer.playerId,
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
            teamName: teams[battingTeam - 1].teamName,
            teamShortName: teams[battingTeam - 1].teamShortName,
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
            strikerId: squad[(battingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((battingTeam - 1) * 11) + 1].playerId,
            playedId: squad[((battingTeam - 1) * 11) + 1].playerId,
            currentBowlerId: squad[((bowlingTeam - 1) * 11) + 10].playerId
        },
        inning2: {
            teamId: bowlingTeam,
            teamName: teams[bowlingTeam - 1].teamName,
            teamShortName: teams[bowlingTeam - 1].teamShortName,
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
            strikerId: squad[(bowlingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            playedId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            currentBowlerId: squad[((battingTeam - 1) * 11) + 10].playerId
        },
        inning1Batsman: inning1Batsman,
        inning1Bowler: inning1Bowler,
        inning1Commentary: [],
        inning2Batsman: inning2Batsman,
        inning2Bowler: inning2Bowler,
        inning2Commentary: [],
        superOverInning1: {
            teamId: bowlingTeam,
            teamName: teams[bowlingTeam - 1].teamName,
            teamShortName: teams[bowlingTeam - 1].teamShortName,
            runs: 0,
            balls: 0,
            wickets: 0,
            strikerId: squad[(bowlingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            playedId: squad[((bowlingTeam - 1) * 11) + 1].playerId,
            currentBowlerId: squad[((battingTeam - 1) * 11) + 10].playerId
        },
        superOverInning1Commentary: [],
        superOverInning2: {
            teamId: battingTeam,
            teamName: teams[battingTeam - 1].teamName,
            teamShortName: teams[battingTeam - 1].teamShortName,
            runs: 0,
            balls: 0,
            wickets: 0,
            strikerId: squad[(battingTeam - 1) * 11].playerId,
            nonStrikerId: squad[((battingTeam - 1) * 11) + 1].playerId,
            playedId: squad[((battingTeam - 1) * 11) + 1].playerId,
            currentBowlerId: squad[((bowlingTeam - 1) * 11) + 10].playerId
        },
        superOverInning2Commentary: []
    };
    localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}
export default setMatchData;