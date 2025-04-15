
// getCommentary.js (Assuming this file exists and is optimized as in previous response)
import getCommentary from "./getCommentary.js";

// getNewBowler.js (Assuming this file exists and is optimized as in previous response)
import getNewBowler from "./getNewBowler.js";

// simulateInning.js
import getBallOutcome from "./getBallOutcome.js";

function simulateInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const battingStatistics = JSON.parse(localStorage.getItem("battingStatistics"));
    const bowlingStatistics = JSON.parse(localStorage.getItem("bowlingStatistics"));
    const squad = JSON.parse(localStorage.getItem("squad"));

    const currentInningData = matchData[`inning${inning}`];
    const isSecondInning = inning === 2;
    const targetReached = isSecondInning && currentInningData.runs > matchData.inning1.runs;
    const oversCompleted = Math.floor(currentInningData.balls / 6);
    const maxOversReached = oversCompleted >= 20; // Assuming T20 format

    if (currentInningData.wickets < 10 && !maxOversReached && !targetReached) {
        const striker = squad[currentInningData.strikerId - 1];
        const bowler = squad[currentInningData.currentBowlerId - 1];

        if (!striker || !bowler) {
            console.error("Striker or bowler not found!");
            return;
        }

        const ballOutcome = getBallOutcome(striker.roleId);

        // Handle bowler change
        if (!currentInningData.isLastBallExtra && currentInningData.balls % 6 === 0 && currentInningData.balls !== 0) {
            swapPlayer(inning, matchId, matchData);
            currentInningData.currentBowlerId = getNewBowler(inning, matchId, currentInningData.currentBowlerId);
        }

        const strikerIndexMatchData = matchData[`inning${inning}Batsman`].findIndex(p => p.playerId === currentInningData.strikerId);
        const strikerIndexStatistic = battingStatistics.findIndex(p => p.playerId === currentInningData.strikerId);
        const currentBowlerIndexMatchData = matchData[`inning${inning}Bowler`].findIndex(p => p.playerId === currentInningData.currentBowlerId);
        const currentBowlerIndexStatistic = bowlingStatistics.findIndex(p => p.playerId === currentInningData.currentBowlerId);

        const updateCommonStats = () => {
            currentInningData.balls++;
            currentInningData.isLastBallExtra = false;
            if (currentBowlerIndexMatchData !== -1) {
                matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].balls++;
            }
            if (currentBowlerIndexStatistic !== -1) {
                bowlingStatistics[currentBowlerIndexStatistic].balls++;
            }
            if (strikerIndexMatchData !== -1) {
                matchData[`inning${inning}Batsman`][strikerIndexMatchData].balls++;
            }
            if (strikerIndexStatistic !== -1) {
                battingStatistics[strikerIndexStatistic].balls++;
            }
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
            case 0: // Dot Ball
                updateCommonStats();
                addCommentary("Dot Ball", getCommentary(0));
                break;
            case 1: // 1 Run
                updateCommonStats();
                currentInningData.runs++;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs++;
                if (strikerIndexMatchData !== -1) matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs++;
                if (strikerIndexStatistic !== -1) battingStatistics[strikerIndexStatistic].runs++;
                addCommentary("1 Run", getCommentary(1));
                swapPlayer(inning, matchId, matchData);
                break;
            case 2: // 2 Runs
                updateCommonStats();
                currentInningData.runs += 2;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 2;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs += 2;
                if (strikerIndexMatchData !== -1) matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 2;
                if (strikerIndexStatistic !== -1) battingStatistics[strikerIndexStatistic].runs += 2;
                addCommentary("2 Runs", getCommentary(2));
                break;
            case 3: // 3 Runs
                updateCommonStats();
                currentInningData.runs += 3;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 3;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs += 3;
                if (strikerIndexMatchData !== -1) matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 3;
                if (strikerIndexStatistic !== -1) battingStatistics[strikerIndexStatistic].runs += 3;
                addCommentary("3 Runs", getCommentary(3));
                swapPlayer(inning, matchId, matchData);
                break;
            case 4: // 4 Runs
                updateCommonStats();
                currentInningData.runs += 4;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 4;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs += 4;
                if (strikerIndexMatchData !== -1) {
                    matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 4;
                    matchData[`inning${inning}Batsman`][strikerIndexMatchData].fours++;
                }
                if (strikerIndexStatistic !== -1) {
                    battingStatistics[strikerIndexStatistic].runs += 4;
                    battingStatistics[strikerIndexStatistic].fours++;
                }
                addCommentary("4 Runs", getCommentary(4));
                break;
            case 6: // 6 Runs
                updateCommonStats();
                currentInningData.runs += 6;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs += 6;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs += 6;
                if (strikerIndexMatchData !== -1) {
                    matchData[`inning${inning}Batsman`][strikerIndexMatchData].runs += 6;
                    matchData[`inning${inning}Batsman`][strikerIndexMatchData].sixes++;
                }
                if (strikerIndexStatistic !== -1) {
                    battingStatistics[strikerIndexStatistic].runs += 6;
                    battingStatistics[strikerIndexStatistic].sixes++;
                }
                addCommentary("6 Runs", getCommentary(6));
                break;
            case 5: // Caught Out
            case 7: // LBW Out
            case 8: // Bowled Out
            case 9: // Stumped Out
            case 10: // Run Out
                updateCommonStats();
                currentInningData.wickets++;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].wickets++;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].wickets++;
                if (strikerIndexMatchData !== -1) matchData[`inning${inning}Batsman`][strikerIndexMatchData].isNotOut = false;

                let dismissalType;
                let commentaryOutcome;
                const updatedStrikerData = matchData[`inning${inning}Batsman`][strikerIndexMatchData];

                switch (ballOutcome) {
                    case 5:
                        dismissalType = "caught";
                        commentaryOutcome = "Caught Out";
                        updatedStrikerData.caughtById = getRandomFielderId(inning, matchId, currentInningData.strikerId, currentInningData.currentBowlerId);
                        updatedStrikerData.wicketTypeId = 1; // Caught
                        break;
                    case 7:
                        dismissalType = "lbw";
                        commentaryOutcome = "LBW Out";
                        updatedStrikerData.wicketById = currentInningData.currentBowlerId;
                        updatedStrikerData.wicketTypeId = 2; // LBW
                        break;
                    case 8:
                        dismissalType = "bowled";
                        commentaryOutcome = "Bowled";
                        updatedStrikerData.wicketById = currentInningData.currentBowlerId;
                        updatedStrikerData.wicketTypeId = 3; // Bowled
                        break;
                    case 9:
                        dismissalType = "stumped";
                        commentaryOutcome = "Stumped Out";
                        updatedStrikerData.stumpedById = getWicketKeeperId(inning === 1 ? 2 : 1, matchId);
                        updatedStrikerData.wicketById = currentInningData.currentBowlerId;
                        updatedStrikerData.wicketTypeId = 4; // Stumped
                        break;
                    case 10:
                        dismissalType = "run out";
                        commentaryOutcome = "Run Out";
                        updatedStrikerData.runOutById = getRandomFielderId(inning, matchId, currentInningData.strikerId);
                        updatedStrikerData.wicketTypeId = 5; // Run Out (no bowler credit)
                        break;
                    default:
                        dismissalType = "out";
                        commentaryOutcome = "Out";
                        break;
                }
                addCommentary(commentaryOutcome, getCommentary(ballOutcome));

                if (currentInningData.wickets < 10) {
                    const nextBatsmanIndex = matchData[`inning${inning}Batsman`].findIndex(
                        (batsman) => batsman.didNotBat && batsman.playerId !== currentInningData.strikerId
                    );
                    if (nextBatsmanIndex !== -1) {
                        currentInningData.strikerId = matchData[`inning${inning}Batsman`][nextBatsmanIndex].playerId;
                        matchData[`inning${inning}Batsman`][nextBatsmanIndex].didNotBat = false;
                    }
                }
                break;
            case 11: // Wide Ball
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.wide++;
                currentInningData.isLastBallExtra = true;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs++;
                addCommentary("Wide Ball", getCommentary(11));
                break;
            case 12: // No Ball
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.noBall++;
                currentInningData.isLastBallExtra = true;
                currentInningData.isFreeHit = true;
                if (currentBowlerIndexMatchData !== -1) matchData[`inning${inning}Bowler`][currentBowlerIndexMatchData].runs++;
                if (currentBowlerIndexStatistic !== -1) bowlingStatistics[currentBowlerIndexStatistic].runs++;
                addCommentary("No Ball", getCommentary(12));
                break;
            case 13: // Leg Byes
                updateCommonStats();
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.legBye++;
                addCommentary("Leg Bye", getCommentary(13));
                if (!currentInningData.isFreeHit) swapPlayer(inning, matchId, matchData);
                break;
            case 14: // Byes
                updateCommonStats();
                currentInningData.runs++;
                currentInningData.extras++;
                currentInningData.bye++;
                addCommentary("Bye", getCommentary(14));
                if (!currentInningData.isFreeHit) swapPlayer(inning, matchId, matchData);
                break;
            default:
                console.warn("Unknown ball outcome:", ballOutcome);
        }

        currentInningData.isFreeHit = false; // Reset free hit status

        saveMatchData(matchId, matchData);
        localStorage.setItem("battingStatistics", JSON.stringify(battingStatistics));
        localStorage.setItem("bowlingStatistics", JSON.stringify(bowlingStatistics));

        // Continue the inning simulation
        setTimeout(() => simulateInning(inning, matchId), 100); // Simulate ball间隔
    } else if (inning === 1) {
        setTimeout(() => simulateInning(2, matchId), 500); // 短暂延迟后开始第二局
    }
}
export default simulateInning;

