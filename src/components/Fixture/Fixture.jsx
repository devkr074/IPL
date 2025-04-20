import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Fixture.module.css"
function Fixture() {
    const [fixture, setFixture] = useState();
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        document.title = "IPL - Fixture";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(fixture);
        setVenues(venues);
        setTeams(teams);
    }, []);
    const navigate = useNavigate();
    function handleMatch(matchId) {
        navigate(`/match/${matchId}`);
    }
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <p>IPL - Fixture</p>
            </div>
            <div className={style.containerContent}>
                {fixture && fixture.map((m) => {
                    return (
                        <div className={style.card} onClick={() => handleMatch(m.matchId)}>
                            <p className={style.title}>
                                {(m.matchId == 71) ? "Qualifier 1 • " : (m.matchId == 72) ? "Eliminator • " : (m.matchId == 73) ? "Qualifier 2  • " : (m.matchId == 74) ? "Final • " : <span>Match {m.matchId} • </span>}
                                <span>{venues[m.venueId - 1].city}</span>
                            </p>
                            <div className={style.teamContainer}>
                                <div className={style.homeTeamContainer}>
                                    <img src={teams[m.homeTeamId - 1].logo} alt="" />
                                    <p>{teams[m.homeTeamId - 1].name}</p>
                                </div>
                                <div className={style.awayTeamContainer}>
                                    <img src={teams[m.awayTeamId - 1].logo} alt="" />
                                    <p>{teams[m.awayTeamId - 1].name}</p>
                                </div>
                            </div>
                            {(m.matchStatus == "Completed") ? <p className={style.discription} title={m.matchResult}>{m.matchResult}</p> : (m.tossStatus == "Completed") ? <p className={`${style.discription} ${style.toss}`} title={m.tossResult}>{m.tossResult}</p> : <p className={`${style.discription} ${style.upcoming}`}>Upcoming</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Fixture;