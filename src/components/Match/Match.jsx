import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './Match.module.css';
function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState([]);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const teams = JSON.parse(localStorage.getItem(`teams`));
        setMatchData(matchData);
        setTeams(teams);
    }, [matchId]);
    return (
        <>
            <div className={style.container}>
                
                <div className={style.matchSummary}>
                    <p>{teams[matchData.inning1?.teamId - 1]?.teamShortName}: {matchData.inning1?.runs}/{matchData.inning1?.wickets} ({Math.floor(matchData.inning1?.balls / 6)}.{matchData.inning1?.balls % 6})</p>
                    <p>{teams[matchData.inning2?.teamId - 1]?.teamShortName}: {matchData.inning2?.runs}/{matchData.inning2?.wickets} ({Math.floor(matchData.inning2?.balls / 6)}.{matchData.inning2?.balls % 6})</p>
                </div>
                <div className={style.matchCommentary}>
                    <h1>Commentary</h1>
                    {matchData.inning2Commentary?.slice().reverse().map((comment, index) => (
                        <div key={index} className={style.comment}>
                            <span>{Math.floor(comment.ball/6)}.{comment.ball%6}</span> <span>{comment.bowler} to {comment.batsman}, {comment.outcome}. {comment.commentary}</span>
                        </div>
                    ))}
                    <p>---------------------------------------------------------</p>
                    {matchData.inning1Commentary?.slice().reverse().map((comment, index) => (
                        <div key={index} className={style.comment}>
                            <span>{Math.floor(comment.ball/6)}.{comment.ball%6}</span> <span>{comment.bowler} to {comment.batsman}, {comment.outcome}. {comment.commentary}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Match;