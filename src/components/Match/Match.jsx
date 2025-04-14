import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Match.module.css';
function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [player, setPlayer] = useState(null);
    const [team, setTeam] = useState(null);
    const [tab, setTab] = useState("Commentary");
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const schedule = JSON.parse(localStorage.getItem('schedule'));
        const team = JSON.parse(localStorage.getItem('team'));
        const player = JSON.parse(localStorage.getItem('player'));
        setMatchData(data);
        setSchedule(schedule);
        setTeam(team);
        setPlayer(player);
        document.title = `Match ${matchId}`;
    }, [matchId]);

    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>Match #{matchId}</h1>

                    <select onChange={handleTabChange} value={tab}>
                        <option value="Commentary">Commentary</option>
                        <option value="Scorecard">Scorecard</option>
                    </select>
                </div>
                <div className={style.section}>
                    {tab == "Commentary" && ( matchData && (
                        <>
                            <div className={style.card}>
                                <h2>{team[matchData.inning1.teamId - 1].teamShortName}: {matchData.inning1.runs}/{matchData.inning1.wickets}</h2>
                                <h2>{team[matchData.inning2.teamId - 1].teamShortName}: {matchData.inning2.runs}/{matchData.inning2.wickets}</h2>
                                <h2>{schedule[matchId - 1].matchResult}</h2>
                            </div>
                            <div className={style.card}>
                                {
                                    matchData.inning2Commentary.slice().reverse().map((commentary, index) => (
                                        <div key={index}>
                                            <p>{Math.floor(commentary.ball / 6) + "." + (commentary.ball % 6)} {commentary.bowlerName} to {commentary.batsmanName}: {commentary.outcome}</p>
                                            <p>{commentary.commentary}</p>
                                        </div>
                                    ))
                                }
                                <p>----------------------------------------------------------</p>
                                {
                                    matchData.inning1Commentary.slice().reverse().map((commentary, index) => (
                                        <div key={index}>
                                            <p>{Math.floor(commentary.ball / 6) + "." + (commentary.ball % 6)} {commentary.bowlerName} to {commentary.batsmanName}: {commentary.outcome}</p>
                                            <p>{commentary.commentary}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </>
                    ))}

                    {tab=="Scorecard" && ( matchData && (
                        <>
                            <div className={style.card}>
                                <h2>{team[matchData.inning1.teamId - 1].teamShortName}: {matchData.inning1.runs}/{matchData.inning1.wickets}</h2>
                                <h2>{team[matchData.inning2.teamId - 1].teamShortName}: {matchData.inning2.runs}/{matchData.inning2.wickets}</h2>
                                <h2>{schedule[matchId - 1].matchResult}</h2>
                            </div>
                            <div className={style.card}>
                                <h3>Innings 1</h3>
                                {
                                    matchData.inning1Batsman.map((batsman, index) => (
                                        <p key={index}>{player[batsman.playerId-1].playerName} - {batsman.runs} ({batsman.balls})</p>
                                    ))
                                }
                            </div>
                            <div className={style.card}>
                                <h3>Innings 2</h3>
                                {
                                    matchData.inning2Batsman.map((batsman, index) => (
                                        <p key={index}>{player[batsman.playerId-1].playerName} - {batsman.runs} ({batsman.balls})</p>
                                    ))
                                }
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Match;