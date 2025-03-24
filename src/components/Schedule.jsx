import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Tabs, Tab } from 'react-bootstrap';

function Schedule() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [schedule, setSchedule] = useState([]);
  const [venues, setVenues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate('/');
    };
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  useEffect(() => {
    document.title = "IPL 2025 - Schedule";
    const storedData = JSON.parse(localStorage.getItem('cricketData'));
    if (storedData) {
      setSchedule(storedData.schedule || []);
      setVenues(storedData.venue || []);
      setTeams(storedData.teams || []);
      setSelectedTeam(storedData.selectedTeam || null);
    }
  }, []);

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.short : 'TBD';
  };

  const getVenueName = (venueId) => {
    const venue = venues.find(v => v.id === venueId);
    return venue ? venue.name : 'Unknown Venue';
  };

  const handleMatchAction = (match) => {
    if (selectedTeam && (match.team1 === selectedTeam || match.team2 === selectedTeam)) {
      navigate(`/toss/${match.id}`);
    } else {
      navigate(`/match/${match.id}`);
    }
  };

  const isUserMatch = (match) => {
    return selectedTeam && (match.team1 === selectedTeam || match.team2 === selectedTeam);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tournament Schedule</h2>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3"
      >
        <Tab eventKey="all" title="All Matches">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Match No.</th>
                <th>Teams</th>
                <th>Venue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((match, index) => (
                <tr
                  key={match.id}
                  className={isUserMatch(match) ? 'table-info' : ''}
                  onClick={() => handleMatchAction(match)}
                >
                  <td>{index + 1}</td>
                  <td>
                    {getTeamName(match.team1)} vs {getTeamName(match.team2)}
                  </td>
                  <td>{getVenueName(match.venue)}</td>
                  <td>{match.status ? 'Completed' : 'Upcoming'}</td>
                  {/* <td>
                    {isUserMatch(match) ? (
                      <Button 
                        variant={match.status ? 'secondary' : 'primary'} 
                        size="sm" 
                        onClick={() => handleMatchAction(match)}
                        disabled={match.status}
                      >
                        {match.status ? 'Completed' : 'Start Match'}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => handleMatchAction(match)}
                      >
                        View Details
                      </Button>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="playoffs" title="Playoff Matches">
          <p className="text-center py-4">Playoff matches will appear here after league stage completes</p>
        </Tab>
        <Tab eventKey="pointstable" title="Points Table">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Tied</th>
                <th>NR</th>
                <th>Points</th>
                <th>NRR</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team.id}
                >
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.matches}</td>
                  <td>{team.won}</td>
                  <td>{team.lost}</td>
                  <td>{team.tied}</td>
                  <td>{team.nr}</td>
                  <td>{team.point}</td>
                  <td>{team.nrr}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Schedule;