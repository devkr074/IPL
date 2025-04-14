import getBallOutcome from "./getBallOutcome.js";
import getBallCommentary from "./getBallCommentary.js";
import getNewBowler from "./getNewBowler.js";
function simulateMatch(inning, matchId, timeout) {
    const schedule = JSON.parse(localStorage.getItem("schedule"));
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const battingStatistic = JSON.parse(localStorage.getItem("battingStatistic"));
    const bowlingStatistic = JSON.parse(localStorage.getItem("bowlingStatistic"));
    const player = JSON.parse(localStorage.getItem("player"));
    while (matchData[`inning${inning}`].balls < 120 && matchData[`inning${inning}`].wickets < 10 && (inning == 2 ? (matchData.inning1.runs >= matchData.inning2.runs) : true)) {
        console.log(inning,matchData[`inning${inning}`].balls, matchData[`inning${inning}`].wickets, matchData[`inning${inning}`].runs);
        const ballOutcome = getBallOutcome(player[matchData[`inning${inning}`].striker - 1].roleId);
        if ((!matchData[`inning${inning}`].isLastBallExtra) && (matchData[`inning${inning}`].balls % 6 == 0) && (matchData[`inning${inning}`].balls != 0)) {
            let temp = matchData[`inning${inning}`].striker;
            matchData[`inning${inning}`].striker = matchData[`inning${inning}`].nonStriker;
            matchData[`inning${inning}`].nonStriker = temp;
            matchData[`inning${inning}`].currentBowler = getNewBowler(inning, matchId, matchData[`inning${inning}`].currentBowler);
        }
        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(
            batsman => batsman.playerId === matchData[`inning${inning}`].striker
        );
        const strikerIndexStatistic = battingStatistic.findIndex(
            batsman => batsman.playerId === matchData[`inning${inning}`].striker
        );
        const currentBowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(
            bowler => bowler.playerId === matchData[`inning${inning}`].currentBowler
        );
        const currentBowlerIndexStatistic = bowlingStatistic.findIndex(
            bowler => bowler.playerId === matchData[`inning${inning}`].currentBowler
        );
        if (ballOutcome == 0) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistic[strikerIndexStatistic].balls++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
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
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].runs++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
            battingStatistic[strikerIndexStatistic].balls++;
            battingStatistic[strikerIndexStatistic].runs++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
                    outcome: "1 Run",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`inning${inning}`].striker;
            matchData[`inning${inning}`].striker = matchData[`inning${inning}`].nonStriker;
            matchData[`inning${inning}`].nonStriker = temp;
        }
        else if (ballOutcome == 2) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 2;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 2;
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].runs += 2;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
            battingStatistic[strikerIndexStatistic].balls++;
            battingStatistic[strikerIndexStatistic].runs += 2;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
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
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].runs += 3;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
            battingStatistic[strikerIndexStatistic].balls++;
            battingStatistic[strikerIndexStatistic].runs += 3;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
                    outcome: "3 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`inning${inning}`].striker;
            matchData[`inning${inning}`].striker = matchData[`inning${inning}`].nonStriker;
            matchData[`inning${inning}`].nonStriker = temp;
        }
        else if (ballOutcome == 4) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 4;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 4;
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].runs += 4;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
            battingStatistic[strikerIndexStatistic].balls++;
            battingStatistic[strikerIndexStatistic].runs += 4;
            battingStatistic[strikerIndexStatistic].fours++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
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
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].wickets++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            battingStatistic[strikerIndexStatistic].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].isNotOut = false;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
                    outcome: "Out",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            localStorage.setItem("match", JSON.stringify(matchData));
            if (matchData[`inning${inning}`].wickets != 10) {
                matchData[`inning${inning}`].striker = matchData[`inning${inning}`].played + 1;
                matchData[`inning${inning}`].played = matchData[`inning${inning}`].striker;
            }
        }
        else if (ballOutcome == 6) {
            matchData[`inning${inning}`].balls++;
            matchData[`inning${inning}`].isLastBallExtra = false;
            matchData[`inning${inning}`].runs += 6;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 6;
            bowlingStatistic[currentBowlerIndexStatistic].balls++;
            bowlingStatistic[currentBowlerIndexStatistic].runs += 6;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
            matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
            battingStatistic[strikerIndexStatistic].balls++;
            battingStatistic[strikerIndexStatistic].runs += 6;
            battingStatistic[strikerIndexStatistic].sixes++;
            matchData[`inning${inning}Commentary`].push(
                {
                    ball: matchData[`inning${inning}`].balls,
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
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
                    bowlerName: player[matchData[`inning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`inning${inning}`].striker - 1].playerName,
                    outcome: "Wide Ball",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`inning${inning}`].balls--;
        }
        localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
        localStorage.setItem("battingStatistic", JSON.stringify(battingStatistic));
        localStorage.setItem("bowlingStatistic", JSON.stringify(bowlingStatistic));
    }
    if (inning == 1) {
        simulateMatch(2, matchId, 0);
    }
}
export default simulateMatch;