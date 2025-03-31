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

    function getWeights(playerRating, runsScored) {
        let weights;
        if (playerRating >= 8 && playerRating <= 10) {
            weights = [15, 15, 10, 8, 20, 17, 15];
        }
        else if (playerRating >= 5 && playerRating <= 7) {
            weights = [20, 50, 5, 2, 10, 8, 5];
        }
        else {
            weights = [20, 17, 5, 3, 20, 30, 5];
        }
        return weights;
    }

    function getRuns(playerRating, runsScored) {
        // Predefined weights for each index (0-6)
        const weights = getWeights(playerRating, runsScored);
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
        for (const index of randomArray) {
            const weight = weights[index];
            const start = current;
            const end = current + weight - 1;
            ranges.push({
                index: index,
                range: [start, end],
                description: `${index}: [${start}-${end}]`
            });
            current = end + 1;
        }
        // Generate a random number between 1-100
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        // Find which range the number falls into
        for (const range of ranges) {
            if (randomNumber >= range.range[0] && randomNumber <= range.range[1]) {
                return range.index;  // or return range.index if you just want the number
            }
        }
        return 0; // in case no range was found (shouldn't happen if weights sum to 100)
    }



    function simulateFirstInning(teamA, teamB, match) {
        console.log(teamA.teamShortName);
        let wicket = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        let runs = 0;
        for (let i = 0; i < 120; i++) {
            if (getRuns(striker.playerRating, runs) === 5) {
                console.log('W');
            }
            else {
                console.log(getRuns(striker.playerRating, runs));
            }
        }
        let statistic = JSON.parse(localStorage.getItem("statistic")) || [];
        // const strikerExists = statistic.some(player => player.playerId === striker.playerId);

        // if (!strikerExists) {
        //     statistic.push({
        //         playerId: striker.playerId,
        //         playerName: striker.playerName,
        //         runs: 0,
        //         ballsFaced: 0,
        //         wickets: 0,
        //     });
        //     localStorage.setItem("statistic", JSON.stringify(statistic));
        // }
        // const nonStrikerExists = statistic.some(player => player.playerId === nonStriker.playerId);

        // if (!nonStrikerExists) {
        //     statistic.push({
        //         playerId: nonStriker.playerId,
        //         playerName: nonStriker.playerName,
        //         runs: 0,
        //         ballsFaced: 0,
        //         wickets: 0,
        //     });

        //     localStorage.setItem("statistic", JSON.stringify(statistic));
        // }
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