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

                simulateToss(teamA, teamB, schedule[i]);

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
                simulateFirstInning(teamA, teamB, match);
            }
            else if (random == 1) {
                match.tossResult = `${teamA.teamShortName} elected to Ball first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                simulateFirstInning(teamB, teamA, match);
            }
        }
        if (random == 1) {
            const random = Math.round(Math.random());
            if (random == 0) {
                match.tossResult = `${teamB.teamShortName} elected to Bat first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                simulateFirstInning(teamB, teamA, match);
            }
            else if (random == 1) {
                match.tossResult = `${teamB.teamShortName} elected to Ball first`;
                setSchedule(schedule);
                localStorage.setItem("schedule", JSON.stringify(schedule));
                simulateFirstInning(teamA, teamB, match);
            }
        }
    }
    function simulateFirstInning(teamA, teamB, match) {
        let totalRuns = 0;
        let totalBalls = 0;
        let totalWickets = 0;
        let totalFours = 0;
        let totalSixes = 0;
        let totalExtras = 0;
        let playerStats = [];
        for (let i = 0; i < 11; i++) {
            playerStats.push(
                {
                    id: player[(teamA.teamId - 1) * 11 + i].playerId,
                    runs: 0,
                    balls: 0,
                    fours: 0,
                    sixes: 0
                }
            );
        }
        let striker = 0;
        let nonStriker = 1;
        let playersPlayed = 1;
        while (totalBalls < 120 && totalWickets < 10) {
            let lastBallResult = generateOutcome(player[playerStats[striker].id - 1].roleId);
            if (lastBallResult === 1 || lastBallResult === 3) {
                totalRuns = totalRuns + lastBallResult;
                totalBalls++;
                playerStats[striker].runs = playerStats[striker].runs + lastBallResult;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
            }
            else if (lastBallResult === 2) {
                totalRuns = totalRuns + lastBallResult;
                playerStats[striker].runs = playerStats[striker].runs + lastBallResult;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                totalBalls++;
            }
            else if (lastBallResult === 4) {
                totalRuns = totalRuns + lastBallResult;
                playerStats[striker].runs = playerStats[striker].runs + lastBallResult;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                playerStats[striker].fours = playerStats[striker].fours + 1;
                totalFours++;
                totalBalls++;
            }
            else if (lastBallResult == 5) {
                totalWickets++;
                totalBalls++;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                striker = playersPlayed + 1;
                playersPlayed++;
            }
            else if (lastBallResult === 6) {
                totalRuns = totalRuns + lastBallResult;
                totalSixes++;
                totalBalls++;
                playerStats[striker].runs = playerStats[striker].runs + lastBallResult;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                playerStats[striker].sixes = playerStats[striker].sixes + 1;
            }
            else if (lastBallResult === 7) {
                totalRuns = totalRuns + 1;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                totalExtras++;
            }
            else {
                playerStats[striker].balls = playerStats[striker].balls + 1;
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

        for (let i = 0; i < playerStats.length; i++) {
            console.log(
                player[playerStats[i].id - 1].playerName.padEnd(25) +
                playerStats[i].runs.toString().padEnd(5) +
                playerStats[i].balls.toString().padEnd(5) +
                playerStats[i].fours.toString().padEnd(5) +
                playerStats[i].sixes.toString().padEnd(5)
            );
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
                sixes: 0
            }
        );
        batsmanStatistic.push(
            {
                id: player[(teamA.teamId - 1) * 11 + 1].playerId,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0
            }
        );
        while (totalBalls < 120 && totalWickets < 10 && totalRuns <= targetRuns) {
            let lastBallResult = generateOutcome(player[playerStats[striker].id - 1].roleId);
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
                striker = playersPlayed + 1;
                playersPlayed++;
                batsmanStatistic.push(
                    {
                        id: player[(teamA.teamId - 1) * 11 + playersPlayed].playerId,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0
                    }
                );
            }
            else if (lastBallResult === 6) {
                totalRuns = totalRuns + lastBallResult;
                totalSixes++;
                totalBalls++;
                batsmanStatistic[striker].runs = playerStats[striker].runs + lastBallResult;
                batsmanStatistic[striker].balls = playerStats[striker].balls + 1;
                playerStats[striker].sixes = playerStats[striker].sixes + 1;
            }
            else if (lastBallResult === 7) {
                totalRuns = totalRuns + 1;
                playerStats[striker].balls = playerStats[striker].balls + 1;
                totalExtras++;
            }
            else {
                playerStats[striker].balls = playerStats[striker].balls + 1;
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

        for (let i = 0; i < playerStats.length; i++) {
            console.log(
                player[playerStats[i].id - 1].playerName.padEnd(25) +
                playerStats[i].runs.toString().padEnd(5) +
                playerStats[i].balls.toString().padEnd(5) +
                playerStats[i].fours.toString().padEnd(5) +
                playerStats[i].sixes.toString().padEnd(5)
            );
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