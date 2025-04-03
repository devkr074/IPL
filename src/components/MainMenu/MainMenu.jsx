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
                    return;
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
    function createOutcomeGenerator(roleId) {
        const outcomes = [];
        if (roleId == 1) {
            outcomes.push(...Array(45).fill(1));
            outcomes.push(...Array(8).fill(2));
            outcomes.push(...Array(2).fill(3));
            outcomes.push(...Array(18).fill(4));
            outcomes.push(...Array(5).fill(5));
            outcomes.push(...Array(10).fill(6));
            outcomes.push(...Array(7).fill(7));
            outcomes.push(...Array(25).fill(0));
        }
        else if (roleId == 2) {
            outcomes.push(...Array(42).fill(1));
            outcomes.push(...Array(8).fill(2));
            outcomes.push(...Array(1).fill(3));
            outcomes.push(...Array(20).fill(4));
            outcomes.push(...Array(7).fill(5));
            outcomes.push(...Array(10).fill(6));
            outcomes.push(...Array(7).fill(7));
            outcomes.push(...Array(25).fill(0));
        }
        else if (roleId == 3) {
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
        let currentIndex = 0;
        return function () {
            if (currentIndex >= outcomes.length) {
                for (let i = outcomes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
                }
                currentIndex = 0;
            }
            return outcomes[currentIndex++];
        };
    }
    function getRuns(roleId) {
        const getOutcome = createOutcomeGenerator(roleId);
        return getOutcome();
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
                wicket++;
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 0's: ${dots} 1's: ${single} 2's: ${double} 3's: ${triple} 4's: ${fours} 6's: ${sixes} Extras: ${extras} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
        simulateSecondInning(teamB, teamA, match, runs);
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
                wicket++;
                striker = getNewPlayer(teamA, wicket);
            }
            i++;
        }
        console.log(`${teamA.teamShortName}: ${runs}-${wicket} 0's: ${dots} 1's: ${single} 2's: ${double} 3's: ${triple} 4's: ${fours} 6's: ${sixes} Extras: ${extras} balls: ${i} ov: ${Math.floor(i / 6)}.${i % 6}`);
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