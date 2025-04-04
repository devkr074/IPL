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
                    return;
                }
                else {
                    for (let j = 0; j < 11; j++) {
                        if (statistic.findIndex(obj => obj.playerId === player[(teamA.teamId - 1) * 11 + j].playerId) === -1) {
                            statistic.push({
                                playerId: player[(teamA.teamId - 1) * 11 + j].playerId,
                                battingStatistic: {
                                    matches: 0,
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
                                    matches: 0,
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
                    }
                    for (let j = 0; j < 11; j++) {
                        if (statistic.findIndex(obj => obj.playerId === player[(teamB.teamId - 1) * 11 + j].playerId) === -1) {
                            statistic.push({
                                playerId: player[(teamA.teamId - 1) * 11 + j].playerId,
                                battingStatistic: {
                                    matches: 0,
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
                                    matches: 0,
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
    const firstInningData = {
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
    }
    const firstInningBatsmanData = [];
    const firstInningBowlerData = [];


    function getFirstInningNewBowler(teamB) {
        const random = Math.floor(Math.random() * 11);
        const playerId = player[(teamB.teamId - 1) * 11 + random].playerId;
        const roleId = player[(teamB.teamId - 1) * 11 + random].roleId;
        if (roleId == 2 || roleId == 3) {
            if (firstInningBowlerData.findIndex(obj => obj.playerId === playerId) === -1) {
                firstInningBowlerData.push(
                    {
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
                if (firstInningBowlerData[index].balls == 24) {
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



    function simulateFirstInning(teamA, bowlerId) {
        let lastBallResult = generateOutcome(player[firstInningBatsmanData[firstInningData.striker].playerId - 1].roleId);
        const index = firstInningBowlerData.findIndex(obj => obj.playerId === bowlerId);
        if (lastBallResult === 1 || lastBallResult === 3) {
            totalRuns = totalRuns + lastBallResult;
            totalBalls++;
            batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            let temp = striker;
            striker = nonStriker;
            nonStriker = temp;
            firstInningData.isLastBallExtra = false;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + lastBallResult;
        }
        else if (lastBallResult === 2) {
            totalRuns = totalRuns + lastBallResult;
            batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            totalBalls++;
            firstInningData.isLastBallExtra = false;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + lastBallResult;
        }
        else if (lastBallResult === 4) {
            totalRuns = totalRuns + lastBallResult;
            batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            batsmanStatistic[striker].fours = batsmanStatistic[striker].fours + 1;
            totalFours++;
            totalBalls++;
            firstInningData.isLastBallExtra = false;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + lastBallResult;
        }
        else if (lastBallResult == 5) {
            totalWickets++;
            totalBalls++;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            batsmanStatistic[striker].isNotOut = false;
            striker = playersPlayed + 1;
            playersPlayed++;
            firstInningData.isLastBallExtra = false;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].wickets++;
            batsmanStatistic.push(
                {
                    id: player[(teamA.teamId - 1) * 11 + playersPlayed].playerId,
                    runs: 0,
                    balls: 0,
                    fours: 0,
                    sixes: 0,
                    isNotOut: true
                }
            );
        }
        else if (lastBallResult === 6) {
            totalRuns = totalRuns + lastBallResult;
            totalSixes++;
            totalBalls++;
            batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            batsmanStatistic[striker].sixes = batsmanStatistic[striker].sixes + 1;
            firstInningData.isLastBallExtra = false;
            firstInningBowlerData[index].balls++;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + lastBallResult;
        }
        else if (lastBallResult === 7) {
            totalRuns = totalRuns + 1;
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            totalExtras++;
            firstInningData.isLastBallExtra = true;
            firstInningBowlerData[index].runs = firstInningBowlerData[index].runs + 1;
        }
        else {
            batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
            firstInningBowlerData[index].balls++;
            totalBalls++;
        }
    }


    function startFirstInning(teamA, teamB, match) {
        firstInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true
            }
        )
        firstInningBatsmanData.push(
            {
                playerId: player[(teamA.teamId - 1) * 11 + 1].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true
            }
        )
        while (firstInningData.balls < 120 && firstInningData.wickets < 10) {
            if (((firstInningData.balls % 6) === 0) && !(firstInningData.isLastBallExtra)) {
                getFirstInningNewBowler(teamB);
                let temp = firstInningData.striker;
                firstInningData.striker = firstInningData.nonStriker;
                firstInningData.nonStriker = temp;
                simulateFirstInning(teamA, firstInningData.lastBowlerId);
            }
            else {
                simulateFirstInning(teamA, firstInningData.lastBowlerId);
            }
        }
        console.log(`${teamA.teamShortName}: ${firstInningData.runs}-${firstInningData.wickets} \t (${Math.floor(firstInningData.balls / 6)}.${firstInningData.balls % 6}) \t Extras: ${firstInningData.extras}`);
        console.log(`Boundaries: 4's: ${firstInningData.fours} \t 6's: ${firstInningData.sixes}`);
        console.log(
            "Name".padEnd(25) +
            "R".padEnd(5) +
            "B".padEnd(5) +
            "4".padEnd(5) +
            "6".padEnd(5)
        );

        for (let i = 0; i < firstInningBatsmanData.length; i++) {
            if (firstInningBatsmanData[i].isNotOut == true) {
                console.log(
                    (player[batsmanStatistic[i].id - 1].playerName + "*").padEnd(25) +
                    batsmanStatistic[i].runs.toString().padEnd(5) +
                    batsmanStatistic[i].balls.toString().padEnd(5) +
                    batsmanStatistic[i].fours.toString().padEnd(5) +
                    batsmanStatistic[i].sixes.toString().padEnd(5)
                );
            }
            else {
                console.log(
                    player[batsmanStatistic[i].id - 1].playerName.padEnd(25) +
                    batsmanStatistic[i].runs.toString().padEnd(5) +
                    batsmanStatistic[i].balls.toString().padEnd(5) +
                    batsmanStatistic[i].fours.toString().padEnd(5) +
                    batsmanStatistic[i].sixes.toString().padEnd(5)
                );
            }
        }
        console.log("");
        simulateSecondInning(teamB, teamA, match, totalRuns);
    }
    function simulateSecondInning(teamA, teamB, match, targetRuns) {
        let totalRuns = 0;
        let totalBalls = 0;
        let totalWickets = 0;
        let totalFours = 0;
        let totalSixes = 0;
        let totalExtras = 0;
        let batsmanStatistic = [];
        let striker = 0;
        let nonStriker = 1;
        let playersPlayed = 1;
        batsmanStatistic.push(
            {
                id: player[(teamA.teamId - 1) * 11 + 0].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true
            }
        );
        batsmanStatistic.push(
            {
                id: player[(teamA.teamId - 1) * 11 + 1].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isNotOut: true
            }
        );
        while (totalBalls < 120 && totalWickets < 10 && totalRuns <= targetRuns) {
            let lastBallResult = generateOutcome(player[batsmanStatistic[striker].id - 1].roleId);
            if (lastBallResult === 1 || lastBallResult === 3) {
                totalRuns = totalRuns + lastBallResult;
                totalBalls++;
                batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
            }
            else if (lastBallResult === 2) {
                totalRuns = totalRuns + lastBallResult;
                batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                totalBalls++;
            }
            else if (lastBallResult === 4) {
                totalRuns = totalRuns + lastBallResult;
                batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                batsmanStatistic[striker].fours = batsmanStatistic[striker].fours + 1;
                totalFours++;
                totalBalls++;
            }
            else if (lastBallResult == 5) {
                totalWickets++;
                totalBalls++;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                batsmanStatistic[striker].isNotOut = false;
                striker = playersPlayed + 1;
                playersPlayed++;
                batsmanStatistic.push(
                    {
                        id: player[(teamA.teamId - 1) * 11 + playersPlayed].playerId,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isNotOut: true
                    }
                );
            }
            else if (lastBallResult === 6) {
                totalRuns = totalRuns + lastBallResult;
                totalSixes++;
                totalBalls++;
                batsmanStatistic[striker].runs = batsmanStatistic[striker].runs + lastBallResult;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                batsmanStatistic[striker].sixes = batsmanStatistic[striker].sixes + 1;
            }
            else if (lastBallResult === 7) {
                totalRuns = totalRuns + 1;
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                totalExtras++;
            }
            else {
                batsmanStatistic[striker].balls = batsmanStatistic[striker].balls + 1;
                totalBalls++;
            }
        }
        console.log(`${teamA.teamShortName}: ${totalRuns}-${totalWickets} \t (${Math.floor(totalBalls / 6)}.${totalBalls % 6}) \t Extras: ${totalExtras}`);
        console.log(`Boundaries: 4's: ${totalFours} \t 6's: ${totalSixes}`);
        console.log(
            "Name".padEnd(25) +
            "R".padEnd(5) +
            "B".padEnd(5) +
            "4".padEnd(5) +
            "6".padEnd(5)
        );

        for (let i = 0; i < batsmanStatistic.length; i++) {
            if (batsmanStatistic[i].isNotOut == true) {
                console.log(
                    (player[batsmanStatistic[i].id - 1].playerName + "*").padEnd(25) +
                    batsmanStatistic[i].runs.toString().padEnd(5) +
                    batsmanStatistic[i].balls.toString().padEnd(5) +
                    batsmanStatistic[i].fours.toString().padEnd(5) +
                    batsmanStatistic[i].sixes.toString().padEnd(5)
                );
            }
            else {
                console.log(
                    player[batsmanStatistic[i].id - 1].playerName.padEnd(25) +
                    batsmanStatistic[i].runs.toString().padEnd(5) +
                    batsmanStatistic[i].balls.toString().padEnd(5) +
                    batsmanStatistic[i].fours.toString().padEnd(5) +
                    batsmanStatistic[i].sixes.toString().padEnd(5)
                );
            }
        }
        console.log("--------------------------------------------------");
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