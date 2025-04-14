import getBallOutcome from "./getBallOutcome.js";
import getBallCommentary from "./getBallCommentary.js";
function simulateSuperOverInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const squad = JSON.parse(localStorage.getItem("squad"));
    if (matchData[`superOverInning${inning}`].balls < 6 && matchData[`superOverInning${inning}`].wickets < 2 && (inning == 2 ? (matchData.superOverInning1.runs >= matchData.superOverInning2.runs) : true)) {
        const ballOutcome = getBallOutcome(squad[matchData[`superOverInning${inning}`].strikerId - 1].roleId);
        if (ballOutcome == 0) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "Dot Ball",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 1) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "1 Run",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`superOverInning${inning}`].strikerId;
            matchData[`superOverInning${inning}`].strikerId = matchData[`superOverInning${inning}`].nonStrikerId;
            matchData[`superOverInning${inning}`].nonStrikerId = temp;
        }
        else if (ballOutcome == 2) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 2;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "2 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 3) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 3;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "3 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`superOverInning${inning}`].strikerId;
            matchData[`superOverInning${inning}`].strikerId = matchData[`superOverInning${inning}`].nonStrikerId;
            matchData[`superOverInning${inning}`].nonStrikerId = temp;
        }
        else if (ballOutcome == 4) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 4;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "4 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 5) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].wickets++;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "Out",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`superOverInning${inning}`].strikerId = matchData[`superOverInning${inning}`].playedId + 1;
            matchData[`superOverInning${inning}`].playedId = matchData[`superOverInning${inning}`].strikerId;
        }
        else if (ballOutcome == 6) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 6;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "6 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
        }
        else if (ballOutcome == 7) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: squad[matchData[`superOverInning${inning}`].currentBowlerId - 1].playerName,
                    batsmanName: squad[matchData[`superOverInning${inning}`].strikerId - 1].playerName,
                    outcome: "Wide",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`superOverInning${inning}`].balls--;
        }
        localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
        simulateSuperOverInning(inning, matchId)
    }
    else if (inning == 1) {
        simulateSuperOverInning(2, matchId);
    }
}
export default simulateSuperOverInning;