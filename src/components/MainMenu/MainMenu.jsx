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
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const team = JSON.parse(localStorage.getItem("team"));
        setSchedule(schedule);
        setTotalMatchPlayed(totalMatchPlayed);
        setTeam(team);
        setUserTeamId(userTeamId);

    }, []);
    useEffect(() => {
        for (const match of schedule) {
            const matchStatusId = match.matchStatusId;
            const teamA = team[match.teamAId - 1]; // Make sure `team` is defined!
            const teamB = team[match.teamBId - 1]; // Make sure `team` is defined!

            if (matchStatusId === null) {
                if (isUserMatch(match)) { // Make sure `isUserMatch` is defined!
                    break; // Now `break` works because we're in a `for...of` loop
                } else {
                    simulateToss(teamA, teamB, match);
                }
            }
        }
    }, [schedule]);
    function simulateToss(teamA, teamB, match) {
        const random = Math.round(Math.random());
        if (random == 0) {
            const random = Math.round(Math.random());
            if (random == 0) {
                simulateFirstInning(teamA, teamB, match);
                console.log(`${teamA.teamShortName} won the toss and elected to bat first`);
            }
            else if (random == 1) {
                simulateFirstInning(teamB, teamA, match);
                console.log(`${teamA.teamShortName} won the toss and elected to ball first`);
            }
        }
        if (random == 1) {
            const random = Math.round(Math.random());
            if (random == 0) {
                simulateFirstInning(teamB, teamA, match);
                console.log(`${teamB.teamShortName} won the toss and elected to bat first`);
            }
            else if (random == 1) {
                simulateFirstInning(teamA, teamB, match);
                console.log(`${teamB.teamShortName} won the toss and elected to ball first`);
            }
        }
    }
    function simulateFirstInning(teamA, teamB, match) {
        const score=Math.floor(Math.random() * (250 - 150 + 1)) + 150
        console.log(`${teamA.teamShortName}: ${score}`);
        simulateSecondInning(teamB,teamA,match,score);
    }
    function simulateSecondInning(teamA, teamB, match) {
        const score2=Math.floor(Math.random() * (250 - 150 + 1)) + 150
        console.log(`${teamA.teamShortName}: ${score2}`);
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