function swapPlayer(inning, matchId, matchData) {
    const currentInningData = matchData[`inning${inning}`];
    let temp = currentInningData.strikerId;
    currentInningData.strikerId = currentInningData.nonStrikerId;
    currentInningData.nonStrikerId = temp;
    saveMatchData(matchId, matchData);
}

function saveMatchData(matchId, matchData) {
    localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
}

function getRandomFielderId(inning, matchId, batsmanId, bowlerId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const fieldingTeamId = inning === 1 ? matchData.inning2.teamId : matchData.inning1.teamId;
    const squad = JSON.parse(localStorage.getItem("squad"));
    const fielders = squad.filter(
        (player) =>
            Math.floor((player.teamId - 1) / 11) + 1 === fieldingTeamId &&
            player.playerId !== batsmanId &&
            player.playerId !== bowlerId // Bowler unlikely to catch off their own bowling (usually)
    );
    if (fielders.length > 0) {
        const randomIndex = Math.floor(Math.random() * fielders.length);
        return fielders[randomIndex].playerId;
    }
    return null; // No other fielder found
}

function getWicketKeeperId(teamId, matchId) {
    const squad = JSON.parse(localStorage.getItem("squad"));
    const wicketKeeper = squad.find(
        (player) => Math.floor((player.teamId - 1) / 11) + 1 === teamId && player.isWicketKeeper
    );
    return wicketKeeper ? wicketKeeper.playerId : null;
}