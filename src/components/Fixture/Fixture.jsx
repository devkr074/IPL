import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Fixture.module.css'
function Fixture() {
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [userTeamId, setUserTeamId] = useState(null);
    const [leagueMatches, setLeagueMatches] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "IPL - Fixture";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        let leagueMatches = [];
        for (let i = 0; i < 70; i++) {
            leagueMatches.push(fixture[i]);
        }
        setFixture(fixture);
        console.log(leagueMatches);
        setTeams(teams);
        setUserTeamId(userTeamId);
        setLeagueMatches(leagueMatches);
    }, []);
    function handleMatch(matchId) {
        if (fixture[matchId - 1].matchStatus == 'completed') {
            navigate(`/match/${matchId}`);
        }
    }
    function isUserMatch(match) {
        return ((match.homeTeamId == userTeamId) || (match.awayTeamId == userTeamId));
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Fixture</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.tabsContainer}>
                        <button>League Matches</button>
                        <button>Play-off Matches</button>
                    </div>
                    <div className={style.matchContainer}>
                        {leagueMatches?.map((m) => {
                            <div className={style.card}>
                                <p>{m.matchId}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Fixture;