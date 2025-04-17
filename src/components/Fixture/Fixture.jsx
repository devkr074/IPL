import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Fixture.module.css'
function Fixture() {
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        setFixture(fixture);
        setTeams(teams);
    }, []);
    function handleMatch(matchId) {
        if (fixture[matchId - 1].matchStatus == 'completed') {
            navigate(`/match/${matchId}`);
        }
    }
    return (
        <>
            <div className={style.container}>
                <h2 className={style.title}>Fixture List</h2>
                <div className={style.fixtureGrid}>
                    {fixture.map((match, index) => (
                        <div key={index} className={style.matchCard} onClick={() => handleMatch(match.matchId)}>
                            {(match.homeTeamId != null ?
                                <img src={teams[match.homeTeamId - 1]?.logo} alt="" height={100} /> :
                                <p>TBC</p>)}
                            <span className={style.vs}>V/S</span>
                            {(match.homeTeamId != null ?
                                <img src={teams[match.awayTeamId - 1]?.logo} alt="" height={100} /> :
                                <p>TBC</p>)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Fixture;