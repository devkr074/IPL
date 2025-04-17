import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const [gameStatus, setGameStatus] = useState(false);
    const [orangeCap, setOrangeCap] = useState(null);
    const [purpleCap, setPurpleCap] = useState(null);
    const [nextMatch, setNextMatch] = useState(null);
    const [winner, setWinner] = useState(null);
    const [squad, setSquad] = useState([]);
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);
    const [tableTopper, setTableTopper] = useState([]);
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        const gameStatus = localStorage.getItem("gameStatus");
        const orangeCap = JSON.parse(localStorage.getItem("orangeCapId"));
        const purpleCap = JSON.parse(localStorage.getItem("purpleCapId"));
        const nextMatch = JSON.parse(localStorage.getItem("nextMatchId"));
        const winner = Number(localStorage.getItem("winnerTeamId"));
        const tableTopper = JSON.parse(localStorage.getItem("tableTopper")) || [];
        const squad = JSON.parse(localStorage.getItem("squad")) || [];
        const teams = JSON.parse(localStorage.getItem("teams")) || [];
        const venues = JSON.parse(localStorage.getItem("venues")) || [];
        setGameStatus(gameStatus);
        setOrangeCap(orangeCap);
        setPurpleCap(purpleCap);
        setNextMatch(nextMatch);
        setWinner(winner);
        setSquad(squad);
        setTableTopper(tableTopper);
        setTeams(teams);
        setVenues(venues);
    }, []);
    const navigate = useNavigate();
    function handleStartTournament() {
        navigate("/teams");
    }
    function handleResumeTournament() {
        navigate("/main-menu");
    }
    function handleRestartTournament() {
        if (window.confirm("Really want to Restart IPL Tournament?")) {
            localStorage.clear();
            navigate("/teams");
        }
        else {
            return;
        }
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Indian Premier League</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <div className={style.sectionContent}>
                            {gameStatus && <button className={style.button} onClick={handleResumeTournament} >Resume Tournament</button>}
                            {gameStatus ? <button className={style.button} onClick={handleRestartTournament} >Restart Tournament</button> : <button className={`${style.button} ${style.startButton}`} onClick={handleStartTournament} >Start Tournament</button>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Orange Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(orangeCap) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={squad[orangeCap.playerId - 1]?.profilePicture} alt={orangeCap.playerName} title={orangeCap.playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{squad[orangeCap.playerId - 1].playerName}</p>
                                        <span>{orangeCap.runs} {(orangeCap.runs > 1) ? "Runs" : "Run"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Purple Cap</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(purpleCap) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={squad[purpleCap.playerId - 1]?.profilePicture} alt={purpleCap.playerName} title={purpleCap.playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{squad[purpleCap.playerId - 1].playerName}</p>
                                        <span>{purpleCap.wickets} {(purpleCap.wickets > 1) ? "Wickets" : "Wicket"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>{(winner) ? "Winner" : "Next Match"}</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(nextMatch) ?
                                <>
                                    <div className={style.detailsContainer}>
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {venues[nextMatch.venueId - 1].venueCity}</span>
                                    </div>
                                    <div className={style.imageContainer}>
                                        <img src={teams[nextMatch.homeTeamId - 1].logo} alt={nextMatch.teamAShortName} title={nextMatch.teamAShortName} />
                                        <span>V/S</span>
                                        <img src={teams[nextMatch.awayTeamId - 1].logo} alt={nextMatch.teamBShortName} title={nextMatch.teamBShortName} />
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>Table Topper</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(gameStatus && tableTopper.length) ?
                                <div className={style.imageContainer}>
                                    {tableTopper.map((teamData) =>
                                        <img key={teamData.teamId} src={teams[teamData.teamId-1].logo} alt={teamData.teamShortName} title={teamData.teamShortName} />
                                    )}
                                </div> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;