function handleStatistics(matchId) {
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const playerOfTheMatchData = [];
    for (let i = 0; i < matchData.inning1Batsman.length; i++) {
        const playerIndex = battingStatistics.findIndex(p => p.playerId == matchData.inning1Batsman[i].playerId);
        if (playerIndex != -1) {
            if (matchData.inning1Batsman[i].runs >= 50 && matchData.inning1Batsman[i].runs < 100) {
                battingStatistics[playerIndex].halfCenturies++;
            }
            else if (matchData.inning1Batsman[i].runs >= 100) {
                battingStatistics[playerIndex].centuries++;
            }
            if (battingStatistics[playerIndex].innings == 1) {
                battingStatistics[playerIndex].highestScoreRuns = matchData.inning1Batsman[i].runs;
                battingStatistics[playerIndex].highestScoreBalls = matchData.inning1Batsman[i].balls;
                battingStatistics[playerIndex].highestScoreOpponentTeamId = matchData.inning2.teamId;
            }
            else if ((matchData.inning1Batsman[i].runs > battingStatistics[playerIndex].highestScoreRuns) || ((matchData.inning1Batsman[i].runs == battingStatistics[playerIndex].highestScoreRuns) && (matchData.inning1Batsman[i].balls < battingStatistics[playerIndex].highestScoreBalls))) {
                battingStatistics[playerIndex].highestScoreRuns = matchData.inning1Batsman[i].runs;
                battingStatistics[playerIndex].highestScoreBalls = matchData.inning1Batsman[i].balls;
                battingStatistics[playerIndex].highestScoreOpponentTeamId = matchData.inning2.teamId;
            }
            if (matchData.inning1Batsman[i].notOut && !matchData.inning1Batsman[i].didNotBat) {
                battingStatistics[playerIndex].notOut += 1;
            }
        }
        const playerOfTheMatchIndex = playerOfTheMatchData.findIndex(p => p.playerId == matchData.inning1Batsman[i].playerId);
        if (playerOfTheMatchIndex == -1) {
            playerOfTheMatchData.push(
                {
                    playerId: matchData.inning1Batsman[i].playerId,
                    points: matchData.inning1Batsman[i].points
                });
        }
        else {
            playerOfTheMatchData[playerOfTheMatchIndex].points += matchData.inning1Batsman[i].points;
        }
    }
    for (let i = 0; i < matchData.inning1Bowler.length; i++) {
        const playerIndex = bowlingStatistics.findIndex(p => p.playerId === matchData.inning1Bowler[i].playerId);
        if (playerIndex != -1) {
            if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning1Bowler[i].balls > 0) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning1.teamId;
            }
            else if ((matchData.inning1Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning1Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning1Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning1.teamId;
            }
            if (matchData.inning1Bowler[i].wickets >= 5) {
                bowlingStatistics[playerIndex].fiveWickets++;
            }
        }
        const playerOfTheMatchIndex = playerOfTheMatchData.findIndex(p => p.playerId == matchData.inning1Bowler[i].playerId);
        if (playerOfTheMatchIndex == -1) {
            playerOfTheMatchData.push(
                {
                    playerId: matchData.inning1Bowler[i].playerId,
                    points: matchData.inning1Bowler[i].points
                });
        }
        else {
            playerOfTheMatchData[playerOfTheMatchIndex].points += matchData.inning1Bowler[i].points;
        }
    }
    for (let i = 0; i < matchData.inning2Batsman.length; i++) {
        const playerIndex = battingStatistics.findIndex(p => p.playerId == matchData.inning2Batsman[i].playerId);
        if (playerIndex != -1) {
            if (matchData.inning2Batsman[i].runs >= 50 && matchData.inning2Batsman[i].runs < 100) {
                battingStatistics[playerIndex].halfCenturies++;
            }
            else if (matchData.inning2Batsman[i].runs >= 100) {
                battingStatistics[playerIndex].centuries++;
            }
            if (battingStatistics[playerIndex].innings == 1) {
                battingStatistics[playerIndex].highestScoreRuns = matchData.inning2Batsman[i].runs;
                battingStatistics[playerIndex].highestScoreBalls = matchData.inning2Batsman[i].balls;
                battingStatistics[playerIndex].highestScoreOpponentTeamId = matchData.inning1.teamId;
            }
            else if ((matchData.inning2Batsman[i].runs > battingStatistics[playerIndex].highestScoreRuns) || ((matchData.inning2Batsman[i].runs == battingStatistics[playerIndex].highestScoreRuns) && (matchData.inning2Batsman[i].balls < battingStatistics[playerIndex].highestScoreBalls))) {
                battingStatistics[playerIndex].highestScoreRuns = matchData.inning2Batsman[i].runs;
                battingStatistics[playerIndex].highestScoreBalls = matchData.inning2Batsman[i].balls;
                battingStatistics[playerIndex].highestScoreOpponentTeamId = matchData.inning1.teamId;
            }
            if (matchData.inning2Batsman[i].notOut && !matchData.inning2Batsman[i].didNotBat) {
                battingStatistics[playerIndex].notOut += 1;
            }
        }
        const playerOfTheMatchIndex = playerOfTheMatchData.findIndex(p => p.playerId == matchData.inning2Batsman[i].playerId);
        if (playerOfTheMatchIndex == -1) {
            playerOfTheMatchData.push(
                {
                    playerId: matchData.inning2Batsman[i].playerId,
                    points: matchData.inning2Batsman[i].points
                });
        }
        else {
            playerOfTheMatchData[playerOfTheMatchIndex].points += matchData.inning2Batsman[i].points;
        }
    }
    for (let i = 0; i < matchData.inning2Bowler.length; i++) {
        const playerIndex = bowlingStatistics.findIndex(p => p.playerId == matchData.inning2Bowler[i].playerId);
        if (playerIndex != -1) {
            if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning2Bowler[i].balls > 0) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning2.teamId;
            }
            else if ((matchData.inning2Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning2Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning2Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning2.teamId;
            }
            if (matchData.inning2Bowler[i].wickets >= 5) {
                bowlingStatistics[playerIndex].fiveWickets++;
            }
        }
        const playerOfTheMatchIndex = playerOfTheMatchData.findIndex(p => p.playerId == matchData.inning2Bowler[i].playerId);
        if (playerOfTheMatchIndex == -1) {
            playerOfTheMatchData.push(
                {
                    playerId: matchData.inning2Bowler[i].playerId,
                    points: matchData.inning2Bowler[i].points
                });
        }
        else {
            playerOfTheMatchData[playerOfTheMatchIndex].points += matchData.inning2Bowler[i].points;
        }
    }
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
    playerOfTheMatchData.sort((a, b) => (b.points - a.points));
    const playerOfTheMatch = playerOfTheMatchData[0].playerId;
    return playerOfTheMatch;
}
export default handleStatistics;