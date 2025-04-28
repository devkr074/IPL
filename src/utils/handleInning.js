import handleBallOutcome from "./handleBallOutcome.js";
import handleCommentary from "./handleCommentary.js";
import handleSwapPlayer from "./handleSwapPlayer.js";
import handleFielder from "./handleFielder.js";
import handleNewBatsman from "./handleNewBatsman.js"
import handleNewBowler from "./handleNewBowler.js";
function handleInning(inning, matchId) {
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const squad = JSON.parse(localStorage.getItem("squad"));
    const bowler = squad[matchData[`inning${inning}`].bowlerId - 1];
    const bowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex((p) => p.playerId == matchData[`inning${inning}`].bowlerId);
    const bowlerIndexStatistics = bowlingStatistics.findIndex((p) => p.playerId == matchData[`inning${inning}`].bowlerId);
    const striker = squad[matchData[`inning${inning}`].strikerId - 1];
    const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex((p) => p.playerId == matchData[`inning${inning}`].strikerId);
    const strikerIndexStatistics = battingStatistics.findIndex((p) => p.playerId == matchData[`inning${inning}`].strikerId);
    const ballOutcome = handleBallOutcome(striker.roleId);
    switch (ballOutcome) {
        case 0:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "no run",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 1:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points++;
            battingStatistics[strikerIndexStatistics].runs++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "1 run",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`inning${inning}`]);
            break;
        case 2:
            matchData[`inning${inning}`].runs += 2;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 2;
            battingStatistics[strikerIndexStatistics].runs += 2;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 2;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs += 2;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "2 runs",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 3:
            matchData[`inning${inning}`].runs += 3;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].points += 3;
            battingStatistics[strikerIndexStatistics].runs += 3;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs += 3;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs += 3;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "3 runs",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`inning${inning}`]);
            break;
        case 4:
            matchData[`inning${inning}`].runs += 4;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
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
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "FOUR",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 5:
            matchData[`inning${inning}`].balls++;
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].caughtById = handleFielder(inning, matchData, squad);
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 1;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                const fielderIndex = matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`].findIndex((p) => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].caughtById);
                matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`][fielderIndex].points += 10;
            }
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`inning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData, false);
            }
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 6:
            matchData[`inning${inning}`].runs += 6;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].lastBallExtra = false;
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
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "SIX",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 7:
            matchData[`inning${inning}`].balls++;
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 2;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
            }
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`inning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData, false);
            }
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 8:
            matchData[`inning${inning}`].balls++;
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 3;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`inning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData, false);
            }
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 9:
            matchData[`inning${inning}`].balls++;
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                matchData[`inning${inning}`].wickets++;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketById = bowler.playerId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumpedById = matchData[`inning${(inning == 1) ? "2" : "1"}`].wicketKeeperId;
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 4;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].wickets++;
                matchData[`inning${inning}Bowler`][bowlerIndexMatchData].points += 20;
                bowlingStatistics[bowlerIndexStatistics].wickets++;
                const wicketKeeperIndex = matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`].findIndex((p) => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].stumpedById);
                matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`][wicketKeeperIndex].points += 10;
            }
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`inning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData, false);
            }
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 10:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].wickets++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].wicketTypeId = 5;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOutById = handleFielder(inning, matchData, squad);
            const fielderIndex = matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`].findIndex((p) => p.playerId == matchData[`inning${inning}Batsman`][strikerIndexMatchData].runOutById);
            matchData[`inning${(inning == 1) ? "2" : "1"}Batsman`][fielderIndex].points += 10;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "OUT",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            handleNewBatsman(inning, matchData, battingStatistics, strikerIndexMatchData, false);
            matchData[`inning${inning}`].lastBallFreeHit = false;
            break;
        case 11:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].wides++;
            matchData[`inning${inning}`].lastBallExtra = true;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "wide",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].balls--;
            if (matchData[`inning${inning}`].lastBallFreeHit == false) {
                matchData[`inning${inning}`].lastBallFreeHit = false;
            }
            break;
        case 12:
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].noBalls++;
            matchData[`inning${inning}`].lastBallExtra = true;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "NO BALL",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].balls--;
            matchData[`inning${inning}`].lastBallFreeHit = true;
            break;
        case 13:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].legByes++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "Leg Bye",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`inning${inning}`]);
            break;
        case 14:
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].runs++;
            matchData[`inning${inning}`].extras++;
            matchData[`inning${inning}`].byes++;
            matchData[`inning${inning}`].lastBallExtra = false;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistics[strikerIndexStatistics].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][bowlerIndexMatchData].runs++;
            bowlingStatistics[bowlerIndexStatistics].balls++;
            bowlingStatistics[bowlerIndexStatistics].runs++;
            matchData.commentary.push({
                ball: matchData[`inning${inning}`].balls,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "Bye",
                comment: handleCommentary(matchData[`inning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`inning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`inning${inning}`]);
            break;
    }
    if ((matchData[`inning${inning}`].lastBallExtra == false) && ((matchData[`inning${inning}`].balls % 6) == 0) && (matchData[`inning${inning}`].balls != 0)) {
        handleSwapPlayer(matchData[`inning${inning}`]);
        matchData[`inning${inning}`].bowlerId = handleNewBowler(inning, matchData);
    }
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
    battingStatistics.sort((a, b) => ((a.runs == b.runs) ? ((b.runs / b.dismissed) - (a.runs / a.dismissed)) : (b.runs - a.runs)));
    localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
    if (battingStatistics[0].runs != 0) {
        localStorage.setItem("orangeCap", JSON.stringify(battingStatistics[0]));
    }
    bowlingStatistics.sort((a, b) => ((a.wickets == b.wickets) ? ((a.runs / a.wickets) - (b.runs / b.wickets)) : (b.wickets - a.wickets)));
    localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));
    if (bowlingStatistics[0].wickets != 0) {
        localStorage.setItem("purpleCap", JSON.stringify(bowlingStatistics[0]));
    }
}
export default handleInning;