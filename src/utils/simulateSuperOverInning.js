import getBallOutcome from "./getBallOutcome.js";
import getCommentary from "./getCommentary.js";

function simulateSuperOverInning(inning, matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const squad = JSON.parse(localStorage.getItem("squad"));
    const currentInningData = matchData[`superOverInning${inning}`];

    if (currentInningData.balls < 6 && currentInningData.wickets < 2 && (inning === 2 ? currentInningData.runs < matchData.superOverInning1.runs : true)) {
        const striker = squad[currentInningData.strikerId - 1];
        const bowler = squad[currentInningData.currentBowlerId - 1];

        if (!striker || !bowler) {
            console.error("Striker or Bowler not found");
            return;
        }
        const ballOutcome = getBallOutcome(striker.roleId);

        const getDismissalType = (outcome) => {
            switch (outcome) {
                case 5: return "caught";
                case 8: return "bowled";
                case 7: return "lbw";
                case 9: return "stumped";
                case 10: return "run out";
                default: return "out";
            }
        };

        const আউটাহওয়া = [5, 7, 8, 9, 10];
        if (আউটাহওয়া.includes(ballOutcome)) {
            currentInningData.wickets++;
            if (ballOutcome === 5) { // Caught
                currentInningData.caughtById = getRandomFielderId(inning, matchId, currentInningData.strikerId, currentInningData.currentBowlerId);
            }
            else if (ballOutcome === 9) {
                currentInningData.stumpedById = getWicketKeeperId(inning === 1 ? 2 : 1, matchId);
            }

            if (ballOutcome !== 10) {
                currentInningData.wicketById = currentInningData.currentBowlerId;
            }
            currentInningData.wicketTypeId = ballOutcome;

            if (currentInningData.wickets < 2) {
                currentInningData.strikerId = matchData[`superOverInning${inning}`].playedId + 1;
                currentInningData.playedId = currentInningData.strikerId;
            }
        } else {
            currentInningData.balls++;
            currentInningData.runs += (ballOutcome === 4 || ballOutcome === 6) ? ballOutcome : (ballOutcome >= 0 && ballOutcome <= 3) ? ballOutcome : 0;

            const outcomeText =
                ballOutcome === 0 ? "Dot Ball"
                    : ballOutcome === 1 ? "1 Run"
                        : ballOutcome === 2 ? "2 Runs"
                            : ballOutcome === 3 ? "3 Runs"
                                : ballOutcome === 4 ? "4 Runs"
                                    : ballOutcome === 6 ? "6 Runs"
                                        : ballOutcome === 7 ? "Wide"
                                            : ballOutcome === 11 ? "No Ball"
                                                : "Other";


            if (ballOutcome === 1 || ballOutcome === 3) {
                const temp = currentInningData.strikerId;
                currentInningData.strikerId = currentInningData.nonStrikerId;
                currentInningData.nonStrikerId = temp;
            }
            if (ballOutcome === 7) {
                currentInningData.balls--;
            }
        }
        localStorage.setItem(`match-${matchId}`, JSON.stringify(matchData));
        setTimeout(() => simulateSuperOverInning(inning, matchId), 100);
    } else if (inning === 1) {
        simulateSuperOverInning(2, matchId);
    }
}
export default simulateSuperOverInning;



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