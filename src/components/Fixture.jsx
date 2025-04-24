import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="container">
            <div className="header">
                <p>IPL - Fixture</p>
            </div>
            <div className="content">
                {fixture && fixture.map((m) => {
                    return (
                        <div className="card" onClick={() => handleMatch(m.matchId)}>
                            <p className="title">
                                {(m.matchId == 71) ? "Qualifier 1 • " : (m.matchId == 72) ? "Eliminator • " : (m.matchId == 73) ? "Qualifier 2  • " : (m.matchId == 74) ? "Final • " : <span>Match {m.matchId} • </span>}
                                <span>{venues[m.venueId - 1].city}</span>
                            </p>
                            <div className="teamContainer">
                                <div className="homeTeamContainer">
                                    <img src={teams[m.homeTeamId - 1]?.logo} alt="" />
                                    <p className="teamName">{(m.matchStatus != "Completed") ? teams[m.homeTeamId - 1]?.name : teams[m.homeTeamId - 1]?.shortName}</p>
                                </div>
                                <div className="awayTeamContainer">
                                    <img src={teams[m.awayTeamId - 1]?.logo} alt="" />
                                    <p className="teamName">{teams[m.awayTeamId - 1]?.name}</p>
                                </div>
                            </div>
                            {(m.matchStatus == "Completed") ? <p className="desc" title={m.matchResult}>{m.matchResult}</p> : (m.tossStatus == "Completed") ? <p className={`"desc" "toss"`} title={m.tossResult}>{m.tossResult}</p> : <p className={`"desc" "upcoming"`}>Upcoming</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Fixture;