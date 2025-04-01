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

                
                simulateToss(teamA, teamB, match);

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

    function getWeights(roleId, runsScored) {
        let weights;
        if (roleId == 1) {
            weights = [35, 30, 8, 2, 12, 5, 8];
        }
        else if (roleId == 2) {
            weights = [40, 45, 8, 0, 9, 5, 6];
        }
        else {
            weights = [40, 27, 2, 0, 2, 15.9, 0.1];
        }
        return weights;
    }

    function getRuns(roleId, runsScored) {
        // Predefined weights for each index (0-6)
        const weights = getWeights(roleId, runsScored);
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
        let wicket = 0;
        let sixes = 0;
        let fours = 0;
        let runs = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        let i = 0;
        while (i < 120 && wicket < 10) {
            let lastBallRun = getRuns(striker.roleId, runs);
            if (lastBallRun == 1 || lastBallRun == 3) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
            }
            else if (lastBallRun == 2 || lastBallRun == 0) {
                runs = runs + lastBallRun;
            }
            else if (lastBallRun == 4) {
                runs = runs + lastBallRun;
                fours++;
            }
            else if (lastBallRun == 6) {
                runs = runs + lastBallRun;
                sixes++;
            }
            else if (lastBallRun == 5) {
                wicket++;
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 4's: ${fours} 6's: ${sixes} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
        simulateSecondInning(teamB, teamA, match, runs);
        // let statistic = JSON.parse(localStorage.getItem("statistic")) || [];
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
    function simulateSecondInning(teamA, teamB, match, run) {
        let wicket = 0;
        let sixes = 0;
        let fours = 0;
        let runs = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        let i = 0;
        while (i < 120 && wicket < 10 && runs <= run) {
            let lastBallRun = getRuns(striker.roleId, runs);
            if (lastBallRun == 1 || lastBallRun == 3) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
            }
            else if (lastBallRun == 2 || lastBallRun == 0) {
                runs = runs + lastBallRun;
            }
            else if (lastBallRun == 4) {
                runs = runs + lastBallRun;
                fours++;
            }
            else if (lastBallRun == 6) {
                runs = runs + lastBallRun;
                sixes++;
            }
            else if (lastBallRun == 5) {
                wicket++;
                //console.log(`${runs} 4's: ${fours} 6's: ${sixes}`);
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 4's: ${fours} 6's: ${sixes} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
        console.log("-------------------------------------");
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