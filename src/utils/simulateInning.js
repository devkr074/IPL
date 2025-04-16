import getCommentary from "./getCommentary.js";
import getNewBowler from "./getNewBowler.js";
import getBallOutcome from "./getBallOutcome.js";
function simulateInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    if ((matchData[`inning${inning}`].wickets < 10) && (matchData[`inning${inning}`].balls < 120) && ((inning === 2) ? (matchData.inning1.runs >= matchData.inning2.runs) : true)) {
        const striker = squad[matchData[`inning${inning}`].strikerId - 1];
        const bowler = squad[matchData[`inning${inning}`].currentBowlerId - 1];
        const ballOutcome = getBallOutcome(striker.roleId);
        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const strikerIndexStatistics = battingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const bowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);
        const bowlerIndexStatistics = bowlingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);
        switch (ballOutcome) {
            case 0:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "no run",
                    commentary: getCommentary(ballOutcome)
                });
                break;
            case 1:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].runs++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].runs++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "1 run",
                    commentary: getCommentary(ballOutcome)
                });
                swapPlayer(inning, matchData);
                break;
            case 2:
                matchData[`inning${inning}`].runs += 2;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].runs += 2;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 2;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].runs += 2;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "2 runs",
                    commentary: getCommentary(ballOutcome)
                });
                break;
            case 3:
                matchData[`inning${inning}`].runs += 3;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].runs += 3;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 3;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].runs += 3;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "3 runs",
                    commentary: getCommentary(ballOutcome)
                });
                swapPlayer(inning, matchData);
                break;
            case 4:
                matchData[`inning${inning}`].runs += 4;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].runs += 4;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
                battingStatistics[strikerIndexStatistics].fours++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 4;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].runs += 4;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "FOUR",
                    commentary: getCommentary(ballOutcome)
                });
                break;
            case 6:
                matchData[`inning${inning}`].runs += 6;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].runs += 6;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
                battingStatistics[strikerIndexStatistics].sixes++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 6;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].runs += 6;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "SIX",
                    commentary: getCommentary(ballOutcome)
                });
                break;
            case 5:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].caught = getRandomFielderId(inning, matchData, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 1;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "OUT",
                    commentary: getCommentary(ballOutcome)
                });
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics);
                break;
            case 7:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 2;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "OUT",
                    commentary: getCommentary(ballOutcome)
                });
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics);
                break;
            case 8:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 3;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "OUT",
                    commentary: getCommentary(ballOutcome)
                });
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics);
                break;
            case 9:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumped = matchData[`inning${(inning === 1) ? "2" : "1"}`].wicketKeeperId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 4;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "OUT",
                    commentary: getCommentary(ballOutcome)
                });
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics);
                break;
            case 10:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOut = getRandomFielderId(inning, matchData, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 5;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "OUT",
                    commentary: getCommentary(ballOutcome)
                });
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics);
                break;
            case 11:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].wide++;
                matchData[`inning${inning}`].isLastBallExtra = true;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
                bowlingStatistics[bowlerIndexStatistics].runs++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "wide",
                    commentary: getCommentary(ballOutcome)
                });
                matchData[`inning${inning}`].balls--;
                break;
            case 12:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].noBall++;
                matchData[`inning${inning}`].isLastBallExtra = true;
                matchData[`inning${inning}`].isFreeHit = true;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
                bowlingStatistics[bowlerIndexStatistics].runs++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "NO BALL",
                    commentary: getCommentary(ballOutcome)
                });
                matchData[`inning${inning}`].balls--;
                break;
            case 13:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].legBye++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "Leg Bye",
                    commentary: getCommentary(ballOutcome)
                });
                break;
            case 14:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].bye++;
                matchData[`inning${inning}`].isLastBallExtra = false;
                matchData[`inning${inning}`].isFreeHit = false;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "Bye",
                    commentary: getCommentary(ballOutcome)
                });
                break;
        }
        if (!matchData[`inning${inning}`].isLastBallExtra && (matchData[`inning${inning}`].balls % 6) == 0 && (matchData[`inning${inning}`].balls != 0)) {
            swapPlayer(inning, matchData);
            matchData[`inning${inning}`].currentBowlerId = getNewBowler(inning, matchId, matchData[`inning${inning}`].currentBowlerId);
        }
        saveData(matchId, matchData, battingStatistics, bowlingStatistics);
        simulateInning(inning, matchId);
    }
    else if (inning === 1) {
        simulateInning(2, matchId);
    }
}
export default simulateInning;

function getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData, strikerIndexStatistics) {
    matchData[`inning${inning}Batsman`][strikerIndexMatchData].isNotOut = false;
    if (matchData[`inning${inning}`].wickets == 10) {
        return;
    }
    else {
        matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].playedId + 1;
        matchData[`inning${inning}`].playedId++;
        const strikerIndex = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const strikerIndex2 = battingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        matchData[`inning${inning}Batsman`][strikerIndex].didNotBat = false;
        battingStatistics[strikerIndex2].innings++;
    }
}

function swapPlayer(inning, matchData) {
    const temp = matchData[`inning${inning}`].strikerId;
    matchData[`inning${inning}`].strikerId = matchData[`inning${inning}`].nonStrikerId;
    matchData[`inning${inning}`].nonStrikerId = temp;
}

function saveData(matchId, matchData, battingStatistics, bowlingStatistics) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}

function getRandomFielderId(inning, matchData, squad) {
    const fieldingTeamId = (inning === 1) ? matchData.inning2.teamId : matchData.inning1.teamId;
    let fielders = [];
    for (let i = 0; i < 11; i++) {
        fielders.push(squad[(fieldingTeamId - 1) * 11 + i].playerId);
    }
    const randomIndex = Math.floor(Math.random() * fielders.length);
    return fielders[randomIndex];
}