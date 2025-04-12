import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    useEffect(() => {
        const match = JSON.parse(localStorage.getItem(`match-${matchId}`));
        setMatchData(match);
    }, [matchId]);
    return (
        <div>
            <h1>{(matchData) && matchData.firstInningData.runs}</h1>
            <h1>{(matchData) && matchData.secondInningData.runs}</h1>
        </div>
    );
}
export default Match;