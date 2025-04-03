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

    // function getWeights(roleId, runsScored) {
    //     let weights;
    //     if (roleId == 1) {
    //         weights = [30, 35, 8, 2, 12, 5, 8];
    //     }
    //     else if (roleId == 2) {
    //         weights = [40, 45, 8, 0, 9, 5, 6];
    //     }
    //     else {
    //         weights = [40, 27, 2, 0, 2, 15.9, 0.1];
    //     }
    //     return weights;
    // }

    // function getRuns(roleId, runsScored) {
    //     // Predefined weights for each index (0-6)
    //     const weights = getWeights(roleId, runsScored);
    //     // Generate a random permutation of indices 0-6
    //     const indices = [0, 1, 2, 3, 4, 5, 6];
    //     const randomArray = [];
    //     while (indices.length > 0) {
    //         const randomIndex = Math.floor(Math.random() * indices.length);
    //         randomArray.push(indices[randomIndex]);
    //         indices.splice(randomIndex, 1);
    //     }
    //     // Calculate total weight and create ranges
    //     let current = 1;
    //     const ranges = [];
    //     for (const index of randomArray) {
    //         const weight = weights[index];
    //         const start = current;
    //         const end = current + weight - 1;
    //         ranges.push({
    //             index: index,
    //             range: [start, end],
    //             description: `${index}: [${start}-${end}]`
    //         });
    //         current = end + 1;
    //     }
    //     // Generate a random number between 1-100
    //     const randomNumber = Math.floor(Math.random() * 100) + 1;
    //     // Find which range the number falls into
    //     for (const range of ranges) {
    //         if (randomNumber >= range.range[0] && randomNumber <= range.range[1]) {
    //             return range.index;  // or return range.index if you just want the number
    //         }
    //     }
    //     return 0; // in case no range was found (shouldn't happen if weights sum to 100)
    // }

    function createOutcomeGenerator(roleId) {
        const outcomes = [];
    
        if (roleId == 1) {
            outcomes.push(...Array(45).fill(1));  // 45 times 1
            outcomes.push(...Array(8).fill(2));  // 10 times 2
            outcomes.push(...Array(2).fill(3));   // 2 times 3
            outcomes.push(...Array(18).fill(4));  // 18 times 4
            outcomes.push(...Array(5).fill(5));   // 0 times 5 (if not needed)
            outcomes.push(...Array(10).fill(6));  // 10 times 6
            outcomes.push(...Array(7).fill(7));  // 10 times 7
            outcomes.push(...Array(25).fill(0));  // 25 times 0 (total: 120)
        }
        else if (roleId == 2) {
            outcomes.push(...Array(42).fill(1));  
            outcomes.push(...Array(8).fill(2));  
            outcomes.push(...Array(1).fill(3));   
            outcomes.push(...Array(20).fill(4));  
            outcomes.push(...Array(7).fill(5));   
            outcomes.push(...Array(10).fill(6));  
            outcomes.push(...Array(7).fill(7));  
            outcomes.push(...Array(25).fill(0));  // Adjust to reach desired total
        }
        else if (roleId == 3) {
            outcomes.push(...Array(25).fill(1));  
            outcomes.push(...Array(4).fill(2));  
            outcomes.push(...Array(0).fill(3));   
            outcomes.push(...Array(4).fill(4));  
            outcomes.push(...Array(20).fill(5));   
            outcomes.push(...Array(2).fill(6));  
            outcomes.push(...Array(5).fill(7));  
            outcomes.push(...Array(60).fill(0));  // Adjust to reach desired total
        }
    
        // Fisher-Yates shuffle
        for (let i = outcomes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
        }
    
        let currentIndex = 0;
    
        return function() {
            if (currentIndex >= outcomes.length) {
                // Reshuffle when all outcomes are used
                for (let i = outcomes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
                }
                currentIndex = 0;
            }
            return outcomes[currentIndex++];
        };
    }
    
    // Usage:
    function getRuns(roleId) {
        const getOutcome = createOutcomeGenerator(roleId);
        return getOutcome();  // No argument needed
    }


    function simulateFirstInning(teamA, teamB, match) {
        let wicket = 0;
        let sixes = 0;
        let fours = 0;
        let single = 0;
        let double = 0;
        let triple = 0;
        let dots = 0;
        let extras = 0;
        let runs = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        let i = 0;
        while (i < 120 && wicket < 10) {
            let lastBallRun = getRuns(striker.roleId, runs);
            if (lastBallRun == 0) {
                dots++;
            }
            else if (lastBallRun == 7) {
                runs = runs + 1;
                extras++;
                i--;
            }
            else if (lastBallRun == 1) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
                single++;
            }
            else if (lastBallRun == 2) {
                runs = runs + lastBallRun;
                double++;
            }
            else if (lastBallRun == 3) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
                triple++;
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
                console.log(runs);
                console.log("-----");
                wicket++;
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 0's: ${dots} 1's: ${single} 2's: ${double} 3's: ${triple} 4's: ${fours} 6's: ${sixes} Extras: ${extras} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
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
        let single = 0;
        let double = 0;
        let triple = 0;
        let extras = 0;
        let dots = 0;
        let runs = 0;
        let striker = getStriker(teamA);
        let nonStriker = getNonStriker(teamA);
        let i = 0;
        while (i < 120 && wicket < 10 && runs <= run) {
            let lastBallRun = getRuns(striker.roleId, runs);
            if (lastBallRun == 0) {
                dots++;
            }
            else if (lastBallRun == 7) {
                runs = runs + 1;
                i--;
                extras++;
            }
            else if (lastBallRun == 1) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
                single++;
            }
            else if (lastBallRun == 2) {
                runs = runs + lastBallRun;
                double++;
            }
            else if (lastBallRun == 3) {
                runs = runs + lastBallRun;
                let temp = striker;
                striker = nonStriker;
                nonStriker = temp;
                triple++;
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
                console.log(runs);
                console.log("-----");
                wicket++;
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        // 0's: ${dots} 1's: ${single} 2's: ${double} 3's: ${triple} 4's: ${fours} 6's: ${sixes} Extras: ${extras} balls: ${i}
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 0's: ${dots} 1's: ${single} 2's: ${double} 3's: ${triple} 4's: ${fours} 6's: ${sixes} Extras: ${extras} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
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