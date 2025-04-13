function setMatchData(battingTeam, bowlingTeam, match, team, player, battingStatistic, bowlingStatistic) {
    let inning1Batsman = [];
    let inning2Bowler = [];
    for (let i = 0; i < 11; i++) {
        const battingTeamPlayer = player[(battingTeam - 1) * 11 + i];
        const battingIndex = battingStatistic.findIndex(stat => stat.playerId === battingTeamPlayer.playerId);
        const bowlingIndex = bowlingStatistic.findIndex(stat => stat.playerId === battingTeamPlayer.playerId);
        if (battingIndex === -1) {
            battingStatistic.push({
                playerId: battingTeamPlayer.playerId,
                matches: 1,
                innings: 0,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                halfCentury: 0,
                century: 0,
                notOut: 0,
                highestScoreRuns: 0,
                highestScoreBalls: 0,
                highestScoreOpponentTeam: "",
            });
        } else if (i == 0 || i == 1) {
            battingStatistic[battingIndex].matches += 1;
            battingStatistic[battingIndex].innings += 1;
        }
        else {
            battingStatistic[battingIndex].matches += 1;
        }
        if ((bowlingIndex === -1) && (battingTeamPlayer.roleId === 2 || battingTeamPlayer.roleId === 3)) {
            bowlingStatistic.push({
                playerId: battingTeamPlayer.playerId,
                matches: 1,
                runs: 0,
                wickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeam: "",
            });
        }
        else if ((bowlingIndex !== -1)) {
            bowlingStatistic[bowlingIndex].matches += 1;
        }
        inning1Batsman.push({
            playerId: battingTeamPlayer.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            isNotOut: true,
            isDidNotBat: true,
        });
        if (battingTeamPlayer.roleId === 2 || battingTeamPlayer.roleId === 3) {
            inning2Bowler.push({
                playerId: battingTeamPlayer.playerId,
                runs: 0,
                balls: 0,
                wickets: 0,
            });
        }
    }
    let inning2Batsman = [];
    let inning1Bowler = [];
    for (let i = 0; i < 11; i++) {
        const bowlingTeamPlayer = player[(bowlingTeam - 1) * 11 + i];
        const battingIndex = battingStatistic.findIndex(stat => stat.playerId === bowlingTeamPlayer.playerId);
        const bowlingIndex = bowlingStatistic.findIndex(stat => stat.playerId === bowlingTeamPlayer.playerId);
        if (battingIndex === -1) {
            battingStatistic.push({
                playerId: bowlingTeamPlayer.playerId,
                matches: 1,
                innings: 0,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                halfCentury: 0,
                century: 0,
                notOut: 0,
                highestScoreRuns: 0,
                highestScoreBalls: 0,
                highestScoreOpponentTeam: "",
            });
        } else if (i == 0 || i == 1) {
            battingStatistic[battingIndex].matches += 1;
            battingStatistic[battingIndex].innings += 1;
        }
        else {
            battingStatistic[battingIndex].matches += 1;
        }
        if ((bowlingIndex === -1) && (bowlingTeamPlayer.roleId === 2 || bowlingTeamPlayer.roleId === 3)) {
            bowlingStatistic.push({
                playerId: bowlingTeamPlayer.playerId,
                matches: 1,
                runs: 0,
                wickets: 0,
                bestBowlingWickets: 0,
                bestBowlingRuns: 0,
                bestBowlingOpponentTeam: "",
            });
        } else if ((bowlingIndex !== -1)) {
            bowlingStatistic[bowlingIndex].matches += 1;
        }
        inning2Batsman.push({
            playerId: bowlingTeamPlayer.playerId,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            isNotOut: true,
            isDidNotBat: true,
        });

        if (bowlingTeamPlayer.roleId === 2 || bowlingTeamPlayer.roleId === 3) {
            inning1Bowler.push({
                playerId: bowlingTeamPlayer.playerId,
                runs: 0,
                balls: 0,
                wickets: 0,
            });
        }
    }
    const matchData = {
        inning1: {
            teamId: battingTeam,
            teamShortName: team[battingTeam - 1].teamShortName,
            teamName: team[battingTeam - 1].teamName,
            runs: 0,
            wickets: 0,
            striker: player[(battingTeam - 1) * 11].playerId,
            nonStriker: player[((battingTeam - 1) * 11) + 1].playerId,
            played: player[((battingTeam - 1) * 11) + 1].playerId,
            currentBowler: player[((bowlingTeam - 1) * 11) + 10].playerId,
            lastBowler: null,
            isLastBallExtra: false,
            balls: 0,
            wide: 0,
            noBall: 0,
            legBye: 0,
            bye: 0,
            extras: 0,
        },
        inning2: {
            teamId: bowlingTeam,
            teamShortName: team[bowlingTeam - 1].teamShortName,
            teamName: team[bowlingTeam - 1].teamName,
            runs: 0,
            wickets: 0,
            striker: player[(bowlingTeam - 1) * 11].playerId,
            nonStriker: player[((bowlingTeam - 1) * 11) + 1].playerId,
            played: player[((bowlingTeam - 1) * 11) + 1].playerId,
            currentBowler: player[((battingTeam - 1) * 11) + 10].playerId,
            lastBowler: null,
            isLastBallExtra: false,
            balls: 0,
            wide: 0,
            noBall: 0,
            legBye: 0,
            bye: 0,
            extras: 0,
        },
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
    localStorage.setItem("battingStatistic", JSON.stringify(battingStatistic));
    localStorage.setItem("bowlingStatistic", JSON.stringify(bowlingStatistic));
}
export default setMatchData;