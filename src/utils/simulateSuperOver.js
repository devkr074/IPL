import getBallOutcome from "./getBallOutcome.js";
import getBallCommentary from "./getBallCommentary.js";
async function simulateSuperOver(inning, matchId, timeout) {

    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const player = JSON.parse(localStorage.getItem("player"));
    while (matchData[`superOverInning${inning}`].balls < 6 && matchData[`superOverInning${inning}`].wickets < 2 && (inning == 2 ? (matchData.superOverInning1.runs >= matchData.superOverInning2.runs) : true)) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        const ballOutcome = getBallOutcome(player[matchData[`superOverInning${inning}`].striker - 1].roleId);
        if (ballOutcome == 0) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
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
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
                    outcome: "1 Run",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`superOverInning${inning}`].striker;
            matchData[`superOverInning${inning}`].striker = matchData[`superOverInning${inning}`].nonStriker;
            matchData[`superOverInning${inning}`].nonStriker = temp;
        }
        else if (ballOutcome == 2) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 2;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
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
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
                    outcome: "3 Runs",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            let temp = matchData[`superOverInning${inning}`].striker;
            matchData[`superOverInning${inning}`].striker = matchData[`superOverInning${inning}`].nonStriker;
            matchData[`superOverInning${inning}`].nonStriker = temp;
        }
        else if (ballOutcome == 4) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 4;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
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
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
                    outcome: "Out",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`superOverInning${inning}`].striker = matchData[`superOverInning${inning}`].played + 1;
            matchData[`superOverInning${inning}`].played = matchData[`superOverInning${inning}`].striker;
        }
        else if (ballOutcome == 6) {
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs += 6;
            matchData[`superOverInning${inning}Commentary`].push(
                {
                    ball: matchData[`superOverInning${inning}`].balls,
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
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
                    bowlerName: player[matchData[`superOverInning${inning}`].currentBowler - 1].playerName,
                    batsmanName: player[matchData[`superOverInning${inning}`].striker - 1].playerName,
                    outcome: "Wide",
                    commentary: getBallCommentary(ballOutcome)
                }
            )
            matchData[`superOverInning${inning}`].balls--;
        }
        localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
    }
    if (inning == 1) {
        simulateSuperOver(2, matchId, 1);
    }
}
export default simulateSuperOver;