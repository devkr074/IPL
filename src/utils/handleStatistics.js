function handleStatistics(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
    const fixture = JSON.parse(localStorage.getItem("fixture"));
    const players = [];
    function updatePlayerPoints(playerId, points) {
        const existingPlayer = players.find(p => p.playerId == playerId);
        if (existingPlayer) {
            existingPlayer.points += points;
        } else {
            players.push({
                playerId: playerId,
                points: points
            });
        }
    }
    for (let i = 0; i < matchData.inning1Batsman.length; i++) {
        updatePlayerPoints(
            matchData.inning1Batsman[i].playerId,
            matchData.inning1Batsman[i].points
        );
        const playerIndex = battingStatistics.findIndex(p => p.playerId === matchData.inning1Batsman[i].playerId);
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
            if (matchData.inning1Batsman[i].isNotOut && !matchData.inning1Batsman[i].didNotBat) {
                battingStatistics[playerIndex].notOut += 1;
            }
        }
    }
    for (let i = 0; i < matchData.inning1Bowler.length; i++) {
        updatePlayerPoints(
            matchData.inning1Bowler[i].playerId,
            matchData.inning1Bowler[i].points
        );
        const playerIndex = bowlingStatistics.findIndex(p => p.playerId === matchData.inning1Bowler[i].playerId);
        if (playerIndex != -1) {
            if (matchData.inning1Bowler[i].wickets >= 5) {
                bowlingStatistics[playerIndex].fiveWickets++;
            }
            if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning1Bowler[i].balls > 0) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning2.teamId;
            }
            else if ((matchData.inning1Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning1Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning1Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning1Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning1Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning2.teamId;
            }
        }
    }
    for (let i = 0; i < matchData.inning2Batsman.length; i++) {
        updatePlayerPoints(
            matchData.inning2Batsman[i].playerId,
            matchData.inning2Batsman[i].points
        );
        const playerIndex = battingStatistics.findIndex(p => p.playerId === matchData.inning2Batsman[i].playerId);
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
            if (matchData.inning2Batsman[i].isNotOut && !matchData.inning2Batsman[i].didNotBat) {
                battingStatistics[playerIndex].notOut += 1;
            }
        }
    }
    for (let i = 0; i < matchData.inning2Bowler.length; i++) {
        updatePlayerPoints(
            matchData.inning2Bowler[i].playerId,
            matchData.inning2Bowler[i].points
        );
        const playerIndex = bowlingStatistics.findIndex(p => p.playerId === matchData.inning2Bowler[i].playerId);
        if (playerIndex != -1) {
            if (matchData.inning2Bowler[i].wickets >= 5) {
                bowlingStatistics[playerIndex].fiveWickets++;
            }
            if (bowlingStatistics[playerIndex].matches == 1 && matchData.inning2Bowler[i].balls > 0) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning1.teamId;
            }
            else if ((matchData.inning2Bowler[i].wickets > bowlingStatistics[playerIndex].bestBowlingWickets) || ((matchData.inning2Bowler[i].wickets == bowlingStatistics[playerIndex].bestBowlingWickets) && (matchData.inning2Bowler[i].runs < bowlingStatistics[playerIndex].bestBowlingRuns))) {
                bowlingStatistics[playerIndex].bestBowlingWickets = matchData.inning2Bowler[i].wickets;
                bowlingStatistics[playerIndex].bestBowlingRuns = matchData.inning2Bowler[i].runs;
                bowlingStatistics[playerIndex].bestBowlingOpponentTeamId = matchData.inning1.teamId;
            }
        }
    }
    console.log(players);
    players.sort((a, b) => b.points - a.points);
    fixture[matchId - 1].playerOfTheMatch = players[0].playerId;
    localStorage.setItem("fixture", JSON.stringify(fixture));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}
export default handleStatistics;