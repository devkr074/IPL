import getBallOutcome from "./getBallOutcome.js";
import getBallCommentary from "./getBallCommentary.js";
import getNewBowler from "./getNewBowler.js";
function simulateInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
    const squad = JSON.parse(localStorage.getItem("squad"));
    if (matchData[`inning${inning}`].balls < 120 && matchData[`inning${inning}`].wickets < 10 && (inning == 2 ? (matchData.inning1.runs >= matchData.inning2.runs) : true)) {
        const ballOutcome = getBallOutcome(squad[matchData[`inning${inning}`].strikerId - 1].roleId);
        if ((!matchData[`inning${inning}`].isLastBallExtra) && (matchData[`inning${inning}`].balls % 6 == 0) && (matchData[`inning${inning}`].balls != 0)) {
            swapPlayer(inning, matchId, matchData);
            matchData[`inning${inning}`].currentBowlerId = getNewBowler(inning, matchId, matchData[`inning${inning}`].currentBowlerId);
        }
        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const strikerIndexStatistic = battingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const currentBowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);
        const currentBowlerIndexStatistic = bowlingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);
        if (ballOutcome == 0) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistic].balls++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "Dot Ball",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 1) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].runs++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
            battingStatistics[strikerIndexStatistic].balls++;
            battingStatistics[strikerIndexStatistic].runs++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "1 Run",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`inning${inning}`].strikerId;
            matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].nonStrikerId;
            matchData[`inning${inning}`].nonStrikerId = temp;
        }
        else if (ballOutcome == 2) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 2;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 2;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].runs += 2;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
            battingStatistics[strikerIndexStatistic].balls++;
            battingStatistics[strikerIndexStatistic].runs += 2;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "2 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 3) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 3;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 3;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].runs += 3;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
            battingStatistics[strikerIndexStatistic].balls++;
            battingStatistics[strikerIndexStatistic].runs += 3;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "3 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            swapPlayer(inning, matchId, matchData);
        }
        else if (ballOutcome == 4) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 4;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 4;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].runs += 4;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
            battingStatistics[strikerIndexStatistic].balls++;
            battingStatistics[strikerIndexStatistic].runs += 4;
            battingStatistics[strikerIndexStatistic].fours++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "4 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 5) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].wickets++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].wickets++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistic].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].isNotOut = false;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "Out",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            localStorage.setItem("match", JSON.stringify(matchData));
            if (matchData[`inning${inning}`].wickets != 10) {
                matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].playedId + 1;
                matchData[`inning${inning}`].playedId = matchData[`inning${inning}`].strikerId;
            }
        }
        else if (ballOutcome == 6) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 6;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 6;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].runs += 6;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
            battingStatistics[strikerIndexStatistic].balls++;
            battingStatistics[strikerIndexStatistic].runs += 6;
            battingStatistics[strikerIndexStatistic].sixes++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "6 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 7) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = true;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: squad[matchData[`inning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`inning${inning}`].strikerId - 1].playerName,
                    outcome: "Wide Ball",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`inning${inning}`].balls--;
        }
        saveMatchData(matchId, matchData);
        localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
        localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
        simulateInning(inning, matchId);
    }
    else if (inning == 1) {
        simulateInning(2, matchId, 0);
    }
}
export default simulateInning;

function swapPlayer(inning, matchId, matchData) {
    let temp = matchData[`inning${inning}`].strikerId;
    matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].nonStrikerId;
    matchData[`inning${inning}`].nonStrikerId = temp;
    saveMatchData(matchId, matchData);
}

function saveMatchData(matchId, matchData) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
}

function saveStatistics() {
    console.log("Hello");
}