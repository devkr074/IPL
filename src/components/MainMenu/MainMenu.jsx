import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MainMenu.module.css";
import getIsUserMatch from "../../utils/getIsUserMatch.js";
import getTossOutcome from "../../utils/getTossOutcome.js";
import getOptionOutcome from "../../utils/getOptionOucome.js";
import setMatchData from "../../utils/setMatchData.js";
function MainMenu() {
    const [schedule, setSchedule] = useState([]);
    const [team, setTeam] = useState([]);
    const [player, setPlayer] = useState([]);
    const [battingStatistic, setBattingStatistic] = useState([]);
    const [bowlingStatistic, setBowlingStatistic] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "IPL - Main Menu";
        const schedule = JSON.parse(localStorage.getItem("schedule"));
        const team = JSON.parse(localStorage.getItem("team"));
        const player = JSON.parse(localStorage.getItem("player"));
        const battingStatistic = JSON.parse(localStorage.getItem("battingStatistics"));
        const bowlingStatistic = JSON.parse(localStorage.getItem("bowlingStatistic"));
        setSchedule(schedule);
        setTeam(team);
        setPlayer(player);
        setBattingStatistic(battingStatistic);
        setBowlingStatistic(bowlingStatistic);
    }, []);
    useEffect(() => {
        for (let i = 0; i < schedule.length; i++) {
            const match = schedule[i];
            const matchStatusId = match.matchStatusId;

            if (matchStatusId == null) {
                if (getIsUserMatch(match)) {
                    break;
                } else {
                    const tossCall = Math.random() < 0.5 ? "Heads" : "Tails";
                    const tossOutcome = getTossOutcome();
                    const optionOutcome = getOptionOutcome();
                    match.tossStatusId = 1;
                    if (tossCall === tossOutcome) {
                        match.tossResult = `${team[match.awayTeamId - 1].teamShortName} elected to ${optionOutcome} first`;
                        setSchedule(schedule);
                        localStorage.setItem("schedule", JSON.stringify(schedule));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.awayTeamId, match.homeTeamId, match, team, player, battingStatistic, bowlingStatistic);
                        } else {
                            setMatchData(match.homeTeamId, match.awayTeamId, match, team, player, battingStatistic, bowlingStatistic);
                        }
                    } else {
                        match.tossResult = `${team[match.homeTeamId - 1].teamShortName} elected to ${optionOutcome} first`;
                        setSchedule(schedule);
                        localStorage.setItem("schedule", JSON.stringify(schedule));
                        if (optionOutcome === "Bat") {
                            setMatchData(match.homeTeamId, match.awayTeamId, match, team, player, battingStatistic, bowlingStatistic);
                        } else {
                            setMatchData(match.awayTeamId, match.homeTeamId, match, team, player, battingStatistic, bowlingStatistic);
                        }
                    }
                }
            }
        }
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
                            <p>Section Content</p>
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