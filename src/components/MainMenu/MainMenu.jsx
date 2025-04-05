import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import style from "./MainMenu.module.css";
import trophy from "../../assets/trophy.png";
function MainMenu() {
    const [player, setPlayer] = useState([]);
    const [pointsTable, setPointsTable] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [statistic, setStatistic] = useState([]);
    const [team, setTeam] = useState([]);
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [venue, setVenue] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const player = JSON.parse(localStorage.getItem("player"));
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        const team = JSON.parse(localStorage.getItem("team"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const venue = JSON.parse(localStorage.getItem("venue"));
        setPlayer(player);
        setPointsTable(pointsTable);
        setSchedule(schedule);
        setStatistic(statistic);
        setTeam(team);
        setTotalMatchPlayed(totalMatchPlayed);
        setUserTeamId(userTeamId);
        setVenue(venue);
    }, []);
    useEffect(() => {
        for (let i = 0; i < schedule.length; i++) {
            const matchStatusId = schedule[i].matchStatusId;
            const teamA = team[schedule[i].teamAId - 1];
            const teamB = team[schedule[i].teamBId - 1];
            if (matchStatusId === null) {
                if (isUserMatch(schedule[i])) {
                    return
                }
                else {
                    for (let j = 0; j < 11; j++) {
                        const index = statistic.findIndex(obj => obj.playerId === player[(teamA.teamId - 1) * 11 + j].playerId);
                        if (index === -1) {
                            statistic.push({
                                playerId: player[(teamA.teamId - 1) * 11 + j].playerId,
                                battingStatistic: {
                                    matches: 1,
                                    innings: 0,
                                    runs: 0,
                                    balls: 0,
                                    fours: 0,
                                    sixes: 0,
                                    halfCentury: 0,
                                    century: 0,
                                    highestScore: 0,
                                    highestScoreOpponentTeam: ""
                                },
                                bowlingStatistic: {
                                    matches: 1,
                                    balls: 0,
                                    runs: 0,
                                    fiveWickets: 0,
                                    bestBowlingWickets: 0,
                                    bestBowlingRuns: 0,
                                    bestBowlingOpponent: ""
                                }
                            });
                            setStatistic([...statistic, statistic]);
                            localStorage.setItem("statistic", JSON.stringify(statistic));
                        }
                        else {
                            statistic[index].battingStatistic.matches = statistic[index].battingStatistic.matches + 1;
                            statistic[index].bowlingStatistic.matches = statistic[index].bowlingStatistic.matches + 1;
                            setStatistic(statistic);
                            localStorage.setItem("statistic", JSON.stringify(statistic));
                        }
                    }
                    for (let j = 0; j < 11; j++) {
                        const index = statistic.findIndex(obj => obj.playerId === player[(teamB.teamId - 1) * 11 + j].playerId);
                        if (index === -1) {
                            statistic.push({
                                playerId: player[(teamB.teamId - 1) * 11 + j].playerId,
                                battingStatistic: {
                                    matches: 1,
                                    innings: 0,
                                    runs: 0,
                                    balls: 0,
                                    fours: 0,
                                    sixes: 0,
                                    halfCentury: 0,
                                    century: 0,
                                    highestScore: 0,
                                    highestScoreOpponentTeam: ""
                                },
                                bowlingStatistic: {
                                    matches: 1,
                                    balls: 0,
                                    runs: 0,
                                    fiveWickets: 0,
                                    bestBowlingWickets: 0,
                                    bestBowlingRuns: 0,
                                    bestBowlingOpponent: ""
                                }
                            });
                            setStatistic([...statistic, statistic]);
                            localStorage.setItem("statistic", JSON.stringify(statistic));
                        }
                        else {
                            statistic[index].battingStatistic.matches = statistic[index].battingStatistic.matches + 1;
                            statistic[index].bowlingStatistic.matches = statistic[index].bowlingStatistic.matches + 1;
                            setStatistic(statistic);
                            localStorage.setItem("statistic", JSON.stringify(statistic));
                        }
                    }
                    simulateToss(teamA, teamB, schedule[i]);
                }
            }
        }
    }, [schedule]);
    useEffect(() => {
        function handleBackButton(e) {
            e.preventDefault();
            navigate("/");
        }
        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);
    function handleContinue() {
        navigate("/schedule");
    }
    function handleStatistic() {
        navigate("/statistic");
    }
    function handleSquad() {
        navigate("/squad");
    }
    function handlePointsTable() {
        navigate("/points-table");
    }
    function handleRestart() {
        localStorage.clear();
        navigate("/");
    }
    const commentaryForSingleRun = [
        "That's a quick single! Excellent communication between the batters to keep the scoreboard ticking.",
        "Just a gentle push into the gap, and they jog through for one. Smart cricket!",
        "A well-placed shot for a comfortable single—rotating the strike beautifully.",
        "One more added to the total; the batters are keeping the momentum going with these singles.",
        "It's a single, and those small contributions often make a big difference in the final tally."
    ];
    const commentaryForDoubleRun = [
        "Nicely placed in the gap! The batters run hard and make it back for two—great awareness.",
        "A well-judged double, and that's the kind of running between the wickets that builds partnerships.",
        "Good placement and excellent running! They convert a single into two with sheer determination.",
        "The fielder chases it down, but not before the batters steal a quick two—sharp cricket all around!",
        "Two more added to the score. That’s smart batting, picking up those doubles to keep things moving."
    ];
    const commentaryForTripleRun = [
        "An excellent drive into the deep, and they’re pushing hard—three runs! That’s great running between the wickets.",
        "Terrific placement and aggressive running! They pick up three, making the fielders work hard.",
        "A well-executed shot and some quick legs! Three valuable runs added to the total.",
        "Smart cricket from the batters—they seize the opportunity and run three. Fielders will need to tighten up their angles!",
        "It's three runs, and the batters’ intent to maximize every scoring chance is paying off!"
    ];
    const commentaryForFourRun = [
        "What a cracking shot! The ball races away to the boundary for a superb four!",
        "Brilliant placement and timing—straight to the rope! Four runs with ease.",
        "That’s a textbook drive, piercing the gap perfectly. Four runs to the batter!",
        "Power and precision combined! The fielder had no chance as it sped to the boundary for four.",
        "Beautifully struck! It’s all the way to the fence, a flawless four to add to the tally."
    ];
    const commentaryForCaughtOut = [
        "Got him! The batter falls prey to a well-judged catch—what a moment for the fielding side!",
        "Up in the air... and safely pouched! The fielder makes no mistake, and the batter has to walk back.",
        "Brilliant catch! That’s a game-changing moment as the batter departs under pressure.",
        "A soft dismissal! The batter couldn’t keep it down, and the fielder gleefully accepts the offering.",
        "What a take! The fielder dives forward to complete an outstanding catch—excellent reflexes under pressure."
    ];
    const commentaryForLBWOut = [
        "Plumb in front! The umpire raises the finger, and the batter knows they’re in trouble—what a delivery!",
        "Trapped right in front of the stumps! That’s as clear an LBW as you’ll ever see. The bowler is ecstatic!",
        "The ball skidded through, hitting the pads—no hesitation from the umpire. That’s out!",
        "A peach of a delivery, nipping back and hitting the batter on the pad—LBW, and the fielding side strikes again!",
        "The review won’t save the batter here—impact in line, hitting the stumps! It’s LBW, and they’re on their way back."
    ];
    const commentaryForBowled = [
        "Clean bowled! The stumps are shattered, and the batter has no answer to that perfect delivery.",
        "What a beauty! The ball sneaks through the defenses and crashes into the stumps—bowled out!",
        "Straight through the gate! The bowler's precision leaves the batter stunned—an outstanding dismissal.",
        "That's a peach of a delivery, hitting the top of off-stump! A textbook bowled-out moment.",
        "The batter misjudges, and the bowler makes them pay—stumps flying everywhere!"
    ];
    const commentaryForRunOut = [
        "Oh, that's brilliant fielding! A direct hit, and the batter is caught short of their crease—run out!",
        "Exceptional teamwork! The throw was spot-on, and the keeper does the rest to execute a perfect run-out.",
        "What a moment! The fielder's quick reflexes and accurate throw result in a run-out—pressure mounting on the batting side.",
        "The gamble doesn't pay off! Superb fielding and swift work behind the stumps leave the batter stranded—run out!",
        "A costly mistake from the batter—run out by miles! The fielding side celebrates a crucial breakthrough."
    ];
    const commentaryForSixRun = [
        "That’s out of here! An absolute monster of a hit—straight into the crowd for a magnificent six!",
        "What a clean strike! The ball sails over the boundary rope—six runs, pure class!",
        "He’s unleashed the big one! That’s a maximum, and the bowler is under real pressure now.",
        "Up, up, and away! That’s a towering six, the fans are on their feet!",
        "It’s a colossal hit, straight as an arrow—six of the very best!"
    ];
    const commentaryForWideBall = [
        "That one's gone well outside the line—it's a wide, and the bowler will have to reload.",
        "The umpire stretches his arms, signaling a wide! Extra runs for the batting side.",
        "Too much width on that delivery, and it's rightly called a wide. A small gift for the batters.",
        "The bowler loses control, and that's an additional run as the wide is called. Extra pressure here!",
        "A rare misstep from the bowler, straying outside the lines—it’s a wide and one more to the total."
    ];
    const commentaryForNoBall = [
        "That’s a no-ball! The bowler oversteps, and the batting side gets a free hit to capitalize on.",
        "No-ball signaled! A costly error from the bowler, gifting an extra run and a free hit.",
        "It’s a no-ball, and the pressure mounts as the batting side gains an additional advantage.",
        "Overstepping the line again—it's a no-ball! A free hit opportunity coming up, can the batter make the most of it?",
        "Bowler’s mistake, and the umpire calls it a no-ball. These extras could prove crucial in the final tally."
    ];
    const commentaryForDotBall = [
        "Another dot ball! The bowler is really tightening the screws here, building up the pressure on the batter.",
        "Yet again, no runs on the board. The batter's timing seems a bit off—will they adjust in time?",
        "Dot balls like these are gold in the middle overs; they're creating frustration for the batting side.",
        "Excellent bowling—another dot ball forces the batter to rethink their strategy!",
        "It's a dot ball, and every single one counts. The fielding side is gaining the upper hand with this disciplined approach."
    ];
    function isUserMatch(match) {
        return ((match.teamAId === userTeamId) || (match.teamBId === userTeamId));
    }
    function simulateToss(teamA, teamB, match) {
        const random = Math.round(Math.random());
        match.tossStatusId = 1;
        if (random === 0) {
            const random = Math.round(Math.random());
            if (random === 0) {
                match.tossResult = `${teamA.teamShortName} elected to Bat first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                startFirstInning(teamA, teamB, match);
            }
            else if (random == 1) {
                match.tossResult = `${teamA.teamShortName} elected to Ball first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                startFirstInning(teamB, teamA, match);
            }
        }
        if (random == 1) {
            const random = Math.round(Math.random());
            if (random == 0) {
                match.tossResult = `${teamB.teamShortName} elected to Bat first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                startFirstInning(teamB, teamA, match);
            }
            else if (random == 1) {
                match.tossResult = `${teamB.teamShortName} elected to Ball first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                startFirstInning(teamA, teamB, match);
            }
        }
    }
    let firstInningData;
    let firstInningBatsmanData;
    let firstInningBowlerData;
    let firstInningCommentaryData;
    function startFirstInning(teamA, teamB, match) {
        firstInningData = {
            runs: 0,
            balls: 0,
            wickets: 0,
            fours: 0,
            sixes: 0,
            extras: 0,
            striker: 0,
            nonStriker: 1,
            playersPlayed: 1,
            isLastBallExtra: false,
            lastBowlerId: null
        };
        firstInningBatsmanData = [];
        firstInningBowlerData = [];
        firstInningCommentaryData = [];
        firstInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true,
                wicketDetail: ""
            }
        )
        firstInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11 + 1].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true,
                wicketDetail: ""
            }
        )
        while (firstInningData.balls < 120 && firstInningData.wickets < 10) {
            if (((firstInningData.balls % 6) === 0) && !(firstInningData.isLastBallExtra)) {
                getFirstInningNewBowler(teamB);
                const temp = firstInningData.striker;
                firstInningData.striker = firstInningData.nonStriker;
                firstInningData.nonStriker = temp;
                simulateFirstInning(teamA, teamB, firstInningData.lastBowlerId);
            }
            else {
                simulateFirstInning(teamA, teamB, firstInningData.lastBowlerId);
            }
        }
        startSecondInning(teamB, teamA, match, firstInningData.runs);
    }
    function getFirstInningNewBowler(teamB) {
        const random = Math.floor(Math.random() * 11);
        const playerId = player[(teamB.teamId - 1) * 11 + random].playerId;
        const roleId = player[(teamB.teamId - 1) * 11 + random].roleId;
        if (roleId == 2 || roleId == 3) {
            if (firstInningBowlerData.findIndex(obj => obj.playerId === playerId) === -1) {
                firstInningBowlerData.push(
                    {
                        playerId: playerId,
                        balls: 0,
                        maiden: 0,
                        runs: 0,
                        wickets: 0
                    }
                );
                firstInningData.lastBowlerId = playerId;
            }
            else if (firstInningBowlerData.findIndex(obj => obj.playerId === playerId) !== -1) {
                const index = firstInningBowlerData.findIndex(obj => obj.playerId === playerId);
                if (firstInningBowlerData[index].balls == 24 || firstInningData.lastBowlerId == playerId) {
                    getFirstInningNewBowler(teamB);
                }
                else {
                    firstInningData.lastBowlerId = playerId;
                }
            }
        }
        else {
            getFirstInningNewBowler(teamB);
        }
    }
    function simulateFirstInning(teamA, teamB, bowlerId) {
        let lastBallResult = generateOutcome(player[firstInningBatsmanData[firstInningData.striker].playerId - 1].roleId);
        const index = firstInningBowlerData.findIndex(obj => obj.playerId === bowlerId);
        if (lastBallResult === 1) {
            firstInningData.runs += lastBallResult;
            firstInningData.balls++;
            firstInningBatsmanData[firstInningData.striker].runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs += lastBallResult;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 1,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " 1 run. " + commentaryForSingleRun[random]
                }
            );
            const temp = firstInningData.striker;
            firstInningData.striker = firstInningData.nonStriker;
            firstInningData.nonStriker = temp;
        }
        else if (lastBallResult === 2) {
            firstInningData.runs += lastBallResult;
            firstInningData.balls++;
            firstInningBatsmanData[firstInningData.striker].runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs += lastBallResult;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 2,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " 2 run. " + commentaryForDoubleRun[random]
                }
            );
        }
        else if (lastBallResult === 3) {
            firstInningData.runs += lastBallResult;
            firstInningData.balls++;
            firstInningBatsmanData[firstInningData.striker].runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs += lastBallResult;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 3,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " 3 run. " + commentaryForTripleRun[random]
                }
            );
            const temp = firstInningData.striker;
            firstInningData.striker = firstInningData.nonStriker;
            firstInningData.nonStriker = temp;
        }
        else if (lastBallResult === 4) {
            firstInningData.runs += lastBallResult;
            firstInningData.balls++;
            firstInningData.fours++;
            firstInningBatsmanData[firstInningData.striker].runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBatsmanData[firstInningData.striker].fours++;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs += lastBallResult;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 4,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " 4 run. " + commentaryForFourRun[random]
                }
            );
        }
        else if (lastBallResult == 5) {
            let random = Math.floor(Math.random() * 4);
            if (random == 0) {
                firstInningData.balls++;
                firstInningData.wickets++;
                firstInningBatsmanData[firstInningData.striker].balls++;
                firstInningBatsmanData[firstInningData.striker].isNotOut = false;
                firstInningData.playersPlayed++;
                firstInningBowlerData[index].balls++;
                firstInningBowlerData[index].wickets++;
                firstInningData.isLastBallExtra = false;
                const fielder = Math.floor(Math.random() * 10);
                if (player[(teamB.teamId - 1) * 11 + fielder].playerId == bowlerId) {
                    firstInningBatsmanData[firstInningData.striker].wicketDetail = "c & b" + player[bowlerId - 1].playerName;
                }
                else {
                    firstInningBatsmanData[firstInningData.striker].wicketDetail = "c " + player[(teamB.teamId - 1) * 11 + fielder].playerName + " b " + player[bowlerId - 1].playerName;
                }
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " out. " + commentaryForCaughtOut[random]
                    }
                );
            }
            else if (random == 1) {
                firstInningData.balls++;
                firstInningData.wickets++;
                firstInningBatsmanData[firstInningData.striker].balls++;
                firstInningBatsmanData[firstInningData.striker].isNotOut = false;
                firstInningData.playersPlayed++;
                firstInningBowlerData[index].balls++;
                firstInningBowlerData[index].wickets++;
                firstInningData.isLastBallExtra = false;
                firstInningBatsmanData[firstInningData.striker].wicketDetail = `LBW ${player[bowlerId - 1].playerName} `;
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " out. " + commentaryForLBWOut[random]
                    }
                );
            }
            else if (random == 2) {
                firstInningData.balls++;
                firstInningData.wickets++;
                firstInningBatsmanData[firstInningData.striker].balls++;
                firstInningBatsmanData[firstInningData.striker].isNotOut = false;
                firstInningData.playersPlayed++;
                firstInningBowlerData[index].balls++;
                firstInningBowlerData[index].wickets++;
                firstInningData.isLastBallExtra = false;
                firstInningBatsmanData[firstInningData.striker].wicketDetail = "Bowled " + player[bowlerId - 1].playerName;
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " out. " + commentaryForBowled[random]
                    }
                );
            }
            else if (random == 3) {
                firstInningData.balls++;
                firstInningData.wickets++;
                firstInningBatsmanData[firstInningData.striker].balls++;
                firstInningBatsmanData[firstInningData.striker].isNotOut = false;
                firstInningData.playersPlayed++;
                firstInningBowlerData[index].balls++;
                firstInningData.isLastBallExtra = false;
                const fielder = Math.floor(Math.random() * 10);
                firstInningBatsmanData[firstInningData.striker].wicketDetail = "Runout " + player[(teamB.teamId - 1) * 11 + fielder].playerName;
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " out. " + commentaryForRunOut[random]
                    }
                );
            }
            if (firstInningData.wickets != 10) {
                firstInningData.striker = firstInningData.playersPlayed;
                firstInningBatsmanData.push(
                    {
                        playerId: player[(teamA.teamId - 1) * 11 + firstInningData.playersPlayed].playerId,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isNotOut: true,
                        wicketDetail: ""
                    }
                );
            }
        }
        else if (lastBallResult === 6) {
            firstInningData.runs += lastBallResult;
            firstInningData.balls++;
            firstInningData.sixes++;
            firstInningBatsmanData[firstInningData.striker].runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBatsmanData[firstInningData.striker].sixes++;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs += lastBallResult;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 6,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " 6 run. " + commentaryForSixRun[random]
                }
            );
        }
        else if (lastBallResult === 7) {
            firstInningData.runs += lastBallResult;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningData.extras++;
            firstInningData.isLastBallExtra = true;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + 1;
            firstInningData.balls++;
            let random = Math.floor(Math.random() * 2);
            if (random == 0) {
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 7,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " wide. " + commentaryForWideBall[random]
                    }
                );
            }
            else {
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: firstInningData.balls,
                        result: 7,
                        statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " No ball. " + commentaryForNoBall[random]
                    }
                );
            }
            firstInningData.balls--;
        }
        else {
            firstInningData.balls++;
            firstInningBatsmanData[firstInningData.striker].balls++;
            firstInningBowlerData[index].balls++;
            firstInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            firstInningCommentaryData.push(
                {
                    ballNumber: firstInningData.balls,
                    result: 0,
                    statement: player[bowlerId - 1].playerName + " to " + player[firstInningBatsmanData[firstInningData.striker].playerId - 1].playerName + " no run. " + commentaryForDotBall[random]
                }
            );
        }
    }
    let secondInningData;
    let secondInningBatsmanData;
    let secondInningBowlerData;
    let secondInningCommentaryData;
    function startSecondInning(teamA, teamB, match, target) {
        secondInningData = {
            runs: 0,
            balls: 0,
            wickets: 0,
            fours: 0,
            sixes: 0,
            extras: 0,
            striker: 0,
            nonStriker: 1,
            playersPlayed: 1,
            isLastBallExtra: false,
            lastBowlerId: null
        };
        secondInningBatsmanData = [];
        secondInningBowlerData = [];
        secondInningCommentaryData = [];
        secondInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true,
                wicketDetail: ""
            }
        )
        secondInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11 + 1].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true,
                wicketDetail: ""
            }
        )
        while (secondInningData.balls < 120 && secondInningData.wickets < 10 && secondInningData.runs <= target) {
            if (((secondInningData.balls % 6) === 0) && !(secondInningData.isLastBallExtra)) {
                getSecondInningNewBowler(teamB);
                const temp = secondInningData.striker;
                secondInningData.striker = secondInningData.nonStriker;
                secondInningData.nonStriker = temp;
                simulateSecondInning(teamA, teamB, secondInningData.lastBowlerId);
            }
            else {
                simulateSecondInning(teamA, teamB, secondInningData.lastBowlerId);
            }
        }
        if (firstInningData.runs == secondInningData.runs) {
            simulateSuperOverFirstInning(teamA, teamB, match);
        }
        else {
            if (firstInningData.runs > secondInningData.runs) {
                const result = ` won by ${firstInningData.runs - secondInningData.runs} runs`;
                saveData(teamB, teamA, match, result);
            }
            else {
                const result = ` won by ${10 - secondInningData.wickets} wkts`;
                saveData(teamA, teamB, match, result);
            }
        }
    }
    function getSecondInningNewBowler(teamB) {
        const random = Math.floor(Math.random() * 11);
        const playerId = player[(teamB.teamId - 1) * 11 + random].playerId;
        const roleId = player[(teamB.teamId - 1) * 11 + random].roleId;
        if (roleId == 2 || roleId == 3) {
            if (secondInningBowlerData.findIndex(obj => obj.playerId === playerId) === -1) {
                secondInningBowlerData.push(
                    {
                        playerId: playerId,
                        balls: 0,
                        maiden: 0,
                        runs: 0,
                        wickets: 0
                    }
                );
                secondInningData.lastBowlerId = playerId;
            }
            else if (secondInningBowlerData.findIndex(obj => obj.playerId === playerId) !== -1) {
                const index = secondInningBowlerData.findIndex(obj => obj.playerId === playerId);
                if (secondInningBowlerData[index].balls == 24 || secondInningData.lastBowlerId == playerId) {
                    getSecondInningNewBowler(teamB);
                }
                else {
                    secondInningData.lastBowlerId = playerId;
                }
            }
        }
        else {
            getSecondInningNewBowler(teamB);
        }
    }
    function simulateSecondInning(teamA, teamB, bowlerId) {
        let lastBallResult = generateOutcome(player[secondInningBatsmanData[secondInningData.striker].playerId - 1].roleId);
        const index = secondInningBowlerData.findIndex(obj => obj.playerId === bowlerId);
        if (lastBallResult === 1) {
            secondInningData.runs += lastBallResult;
            secondInningData.balls++;
            secondInningBatsmanData[secondInningData.striker].runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBowlerData[index].balls++;
            secondInningBowlerData[index].runs += lastBallResult;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 1,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " 1 run. " + commentaryForSingleRun[random]
                }
            );
            const temp = secondInningData.striker;
            secondInningData.striker = secondInningData.nonStriker;
            secondInningData.nonStriker = temp;
        }
        else if (lastBallResult === 2) {
            secondInningData.runs += lastBallResult;
            secondInningData.balls++;
            secondInningBatsmanData[secondInningData.striker].runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBowlerData[index].balls++;
            secondInningBowlerData[index].runs += lastBallResult;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 2,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " 2 run. " + commentaryForDoubleRun[random]
                }
            );
        }
        else if (lastBallResult === 3) {
            secondInningData.runs += lastBallResult;
            secondInningData.balls++;
            secondInningBatsmanData[secondInningData.striker].runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBowlerData[index].balls++;
            secondInningBowlerData[index].runs += lastBallResult;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 3,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " 3 run. " + commentaryForTripleRun[random]
                }
            );
            const temp = secondInningData.striker;
            secondInningData.striker = secondInningData.nonStriker;
            secondInningData.nonStriker = temp;
        }
        else if (lastBallResult === 4) {
            secondInningData.runs += lastBallResult;
            secondInningData.balls++;
            secondInningData.fours++;
            secondInningBatsmanData[secondInningData.striker].runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBatsmanData[secondInningData.striker].fours++;
            secondInningBowlerData[index].balls++;
            secondInningBowlerData[index].runs += lastBallResult;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 4,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " 4 run. " + commentaryForFourRun[random]
                }
            );
        }
        else if (lastBallResult == 5) {
            let random = Math.floor(Math.random() * 4);
            if (random == 0) {
                secondInningData.balls++;
                secondInningData.wickets++;
                secondInningBatsmanData[secondInningData.striker].balls++;
                secondInningBatsmanData[secondInningData.striker].isNotOut = false;
                secondInningData.playersPlayed++;
                secondInningBowlerData[index].balls++;
                secondInningBowlerData[index].wickets++;
                secondInningData.isLastBallExtra = false;
                const fielder = Math.floor(Math.random() * 10);
                if (player[(teamB.teamId - 1) * 11 + fielder].playerId == bowlerId) {
                    secondInningBatsmanData[secondInningData.striker].wicketDetail = "c & b" + player[bowlerId - 1].playerName;
                }
                else {
                    secondInningBatsmanData[secondInningData.striker].wicketDetail = "c " + player[(teamB.teamId - 1) * 11 + fielder].playerName + " b " + player[bowlerId - 1].playerName;
                }
                random = Math.floor(Math.random() * 5);
                secondInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " out. " + commentaryForCaughtOut[random]
                    }
                );
            }
            else if (random == 1) {
                secondInningData.balls++;
                secondInningData.wickets++;
                secondInningBatsmanData[secondInningData.striker].balls++;
                secondInningBatsmanData[secondInningData.striker].isNotOut = false;
                secondInningData.playersPlayed++;
                secondInningBowlerData[index].balls++;
                secondInningBowlerData[index].wickets++;
                secondInningData.isLastBallExtra = false;
                secondInningBatsmanData[secondInningData.striker].wicketDetail = `LBW ${player[bowlerId - 1].playerName} `;
                random = Math.floor(Math.random() * 5);
                secondInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " out. " + commentaryForLBWOut[random]
                    }
                );
            }
            else if (random == 2) {
                secondInningData.balls++;
                secondInningData.wickets++;
                secondInningBatsmanData[secondInningData.striker].balls++;
                secondInningBatsmanData[secondInningData.striker].isNotOut = false;
                secondInningData.playersPlayed++;
                secondInningBowlerData[index].balls++;
                secondInningBowlerData[index].wickets++;
                secondInningData.isLastBallExtra = false;
                secondInningBatsmanData[secondInningData.striker].wicketDetail = "Bowled " + player[bowlerId - 1].playerName;
                random = Math.floor(Math.random() * 5);
                secondInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " out. " + commentaryForBowled[random]
                    }
                );
            }
            else if (random == 3) {
                secondInningData.balls++;
                secondInningData.wickets++;
                secondInningBatsmanData[secondInningData.striker].balls++;
                secondInningBatsmanData[secondInningData.striker].isNotOut = false;
                secondInningData.playersPlayed++;
                secondInningBowlerData[index].balls++;
                secondInningData.isLastBallExtra = false;
                const fielder = Math.floor(Math.random() * 10);
                secondInningBatsmanData[secondInningData.striker].wicketDetail = "Runout " + player[(teamB.teamId - 1) * 11 + fielder].playerName;
                random = Math.floor(Math.random() * 5);
                secondInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 5,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " out. " + commentaryForRunOut[random]
                    }
                );
            }
            if (secondInningData.wickets != 10) {
                secondInningData.striker = secondInningData.playersPlayed;
                secondInningBatsmanData.push(
                    {
                        playerId: player[(teamA.teamId - 1) * 11 + secondInningData.playersPlayed].playerId,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isNotOut: true,
                        wicketDetail: ""
                    }
                );
            }
        }
        else if (lastBallResult === 6) {
            secondInningData.runs += lastBallResult;
            secondInningData.balls++;
            secondInningData.sixes++;
            secondInningBatsmanData[secondInningData.striker].runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBatsmanData[secondInningData.striker].sixes++;
            secondInningBowlerData[index].balls++;
            secondInningBowlerData[index].runs += lastBallResult;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 6,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " 6 run. " + commentaryForSixRun[random]
                }
            );
        }
        else if (lastBallResult === 7) {
            secondInningData.runs += lastBallResult;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningData.extras++;
            secondInningData.isLastBallExtra = true;
            secondInningBowlerData[index].runs = secondInningBowlerData[index].runs + 1;
            secondInningData.balls++;
            let random = Math.floor(Math.random() * 2);
            if (random == 0) {
                random = Math.floor(Math.random() * 5);
                secondInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 7,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " wide. " + commentaryForWideBall[random]
                    }
                );
            }
            else {
                random = Math.floor(Math.random() * 5);
                firstInningCommentaryData.push(
                    {
                        ballNumber: secondInningData.balls,
                        result: 7,
                        statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " No ball. " + commentaryForNoBall[random]
                    }
                );
            }
            secondInningData.balls--;
        }
        else {
            secondInningData.balls++;
            secondInningBatsmanData[secondInningData.striker].balls++;
            secondInningBowlerData[index].balls++;
            secondInningData.isLastBallExtra = false;
            const random = Math.floor(Math.random() * 5);
            secondInningCommentaryData.push(
                {
                    ballNumber: secondInningData.balls,
                    result: 0,
                    statement: player[bowlerId - 1].playerName + " to " + player[secondInningBatsmanData[secondInningData.striker].playerId - 1].playerName + " no run. " + commentaryForDotBall[random]
                }
            );
        }
    }
    function simulateSuperOverFirstInning(teamA, teamB, match) {
        console.log("Super Over Logic");
    }
    function saveData(teamA, teamB, match, result) {
        const matchDetail =
        {
            firstInningData: firstInningData,
            firstInningBatsmanData: firstInningBatsmanData,
            firstInningBowlerData: firstInningBowlerData,
            firstInningCommentaryData: firstInningCommentaryData,
            secondInningData: secondInningData,
            secondInningBatsmanData: secondInningBatsmanData,
            secondInningBowlerData: secondInningBowlerData,
            secondInningCommentaryData: secondInningCommentaryData,
        };
        localStorage.setItem(`match-${match.matchId}`, JSON.stringify(matchDetail));
        match.matchStatusId = 1;
        match.matchResult = teamA.teamShortName + result;
        setSchedule(schedule);
        localStorage.setItem("schedule", JSON.stringify(schedule));
        pointsTable[teamA.teamId - 1].matchesPlayed = pointsTable[teamA.teamId - 1].matchesPlayed + 1;
        pointsTable[teamA.teamId - 1].matchesWon = pointsTable[teamA.teamId - 1].matchesWon + 1;
        pointsTable[teamA.teamId - 1].points = pointsTable[teamA.teamId - 1].points + 2;
        pointsTable[teamB.teamId - 1].matchesPlayed = pointsTable[teamB.teamId - 1].matchesPlayed + 1;
        pointsTable[teamB.teamId - 1].matchesLost = pointsTable[teamB.teamId - 1].matchesLost + 1;
        setPointsTable(pointsTable);
        localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
    }
    function generateOutcome(roleId) {
        const outcomes = [];
        if (roleId === 1) {
            outcomes.push(...Array(45).fill(1));
            outcomes.push(...Array(8).fill(2));
            outcomes.push(...Array(2).fill(3));
            outcomes.push(...Array(18).fill(4));
            outcomes.push(...Array(5).fill(5));
            outcomes.push(...Array(10).fill(6));
            outcomes.push(...Array(7).fill(7));
            outcomes.push(...Array(25).fill(0));
        }
        else if (roleId === 2) {
            outcomes.push(...Array(42).fill(1));
            outcomes.push(...Array(8).fill(2));
            outcomes.push(...Array(1).fill(3));
            outcomes.push(...Array(20).fill(4));
            outcomes.push(...Array(7).fill(5));
            outcomes.push(...Array(10).fill(6));
            outcomes.push(...Array(7).fill(7));
            outcomes.push(...Array(25).fill(0));
        }
        else if (roleId === 3) {
            outcomes.push(...Array(25).fill(1));
            outcomes.push(...Array(4).fill(2));
            outcomes.push(...Array(0).fill(3));
            outcomes.push(...Array(4).fill(4));
            outcomes.push(...Array(20).fill(5));
            outcomes.push(...Array(2).fill(6));
            outcomes.push(...Array(5).fill(7));
            outcomes.push(...Array(60).fill(0));
        }
        for (let i = outcomes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
        }
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.section}>
                    <img src={trophy} alt="IPL Trophy" className={style.trophy} />
                </div>
                <div className={style.section}>
                    <button className={style.button} onClick={handleContinue}><FaPlay size={44} />CONTINUE</button>
                    <div className={style.menuButtonContainer}>
                        <button className={style.menuButton} onClick={handleStatistic}>STATISTIC</button>
                        <button className={style.menuButton} onClick={handleSquad}>SQUAD</button>
                        <button className={style.menuButton} onClick={handlePointsTable}>POINTS TABLE</button>
                    </div>
                    <button className={style.restartButton} onClick={handleRestart}><FaRedo /></button>
                </div>
            </div>
        </>
    );
}
export default MainMenu;