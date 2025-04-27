import handleBallOutcome from "./handleBallOutcome.js";
import handleCommentary from "./handleCommentary.js";
import handleSwapPlayer from "./handleSwapPlayer.js";
import handleNewBatsman from "./handleNewBatsman.js";
function handleSuperOverInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    const bowler = squad[matchData[`superOverInning${inning}`].bowlerId - 1];
    const striker = squad[matchData[`superOverInning${inning}`].strikerId - 1];
    const ballOutcome = handleBallOutcome(striker.roleId);
    switch (ballOutcome) {
        case 0:
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "no run",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 1:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "1 run",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`superOverInning${inning}`]);
            break;
        case 2:
            matchData[`superOverInning${inning}`].runs += 2;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "2 runs",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 3:
            matchData[`superOverInning${inning}`].runs += 3;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "3 runs",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`superOverInning${inning}`]);
            break;
        case 4:
            matchData[`superOverInning${inning}`].runs += 4;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "FOUR",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 5:
            matchData[`superOverInning${inning}`].balls++;
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`superOverInning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, [], null, true);
            }
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 6:
            matchData[`superOverInning${inning}`].runs += 6;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "SIX",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 7:
            matchData[`superOverInning${inning}`].balls++;
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`superOverInning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, [], null, true);
            }
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 8:
            matchData[`superOverInning${inning}`].balls++;
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`superOverInning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, [], null, true);
            }
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 9:
            matchData[`superOverInning${inning}`].balls++;
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: ((matchData[`superOverInning${inning}`].lastBallFreeHit == false) ? "OUT" : "no run"),
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                handleNewBatsman(inning, matchData, [], null, true);
            }
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 10:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].wickets++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "OUT",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            handleNewBatsman(inning, matchData, [], null, true);
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            break;
        case 11:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "wide",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].balls--;
            if (matchData[`superOverInning${inning}`].lastBallFreeHit == false) {
                matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            }
            break;
        case 12:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "NO BALL",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].balls--;
            matchData[`superOverInning${inning}`].lastBallFreeHit = true;
            break;
        case 13:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "Leg Bye",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`superOverInning${inning}`]);
            break;
        case 14:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData.commentary.push({
                ball: matchData[`superOverInning${inning}`].balls,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                batsman: striker.name,
                bowler: bowler.name,
                outcome: "Bye",
                comment: handleCommentary(matchData[`superOverInning${inning}`].lastBallFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].lastBallFreeHit = false;
            handleSwapPlayer(matchData[`superOverInning${inning}`]);
            break;
    }
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
}
export default handleSuperOverInning;