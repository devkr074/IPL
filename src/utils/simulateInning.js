import getCommentary from "./getCommentary.js";
import getNewBowler from "./getNewBowler.js";
import getBallOutcome from "./getBallOutcome.js";
function simulateInning(inning, matchId) {
    let matchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || [];
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics")) || [];
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics")) || [];
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    const currentInningData = matchData[`inning${inning}`];
    const isSecondInning = (inning === 2);
    const targetReached = isSecondInning && currentInningData.runs > matchData.inning1.runs;
    const oversCompleted = Math.floor(currentInningData.balls / 6);
    const maxOversReached = oversCompleted >= 20;
    if (currentInningData.wickets < 10 && !maxOversReached && !targetReached) {

        const striker = squad[currentInningData.strikerId - 1];
        const bowler = squad[currentInningData.currentBowlerId - 1];

        const ballOutcome = getBallOutcome(striker.roleId);
        if (!currentInningData.isLastBallExtra && currentInningData.balls % 6 === 0 && currentInningData.balls !== 0) {
            swapPlayer(currentInningData);
            currentInningData.currentBowlerId = getNewBowler(inning, matchId, currentInningData.currentBowlerId);
        }

        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === currentInningData.strikerId);
        const strikerIndexStatistic = battingStatistics.findIndex(p => p.playerId === currentInningData.strikerId);
        const currentBowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(p => p.playerId === currentInningData.currentBowlerId);
        const currentBowlerIndexStatistic = bowlingStatistics.findIndex(p => p.playerId === currentInningData.currentBowlerId);

        const updateCommonStats = () => {
            currentInningData.balls++;
            currentInningData.isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            bowlingStatistics[currentBowlerIndexStatistic].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistic].balls++;
        };

        const addCommentary = (outcomeText, commentaryText) => {
            matchData[`inning${inning}Commentary`].push({
                ball: currentInningData.balls,
                bowlerName: bowler.playerName,
                batsmanName: striker.playerName,
                outcome: outcomeText,
                commentary: commentaryText,
            });
        };

        switch (ballOutcome) {
            case 0:
                updateCommonStats();
                addCommentary("no run. ", getCommentary(0));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 1:
                updateCommonStats();
                currentInningData.runs++;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                bowlingStatistics[currentBowlerIndexStatistic].runs++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
                battingStatistics[strikerIndexStatistic].runs++;
                addCommentary("1 Run. ", getCommentary(1));
                swapPlayer(currentInningData);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 2:
                updateCommonStats();
                currentInningData.runs += 2;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 2;
                bowlingStatistics[currentBowlerIndexStatistic].runs += 2;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
                battingStatistics[strikerIndexStatistic].runs += 2;
                addCommentary("2 Runs. ", getCommentary(2));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 3:
                updateCommonStats();
                currentInningData.runs += 3;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 3;
                bowlingStatistics[currentBowlerIndexStatistic].runs += 3;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
                battingStatistics[strikerIndexStatistic].runs += 3;
                addCommentary("3 Runs. ", getCommentary(3));
                swapPlayer(currentInningData);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 4:
                updateCommonStats();
                currentInningData.runs += 4;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 4;
                bowlingStatistics[currentBowlerIndexStatistic].runs += 4;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
                battingStatistics[strikerIndexStatistic].runs += 4;
                battingStatistics[strikerIndexStatistic].fours++;
                addCommentary("FOUR. ", getCommentary(4));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 6:
                updateCommonStats();
                currentInningData.runs += 6;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 6;
                bowlingStatistics[currentBowlerIndexStatistic].runs += 6;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
                battingStatistics[strikerIndexStatistic].runs += 6;
                battingStatistics[strikerIndexStatistic].sixes++;
                addCommentary("SIX. ", getCommentary(6));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 5:
                updateCommonStats();
                currentInningData.wickets++;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
                bowlingStatistics[currentBowlerIndexStatistic].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].caughtById = getRandomFielderId(inning, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 1;
                addCommentary("OUT. ", getCommentary(5));
                getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 7:
                updateCommonStats();
                currentInningData.wickets++;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
                bowlingStatistics[currentBowlerIndexStatistic].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 2;
                addCommentary("OUT. ", getCommentary(7));
                getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 8:
                updateCommonStats();
                currentInningData.wickets++;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
                bowlingStatistics[currentBowlerIndexStatistic].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 3;
                addCommentary("OUT. ", getCommentary(8));
                getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 9:
                updateCommonStats();
                currentInningData.wickets++;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
                bowlingStatistics[currentBowlerIndexStatistic].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumpedByIdById = matchData[`inning${(inning === 1) ? 1 : 2}`].wicketKeeperId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 4;
                addCommentary("OUT. ", getCommentary(9));
                getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 10:
                updateCommonStats();
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOutById = getRandomFielderId(inning, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 5;
                addCommentary("OUT. ", getCommentary(10));
                getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 11:
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.wide++;
                currentInningData.isLastBallExtra = true;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                bowlingStatistics[currentBowlerIndexStatistic].runs++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
                battingStatistics[strikerIndexStatistic].balls++;
                addCommentary("Wide. ", getCommentary(11));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 12:
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.noBall++;
                currentInningData.isLastBallExtra = true;
                currentInningData.isFreeHit = true;
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                bowlingStatistics[currentBowlerIndexStatistic].runs++;
                addCommentary("No Ball. ", getCommentary(12));
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 13:
                updateCommonStats();
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.legBye++;
                addCommentary("1 Run. ", getCommentary(13));
                swapPlayer(currentInningData);
                saveData(matchId, matchData, battingStatistics, bowlingStatistics);
                break;
            case 14:
                updateCommonStats();
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.bye++;
                addCommentary("1 Run. ", getCommentary(14));
                swapPlayer(currentInningData);
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

function getNewStriker(inning, matchData, currentInningData, strikerIndexMatchData, strikerIndexStatistic, battingStatistics) {
    if (currentInningData.wickets != 10) {
        matchData[`inning${inning}Batsman`][strikerIndexMatchData].isNotOut = false;
        battingStatistics[strikerIndexStatistic].innings++;
        currentInningData.strikerId = currentInningData.playedId + 1;
        currentInningData.playedId++;
        matchData[`inning${inning}Batsman`][strikerIndexMatchData + 1].didNotBat = false;
    }
}

function swapPlayer(currentInningData) {
    let temp = currentInningData.strikerId;
    currentInningData.strikerId = currentInningData.nonStrikerId;
    currentInningData.nonStrikerId = temp;
}

function saveData(matchId, matchData, battingStatistics, bowlingStatistics) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
}

function getRandomFielderId(inning, squad) {
    const matchData = JSON.parse(localStorage.getItem(`match-${inning}`));
    const fieldingTeamId = (inning === 1) ? matchData?.inning2.teamId : matchData?.inning1.teamId;
    const fielders = squad.filter((p) => Math.floor((p.teamId - 1) / 11) + 1 === fieldingTeamId);
    const randomIndex = Math.floor(Math.random() * fielders.length);
    return fielders[randomIndex]?.playerId;
}