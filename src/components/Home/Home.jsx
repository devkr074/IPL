import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const [gameStatus, setGameStatus] = useState(false);
    const [orangeCap, setOrangeCap] = useState([]);
    const [purpleCap, setPurpleCap] = useState([]);
    const [nextMatch, setNextMatch] = useState([]);
    const [winner, setWinner] = useState([]);
    const [tableTopper, setTableTopper] = useState([]);
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
        const gameStatus = localStorage.getItem("gameStatus");
        const orangeCap = JSON.parse(localStorage.getItem("orangeCap"));
        const purpleCap = JSON.parse(localStorage.getItem("purpleCap"));
        const nextMatch = JSON.parse(localStorage.getItem("nextMatch"));
        const winner = JSON.parse(localStorage.getItem("winner"));
        const tableTopper = JSON.parse(localStorage.getItem("tableTopper"));
        setGameStatus(gameStatus);
        setOrangeCap(orangeCap);
        setPurpleCap(purpleCap);
        setNextMatch(nextMatch);
        setWinner(winner);
        setTableTopper(tableTopper);
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
                            {(orangeCap && orangeCap.length) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={orangeCap.profilePicture} alt={orangeCap.playerName} title={orangeCap.playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{orangeCap.playerName}</p>
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
                            {(purpleCap && purpleCap.length) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={purpleCap.profilePicture} alt={purpleCap.playerName} title={purpleCap.playerName} />
                                    </div>
                                    <div className={style.detailsContainer}>
                                        <p>{purpleCap.playerName}</p>
                                        <span>{purpleCap.wickets} {(purpleCap.wickets > 1) ? "Wickets" : "Wicket"}</span>
                                    </div>
                                </> : <p className={style.altMessage} >No Data Available Currently!</p>}
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.sectionHeader}>
                            <p>{(winner && winner.length) ? "Winner" : "Next Match"}</p>
                        </div>
                        <div className={style.sectionContent}>
                            {(nextMatch && nextMatch.length) ?
                                <>
                                    <div className={style.detailsContainer}>
                                        <span>Match #{nextMatch.matchId}</span>
                                        <span>Venue: {nextMatch.venueCity}</span>
                                    </div>
                                    <div className={style.imageContainer}>
                                        <img src={nextMatch.teamALogo} alt={nextMatch.teamAShortName} title={nextMatch.teamAShortName} />
                                        <span>V/S</span>
                                        <img src={nextMatch.teamBLogo} alt={nextMatch.teamBShortName} title={nextMatch.teamBShortName} />
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
                                        <img key={teamData.teamId} src={teamData.logo} alt={teamData.teamShortName} title={teamData.teamShortName} />
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