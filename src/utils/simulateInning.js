import getCommentary from "./getCommentary.js";
import getNewBowler from "./getNewBowler.js";
import getBallOutcome from "./getBallOutcome.js";
function simulateInning(inning, matchId) {
    let matchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    if ((matchData[`inning${inning}`].wickets < 10) && (matchData[`inning${inning}`].balls < 120) && ((inning === 2) ? (matchData.inning1.runs >= matchData.inning2.runs) : true)) {
        const striker = squad[matchData[`inning${inning}`].strikerId - 1];
        const bowler = squad[matchData[`inning${inning}`].currentBowlerId - 1];
        const ballOutcome = getBallOutcome(striker.roleId);
        if (!matchData[`inning${inning}`].isLastBallExtra && matchData[`inning${inning}`].balls % 6 === 0 && matchData[`inning${inning}`].balls !== 0) {
            swapPlayer(matchData[`inning${inning}`]);
            matchData[`inning${inning}`].currentBowlerId = getNewBowler(inning, matchId, matchData[`inning${inning}`].currentBowlerId);
        }

        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const strikerIndexStatistics = battingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].strikerId);
        const bowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);
        const bowlerIndexStatistics = bowlingStatistics.findIndex(p => p.playerId === matchData[`inning${inning}`].currentBowlerId);


        switch (ballOutcome) {
            case 0:
                matchData[`inning${inning}`].balls++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
                bowlingStatistics[bowlerIndexStatistics].balls++;
                matchData[`inning${inning}Commentary`].push({
                    ball: matchData[`inning${inning}`].balls,
                    batsman: striker.playerName,
                    bowler: bowler.playerName,
                    outcome: "no run. ",
                    commentary: getCommentary(ballOutcome)
                });
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 1:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].balls++;
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
                    outcome: "1 run. ",
                    commentary: getCommentary(ballOutcome)
                });
                swapPlayer(inning, matchData);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 2:
                matchData[`inning${inning}`].runs += 2;
                matchData[`inning${inning}`].balls++;
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
                    outcome: "2 run. ",
                    commentary: getCommentary(ballOutcome)
                });
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 3:
                matchData[`inning${inning}`].runs += 3;
                matchData[`inning${inning}`].balls++;
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
                    outcome: "3 run. ",
                    commentary: getCommentary(ballOutcome)
                });
                swapPlayer(inning, matchData);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 4:
                matchData[`inning${inning}`].runs += 4;
                matchData[`inning${inning}`].balls++;
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
                    outcome: "FOUR. ",
                    commentary: getCommentary(ballOutcome)
                });
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 6:
                matchData[`inning${inning}`].runs += 6;
                matchData[`inning${inning}`].balls++;
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
                    outcome: "SIX. ",
                    commentary: getCommentary(ballOutcome)
                });
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;


            /**Start From Here */

            case 5:
                updateCommonStats();
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].caught = getRandomFielderId(inning, matchData, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 1;
                addCommentary("OUT. ", getCommentary(5));
                getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 7:
                updateCommonStats();
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 2;
                addCommentary("OUT. ", getCommentary(7));
                getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 8:
                updateCommonStats();
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 3;
                addCommentary("OUT. ", getCommentary(8));
                getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 9:
                updateCommonStats();
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].bowling = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumped = matchData[`inning${(inning === 1) ? "1" : "2"}`].wicketKeeperId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 4;
                addCommentary("OUT. ", getCommentary(9));
                getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 10:
                updateCommonStats();
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOut = getRandomFielderId(inning, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketType = 5;
                addCommentary("OUT. ", getCommentary(10));
                getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 11:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].wide++;
                matchData[`inning${inning}`].isLastBallExtra = true;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
                bowlingStatistics[bowlerIndexStatistics].runs++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistics].balls++;
                addCommentary("Wide. ", getCommentary(11));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 12:
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].noBall++;
                matchData[`inning${inning}`].isLastBallExtra = true;
                matchData[`inning${inning}`].isFreeHit = true;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
                bowlingStatistics[bowlerIndexStatistics].runs++;
                addCommentary("No Ball. ", getCommentary(12));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 13:
                updateCommonStats();
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].legBye++;
                addCommentary("1 Run. ", getCommentary(13));
                swapPlayer(matchData[`inning${inning}`]);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 14:
                updateCommonStats();
                matchData[`inning${inning}`].runs++;
                matchData[`inning${inning}`].extras++;
                matchData[`inning${inning}`].bye++;
                addCommentary("1 Run. ", getCommentary(14));
                swapPlayer(matchData[`inning${inning}`]);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
        }
        simulateInning(inning, matchId);
    }
    else if (inning === 1) {
        simulateInning(2, matchId);
    }
}
export default simulateInning;

function getNewStriker(inning, matchData, matchData[`inning${inning}`], strikerIndexMatchData, strikerIndexStatistics, battingStatistics) {
    if (matchData[`inning${ inning }`].wickets != 10) {
        matchData[`inning${ inning }Batsman`][strikerIndexMatchData].isNotOut = false;
        battingStatistics[strikerIndexStatistics].innings++;
        matchData[`inning${ inning }`].strikerId = matchData[`inning${ inning }`].playedId + 1;
        matchData[`inning${ inning }`].playedId++;
        matchData[`inning${ inning }Batsman`][strikerIndexMatchData + 1].didNotBat = false;
    }
}

function swapPlayer(inning,matchData) {
    let temp = matchData[`inning${ inning }`].strikerId;
    matchData[`inning${ inning }`].strikerId = matchData[`inning${ inning }`].nonStrikerId;
    matchData[`inning${ inning }`].nonStrikerId = temp;
}

function saveData(matchId, matchData, battingStatistics, bowlingStatistics) {
    localStorage.setItem(`match-${ matchId } `, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}

function getRandomFielderId(inning,matchData, squad) {
    const fieldingTeamId = (inning === 1) ? matchData.inning2.teamId : matchData.inning1.teamId;
    const fielders = squad.filter((p) => Math.floor((p.teamId - 1) / 11) + 1 === fieldingTeamId);
    const randomIndex = Math.floor(Math.random() * fielders.length);
    return fielders[randomIndex].playerId;
}