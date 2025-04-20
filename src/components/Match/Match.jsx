import style from "./Match.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState([]);
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        setTeams(teams);
        setMatchData(matchData);
        setFixture(fixture);
        document.title = `Match ${matchId}`;
    }, []);
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <p>Match {matchId}: {teams[fixture[matchId - 1]?.homeTeamId - 1]?.shortName} vs {teams[fixture[matchId - 1]?.awayTeamId - 1]?.shortName}</p>
            </div>
            <div className={style.containerContent}>
                <p>{teams[matchData?.inning1?.teamId - 1]?.shortName} {matchData?.inning1?.runs}{(matchData?.inning1?.wickets != 10) && -matchData?.inning1?.wickets}</p>
                <p>{teams[matchData?.inning2?.teamId - 1]?.shortName} {matchData?.inning2?.runs}{(matchData?.inning2?.wickets != 10) && -matchData?.inning2?.wickets}</p>
            </div>
        </div>
    );
}

export default Match;