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
            <div>
                <p>IPL - Fixture</p>
            </div>
            <div>
                {fixture && fixture.map((m) => (
                    <div key={m.matchId} onClick={() => handleMatch(m)}>
                        <p>{(m.matchId == 71) ? "Qualifier 1" : (m.matchId == 72) ? "Eliminator" : (m.matchId == 73) ? "Qualifier 2" : (m.matchId == 74) ? "Final" : `Match ${m.matchId}`}</p>
                        <p>{venues[m.venueId - 1].city}</p>
                        <img src={(m.homeTeamId) ? teams[m.homeTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.homeTeamId) ? teams[m.homeTeamId - 1].name : "TBA"} />
                        <p>{(m.homeTeamId) ? (m.matchStatus == "Completed") ? teams[m.homeTeamId - 1].shortName : teams[m.homeTeamId - 1].name : "TBA"}</p>
                        {(m.matchStatus == "Completed") && <p>{handleMatchData(m.matchId, m.homeTeamId).runs}{(handleMatchData(m.matchId, m.homeTeamId).wickets != 10) && "-" + handleMatchData(m.matchId, m.homeTeamId).wickets} ({Math.floor(handleMatchData(m.matchId, m.homeTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.homeTeamId).balls % 6)})</p>}
                        <img src={(m.awayTeamId) ? teams[m.awayTeamId - 1].logo : "https://placehold.co/400x400?text=TBA"} alt={(m.awayTeamId) ? teams[m.awayTeamId - 1].logo : "TBA"} />
                        <p>{(m.awayTeamId) ? (m.matchStatus == "Completed") ? teams[m.awayTeamId - 1].shortName : teams[m.awayTeamId - 1].name : "TBA"}</p>
                        {(m.matchStatus == "Completed") && <p>{handleMatchData(m.matchId, m.awayTeamId).runs}{(handleMatchData(m.matchId, m.awayTeamId).wickets != 10) && "-" + handleMatchData(m.matchId, m.awayTeamId).wickets} ({Math.floor(handleMatchData(m.matchId, m.awayTeamId).balls / 6) + "." + (handleMatchData(m.matchId, m.awayTeamId).balls % 6)})</p>}
                        <p>{(m.matchStatus == "Completed") ? m.matchResult : (m.tossStatus == "Completed") ? m.tossResult : "Upcoming"}</p>
                    </div>))}
            </div>
        </>
    );
}
export default Fixture;