import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import isUserMatch from "../../utils/isUserMatch.js";
import simulateToss from "../../utils/simulateToss.js";
import simulateOpt from "../../utils/simulateOpt.js";
import setMatchData from "../../utils/setMatchData.js";
import simulateInning from "../../utils/simulateInning.js";
function MainMenu() {
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [team, setTeam] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const team = JSON.parse(localStorage.getItem("team"));
        setTotalMatchPlayed(totalMatchPlayed);
        setSchedule(schedule);
        setTeam(team);
    }, []);
    useEffect(() => {
        schedule.forEach((match) => {
            const matchStatusId = match.matchStatusId;
            if (matchStatusId === null) {
                if (isUserMatch(match)) {
                    return;
                }
                else {
                    const tossCall = (Math.random() < 0.5) ? "Heads" : "Tails";
                    const tossOutcome = simulateToss();
                    const optOutcome = simulateOpt();
                    if (tossCall === tossOutcome) {
                        match.tossStatusId = 1;
                        match.tossResult = `${team[match.awayTeamId - 1].teamShortName} elected to ${optOutcome} first`;
                        setSchedule(schedule);
                        localStorage.setItem("schedule", JSON.stringify(schedule));
                        if (optOutcome == 'Bat') {
                            setMatchData(match.awayTeamId, match.homeTeamId, match, team);
                        }
                        else {
                            setMatchData(match.homeTeamId, match.awayTeamId, match, team);
                        }
                    }
                    else {
                        match.tossStatusId = 1;
                        match.tossResult = `${team[match.homeTeamId - 1].teamShortName} elected to ${optOutcome} first`;
                        setSchedule(schedule);
                        localStorage.setItem("schedule", JSON.stringify(schedule));
                        if (optOutcome == 'Bat') {
                            setMatchData(match.homeTeamId, match.awayTeamId, match, team);
                        }
                        else {
                            setMatchData(match.awayTeamId, match.homeTeamId, match, team);
                        }
                    }
                    simulateInning(1, match);
                    simulateInning(2, match);
                }
            }
        });
    }, [schedule]);
    function handleFixture() {
        navigate("/schedule");
    }
    function handleSquad() {
        navigate("/squad");
    }
    function handleVenue() {
        navigate("/venue");
    }
    function handlePointsTable() {
        navigate("/points-table");
    }
    function handleBattingStatistic() {
        navigate("/batting-statistic");
    }
    function handleBowlingStatistic() {
        navigate("/bowling-statistic");
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Main Menu</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Next Match</p>
                        </div>
                        <div className={style.sectionContent}>
                            <p>Hello</p>
                            <p>Bro</p>
                            <p>How are you</p>
                        </div>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleFixture}>Fixture</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleSquad}>Squad</button>
                        <button className={style.button} onClick={handleVenue}>Venue</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handlePointsTable}>Points Table</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBattingStatistic}>Batting Statistic</button>
                    </div>
                    <div className={style.section}>
                        <button className={style.button} onClick={handleBowlingStatistic}>Bowling Statistic</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainMenu;