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
        setTeams(teams);
        setVenues(venues);
    }, []);
    const navigate = useNavigate();
    function handleMatch(match) {
        if (match.matchStatus == "Completed") {
            navigate(`/match/${match.matchId}`);
        }
        else {
            return;
        }
    }
    function handleMatchData(matchId, teamId) {
        const data = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if (data.inning1.teamId == teamId) {
            return ({
                runs: data.inning1.runs,
                wickets: data.inning1.wickets,
                balls: data.inning1.balls
            });
        }
        else {
            return ({
                runs: data.inning2.runs,
                wickets: data.inning2.wickets,
                balls: data.inning2.balls
            });
        }
    }
    return (
        <>
            <div className="row sticky-top shadow">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Fixture</p>
            </div>
            <div className="row m-0">
                {fixture && fixture.map((m) => (
                    <div className="col-lg-6 col-md-6 p-2 m-0" key={m.matchId} onClick={() => handleMatch(m)}>
                        <p className="col-12 fw-semibold text-light bg-green rounded-top p-2 m-0">{(m.matchId == 71) ? "Qualifier 1" : (m.matchId == 72) ? "Eliminator" : (m.matchId == 73) ? "Qualifier 2" : (m.matchId == 74) ? "Final" : `Match ${m.matchId}`} • {venues[m.venueId - 1].city}</p>
                        <div className="row py-1 m-0 bg-body-tertiary rounded-bottom">
                            <div className="col-12 d-flex align-items-center pb-1">
                                <img style={{ height: "2rem" }} src={(m.homeTeamId) ? teams[m.homeTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.homeTeamId) ? teams[m.homeTeamId - 1].name : "TBA"} />
                                {(m.homeTeamId) ? (m.matchStatus == "Completed") ? <p className='ps-1 col-2 m-0 fw-semibold'>{teams[m.homeTeamId - 1].shortName}</p> : <p className='ps-1 col-12 m-0 fw-semibold'>{teams[m.homeTeamId - 1].name}</p> : <p className='ps-1 col-2 m-0 fw-semibold'>TBA</p>}
                                {(m.matchStatus == "Completed") && <p className='col-10 fw-semibold m-0 ps-5 d-flex align-items-center'>{handleMatchData(m.matchId, m.homeTeamId).runs}{(handleMatchData(m.matchId, m.homeTeamId).wickets != 10) && "-" + handleMatchData(m.matchId, m.homeTeamId).wickets} ({Math.floor(handleMatchData(m.matchId, m.homeTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.homeTeamId).balls % 6)})</p>}
                            </div>
                            <div className="col-12 d-flex align-items-center pt-1">
                                <img style={{ height: "2rem" }} src={(m.awayTeamId) ? teams[m.awayTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.awayTeamId) ? teams[m.awayTeamId - 1].logo : "TBA"} />
                                {(m.awayTeamId) ? (m.matchStatus == "Completed") ? <p className='ps-1 col-2 m-0 fw-semibold'>{teams[m.awayTeamId - 1].shortName}</p> : <p className='ps-1 col-12 m-0 fw-semibold'>{teams[m.awayTeamId - 1].name}</p> : <p className='ps-1 col-2 m-0 fw-semibold'>TBA</p>}
                                {(m.matchStatus == "Completed") && <p className='col-10 fw-semibold m-0 ps-5 d-flex align-items-center'>{handleMatchData(m.matchId, m.awayTeamId).runs}{(handleMatchData(m.matchId, m.awayTeamId).wickets != 10) && "-" + handleMatchData(m.matchId, m.awayTeamId).wickets} ({Math.floor(handleMatchData(m.matchId, m.awayTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.awayTeamId).balls % 6)})</p>}

                            </div>
                            <p className='col-12 text-truncate text-secondary fs-7 py-1 pt-2 fw-semibold m-0'>{(m.matchStatus == "Completed") ? <span className='text-info'>{m.matchResult}</span> : (m.tossStatus == "Completed") ? <span className='text-danger'>{m.tossResult}</span> : "Upcoming"}</p>
                        </div>
                    </div>))}
            </div>
        </>
    );
}
export default Fixture;