import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import style from "./MainMenu.module.css";
import trophy from "../../assets/trophy.png";
function MainMenu() {
    const [schedule, setSchedule] = useState([]);
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [team, setTeam] = useState([]);
    const [player, setPlayer] = useState([]);
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const team = JSON.parse(localStorage.getItem("team"));
        const player = JSON.parse(localStorage.getItem("player"));
        setSchedule(schedule);
        setTotalMatchPlayed(totalMatchPlayed);
        setTeam(team);
        setPlayer(player);
        setUserTeamId(userTeamId);
    }, []);
    useEffect(() => {
        for (const match of schedule) {
            const matchStatusId = match.matchStatusId;
            const teamA = team[match.teamAId - 1];
            const teamB = team[match.teamBId - 1];
            if (matchStatusId === null) {
                if (isUserMatch(match)) {
                    break;
                }
                else {
                    simulateToss(teamA, teamB, match);
                }
            }
        }
    }, [schedule]);
    function simulateToss(teamA, teamB, match) {
        const random = Math.round(Math.random());
        match.tossStatusId = 1;
        if (random == 0) {
            const random = Math.round(Math.random());
            if (random == 0) {
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
    function getStriker(team) {
        return player[(team.teamId - 1) * 11];
    }

    function getNonStriker(team) {
        return player[(team.teamId - 1) * 11 + 1];
    }

    function getNewPlayer(team, wicket) {
        return player[(team.teamId - 1) * 11 + wicket + 1];
    }


    /*
    
    function generateWeightedRangesAndFindNumber() {
    // Predefined weights for each index (0-6)
    const weights = [20, 30, 10, 5, 20, 5, 10];
    
    // Generate a random permutation of indices 0-6
    const indices = [0, 1, 2, 3, 4, 5, 6];
    const randomArray = [];
    
    while (indices.length > 0) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        randomArray.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
    }
    
    // Calculate total weight and create ranges
    let current = 1;
    const ranges = [];
    const rangeMap = {};
    
    for (const index of randomArray) {
        const weight = weights[index];
        const start = current;
        const end = current + weight - 1;
        ranges.push({
            index: index,
            range: [start, end],
            description: `${index}: [${start}-${end}]`
        });
        rangeMap[index] = [start, end];
        current = end + 1;
    }
    
    // Generate a random number between 1-100
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    // Find which range the number falls into
    let selectedIndex = -1;
    for (const range of ranges) {
        if (randomNumber >= range.range[0] && randomNumber <= range.range[1]) {
            selectedIndex = range.index;
            break;
        }
    }
    
    return {
        randomArray: randomArray,
        ranges: ranges.map(r => r.description),
        rangeMap: rangeMap,
        totalWeight: 100,
        randomNumber: randomNumber,
        selectedIndex: selectedIndex
    };
}

// Run the function and display results
const result = generateWeightedRangesAndFindNumber();

console.log("Randomly generated index order:", result.randomArray);
console.log("Generated Ranges:");
result.ranges.forEach(range => console.log(range));
console.log(`\nRandom number generated: ${result.randomNumber}`);
console.log(`This number falls in range for index: ${result.selectedIndex}`);
console.log(`Which corresponds to: ${result.ranges.find(r => r.startsWith(result.selectedIndex + ":"))}`);

    */



    function simulateFirstInning(teamA, teamB, match) {
        console.log(teamA.teamShortName);
        let wicket = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        console.log(striker.playerId);
        console.log(nonStriker.playerId);
        let statistic = JSON.parse(localStorage.getItem("statistic")) || [];
        const strikerExists = statistic.some(player => player.playerId === striker.playerId);

        if (!strikerExists) {
            statistic.push({
                playerId: striker.playerId,
                playerName: striker.playerName,
                runs: 0,
                ballsFaced: 0,
                wickets: 0,
            });
            localStorage.setItem("statistic", JSON.stringify(statistic));
        }
        const nonStrikerExists = statistic.some(player => player.playerId === nonStriker.playerId);

        if (!nonStrikerExists) {
            statistic.push({
                playerId: nonStriker.playerId,
                playerName: nonStriker.playerName,
                runs: 0,
                ballsFaced: 0,
                wickets: 0,
            });

            localStorage.setItem("statistic", JSON.stringify(statistic));
        }

        console.log(statistic);
    }
    function isUserMatch(match) {
        return match.teamAId === userTeamId || match.teamBId === userTeamId;
    }
    const navigate = useNavigate();
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