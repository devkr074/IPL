import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Alert } from 'react-bootstrap';

function Toss() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tossChoice, setTossChoice] = useState('');
  const [tossResult, setTossResult] = useState('');
  const [tossWonBy, setTossWonBy] = useState('');
  const [decision, setDecision] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('cricketData'));
        if (!storedData) throw new Error('No tournament data found');
        
        const currentMatch = storedData.schedule.find(m => m.id === parseInt(matchId));
        if (!currentMatch) throw new Error('Match not found');
        
        setMatch(currentMatch);
        setTeams(storedData.teams);
        setVenues(storedData.venues);
        setSelectedTeam(storedData.selectedTeam);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        navigate('/');
      }
    };

    loadData();

    // Handle back button to redirect home
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate('/');
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [matchId, navigate]);

  const getTeamName = (id) => {
    return teams.find(team => team.id === id)?.name || 'Team';
  };

  const getVenueName = (id) => {
    return venues.find(venue => venue.id === id)?.name || 'Venue';
  };

  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setTossResult(result);
    
    if (result === tossChoice) {
      setTossWonBy('user');
    } else {
      setTossWonBy('opponent');
      // Simulate opponent's decision (60% chance to bat first)
      setDecision(Math.random() < 0.6 ? 'bat' : 'bowl');
    }
  };

  const handleNext = () => {
    try {
      // Update match data in localStorage
      const storedData = JSON.parse(localStorage.getItem('cricketData'));
      const updatedSchedule = storedData.schedule.map(m => {
        if (m.id === match.id) {
          return {
            ...m,
            toss: {
              wonBy: tossWonBy === 'user' ? selectedTeam : 
                    (selectedTeam === match.team1 ? match.team2 : match.team1),
              decision: tossWonBy === 'user' ? decision : 
                      (decision === 'bat' ? 'bowl' : 'bat'),
              timestamp: new Date().toISOString()
            },
            status: 'toss-completed'
          };
        }
        return m;
      });

      // Save updated data
      localStorage.setItem('cricketData', JSON.stringify({
        ...storedData,
        schedule: updatedSchedule
      }));

      navigate(`/match/${matchId}`);
    } catch (err) {
      setError('Failed to save toss result');
      console.error(err);
    }
  };

  if (isLoading) return <div className="container text-center py-5">Loading toss data...</div>;
  if (error) return <Alert variant="danger" className="container mt-4">{error}</Alert>;
  if (!match || !selectedTeam) return null;

  const userTeamName = getTeamName(selectedTeam);
  const opponentTeamId = selectedTeam === match.team1 ? match.team2 : match.team1;
  const opponentTeamName = getTeamName(opponentTeamId);
  const venueName = getVenueName(match.venue);

  return (
    <div className="container mt-4">
      <Card className="text-center">
        <Card.Header as="h3">Toss Time!</Card.Header>
        <Card.Body>
          <Card.Title>
            {userTeamName} vs {opponentTeamName}
          </Card.Title>
          <Card.Text className="text-muted">Venue: {venueName}</Card.Text>
          
          {!tossResult ? (
            <div className="toss-choice-section">
              <h5 className="mb-4">Choose Heads or Tails:</h5>
              <div className="d-flex justify-content-center gap-3 mb-4">
                <Button 
                  variant={tossChoice === 'heads' ? 'primary' : 'outline-primary'}
                  onClick={() => setTossChoice('heads')}
                  size="lg"
                >
                  Heads
                </Button>
                <Button 
                  variant={tossChoice === 'tails' ? 'primary' : 'outline-primary'}
                  onClick={() => setTossChoice('tails')}
                  size="lg"
                >
                  Tails
                </Button>
              </div>
              
              {tossChoice && (
                <Button 
                  variant="info" 
                  onClick={flipCoin}
                  size="lg"
                >
                  Flip the Coin
                </Button>
              )}
            </div>
          ) : (
            <div className="toss-result-section">
              <div className="mb-4 p-3 bg-light rounded">
                <h4>Coin landed on: <span className="text-uppercase fw-bold">{tossResult}</span></h4>
              </div>
              
              {tossWonBy === 'user' ? (
                <div className="decision-section">
                  <h5 className="mb-3">You won the toss!</h5>
                  <p className="mb-4">Choose to bat or bowl first:</p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <Button 
                      variant={decision === 'bat' ? 'success' : 'outline-success'}
                      onClick={() => setDecision('bat')}
                      size="lg"
                    >
                      Bat First
                    </Button>
                    <Button 
                      variant={decision === 'bowl' ? 'danger' : 'outline-danger'}
                      onClick={() => setDecision('bowl')}
                      size="lg"
                    >
                      Bowl First
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="opponent-decision mb-4">
                  <h5>{opponentTeamName} won the toss!</h5>
                  <p className="lead">
                    They chose to <strong>{decision === 'bat' ? 'bat first' : 'bowl first'}</strong>
                  </p>
                </div>
              )}
              
              {decision && (
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                  size="lg"
                >
                  Start Match
                </Button>
              )}
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Match #{match.id} • {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Toss;