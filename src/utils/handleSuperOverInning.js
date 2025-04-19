import getCommentary from "./handleCommentary.js";
import getBallOutcome from "./handleBallOutcome.js";
function handleSuperOverInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const squad = JSON.parse(localStorage.getItem("squad")) || [];
    const striker = squad[matchData[`superOverInning${inning}`].strikerId - 1];
    const bowler = squad[matchData[`superOverInning${inning}`].currentBowlerId - 1];
    const ballOutcome = getBallOutcome(striker.roleId);
    switch (ballOutcome) {
        case 0:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "no run",
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 1:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "1 run",
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 2:
            matchData[`superOverInning${inning}`].runs += 2;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "2 runs",
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 3:
            matchData[`superOverInning${inning}`].runs += 3;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                outcome: "3 runs",
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 4:
            matchData[`superOverInning${inning}`].runs += 4;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "FOUR",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 6:
            matchData[`superOverInning${inning}`].runs += 6;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "SIX",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 5:
            matchData[`superOverInning${inning}`].balls++;
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: (!matchData[`superOverInning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData);
            }
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 7:
            matchData[`superOverInning${inning}`].balls++;
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: (!matchData[`superOverInning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData);
            }
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 8:
            matchData[`superOverInning${inning}`].balls++;
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: (!matchData[`superOverInning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData);
            }
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 9:
            matchData[`superOverInning${inning}`].balls++;
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                matchData[`superOverInning${inning}`].wickets++;
            }
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: (!matchData[`superOverInning${inning}`].isFreeHit) ? "OUT" : "no run",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                getNewStriker(inning, matchData);
            }
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 10:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].wickets++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "OUT",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            getNewStriker(inning, matchData);
            matchData[`superOverInning${inning}`].isFreeHit = false;
            break;
        case 11:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "wide",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].balls--;
            if (!matchData[`superOverInning${inning}`].isFreeHit) {
                matchData[`superOverInning${inning}`].isFreeHit = false;
            }
            break;
        case 12:
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "NO BALL",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = true;
            matchData[`superOverInning${inning}`].balls--;
            break;
        case 13:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "Leg Bye",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
        case 14:
            matchData[`superOverInning${inning}`].balls++;
            matchData[`superOverInning${inning}`].runs++;
            matchData[`superOverInning${inning}Commentary`].push({
                ball: matchData[`superOverInning${inning}`].balls,
                batsman: striker.playerName,
                bowler: bowler.playerName,
                runs: matchData[`superOverInning${inning}`].runs,
                wickets: matchData[`superOverInning${inning}`].wickets,
                outcome: "Bye",
                commentary: getCommentary(matchData[`superOverInning${inning}`].isFreeHit, ballOutcome)
            });
            matchData[`superOverInning${inning}`].isFreeHit = false;
            swapPlayer(inning, matchData);
            break;
    }
    saveData(matchId, matchData);
}
export default handleSuperOverInning;

function getNewStriker(inning, matchData) {
    if (matchData[`superOverInning${inning}`].wickets == 2) {
        return;
    }
    else {
        matchData[`superOverInning${inning}`].strikerId = matchData[`superOverInning${inning}`].playedId + 1;
        matchData[`superOverInning${inning}`].playedId++;
    }
}

function swapPlayer(inning, matchData) {
    const temp = matchData[`superOverInning${inning}`].strikerId;
    matchData[`superOverInning${inning}`].strikerId = matchData[`superOverInning${inning}`].nonStrikerId;
    matchData[`superOverInning${inning}`].nonStrikerId = temp;
}

function saveData(matchId, matchData) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
}