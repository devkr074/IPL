import getCommentary from "./handleCommentary.js";
import getNewBowler from "./handleNewBowler.js";
import getBallOutcome from "./handleBallOutcome.js";
function handleInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
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
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "no run",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 1:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points++;
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
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 2:
            matchData[`inning${inning}`].runs += 2;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 2;
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
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 3:
            matchData[`inning${inning}`].runs += 3;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 3;
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
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 4:
            matchData[`inning${inning}`].runs += 4;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 4;
            battingStatistics[strikerIndexStatistics].runs += 4;
            battingStatistics[strikerIndexStatistics].balls++;
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
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 6:
            matchData[`inning${inning}`].runs += 6;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 6;
            battingStatistics[strikerIndexStatistics].runs += 6;
            battingStatistics[strikerIndexStatistics].balls++;
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
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 5:
            matchData[`inning${inning}`].balls++;
            if (!matchData[`inning${inning}`].isFreeHit) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].caught = getRandomFielderId(inning, matchData, squad);
                const catcherIndex = matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`].findIndex(p => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].caught);
                matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`][catcherIndex].points += 10;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 1;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: (!matchData[`inning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`inning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData);
            }
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 7:
            matchData[`inning${inning}`].balls++;
            if (!matchData[`inning${inning}`].isFreeHit) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 2;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: (!matchData[`inning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`inning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData);
            }
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 8:
            matchData[`inning${inning}`].balls++;
            if (!matchData[`inning${inning}`].isFreeHit) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 3;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: (!matchData[`inning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`inning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData);
            }
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 9:
            matchData[`inning${inning}`].balls++;
            if (!matchData[`inning${inning}`].isFreeHit) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumped = matchData[`inning${(inning === 1) ? "2" : "1"}`].wicketKeeperId;
                const wicketKeeperIndex = matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`].findIndex(p => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumped);
                matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`][wicketKeeperIndex].points += 10;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 4;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: (!matchData[`inning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`inning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData);
            }
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 10:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].wickets++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOut = getRandomFielderId(inning, matchData, squad);
            const fielderIndex = matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`].findIndex(p => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOut);
            matchData[`inning${(inning === 1) ? "2" : "1"}Batsman`][fielderIndex].points += 10;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 5;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "OUT",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData);
            matchData[`inning${inning}`].isFreeHit = false;
            break;
        case 11:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].wide++;
            matchData[`inning${inning}`].isLastBallExtra = true;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "wide",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].balls--;
            if (!matchData[`inning${inning}`].isFreeHit) {
                matchData[`inning${inning}`].isFreeHit = false;
            }
            break;
        case 12:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].noBall++;
            matchData[`inning${inning}`].isLastBallExtra = true;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "NO BALL",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = true;
            matchData[`inning${inning}`].balls--;
            break;
        case 13:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].legBye++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "Leg Bye",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 14:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].bye++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData[`inning${inning}Commentary`].push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "Bye",
                commentary: getCommentary(matchData[`inning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
    }
    if (!matchData[`inning${inning}`].isLastBallExtra && (matchData[`inning${inning}`].balls % 6) == 0 && (matchData[`inning${inning}`].balls != 0)) {
        swapPlayer(inning, matchData);
        matchData[`inning${inning}`].currentBowlerId = getNewBowler(inning, matchId, matchData[`inning${inning}`]?.currentBowlerId);
    }
    saveData(matchId, matchData, battingStatistics, bowlingStatistics);
}
export default handleInning;

function getNewStriker(inning, matchData, battingStatistics, strikerIndexMatchData) {
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
    battingStatistics.sort((a, b) => b.runs - a.runs);
    bowlingStatistics.sort((a, b) => b.wickets - a.wickets);
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
    localStorage.setItem("orangeCap", JSON.stringify(battingStatistics[0]));
    localStorage.setItem("purpleCap", JSON.stringify(bowlingStatistics[0]));
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