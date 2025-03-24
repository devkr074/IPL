import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Toss = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tossChoice, setTossChoice] = useState('');
  const [tossResult, setTossResult] = useState('');
  const [tossWonBy, setTossWonBy] = useState('');
  const [decision, setDecision] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedMatch = JSON.parse(localStorage.getItem('schedule')).find(m => m.id === parseInt(matchId));
    const storedTeam = JSON.parse(localStorage.getItem('selectedTeam'));
    document.title="IPL 2025 - Toss Match 1";
    if (storedMatch) setMatch(storedMatch);
    if (storedTeam) setSelectedTeam(storedTeam);
  }, [matchId]);

  const getTeamName = (id) => {
    const teams = [
      { id: 1, name: 'Mumbai Indians' },
      { id: 2, name: 'Chennai Super Kings' },
      { id: 3, name: 'Royal Challengers Bangalore' },
      { id: 4, name: 'Kolkata Knight Riders' },
      { id: 5, name: 'Delhi Capitals' },
      { id: 6, name: 'Punjab Kings' },
      { id: 7, name: 'Rajasthan Royals' },
      { id: 8, name: 'Sunrisers Hyderabad' },
      { id: 9, name: 'Lucknow Super Giants' },
      { id: 10, name: 'Gujarat Titans' }
    ];
    
    return teams.find(team => team.id === id)?.name || '';
  };

  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setTossResult(result);
    
    if (result === tossChoice) {
      setTossWonBy('user');
    } else {
      setTossWonBy('opponent');
      // Simulate opponent's decision (50-50 chance)
      setDecision(Math.random() < 0.5 ? 'bat' : 'bowl');
    }
  };

  const handleNext = () => {
    // Save toss result to match data
    const updatedSchedule = JSON.parse(localStorage.getItem('schedule')).map(m => {
      if (m.id === match.id) {
        return {
          ...m,
          toss: {
            wonBy: tossWonBy === 'user' ? selectedTeam : (selectedTeam === match.team1 ? match.team2 : match.team1),
            decision: tossWonBy === 'user' ? decision : (decision === 'bat' ? 'bowl' : 'bat')
          }
        };
      }
      return m;
    });
    
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    navigate(`/match/${matchId}`);
  };

  if (!match || !selectedTeam) return <div>Loading...</div>;

  const isUserBattingFirst = tossWonBy === 'user' ? decision === 'bat' : decision === 'bowl';

  return (
    <div className="container mt-4 text-center">
      <h3>Toss Time!</h3>
      <p>{getTeamName(selectedTeam)} vs {getTeamName(selectedTeam === match.team1 ? match.team2 : match.team1)}</p>
      <p>Venue: {match.venue}</p>
      
      {!tossResult ? (
        <div>
          <p>Choose Heads or Tails:</p>
          <Button variant="outline-primary" className="m-2" onClick={() => setTossChoice('heads')}>
            Heads
          </Button>
          <Button variant="outline-secondary" className="m-2" onClick={() => setTossChoice('tails')}>
            Tails
          </Button>
          
          {tossChoice && (
            <div className="mt-3">
              <Button variant="info" onClick={flipCoin}>
                Flip the Coin
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Coin landed on: {tossResult}</p>
          
          {tossWonBy === 'user' ? (
            <div>
              <p>You won the toss! Choose to bat or bowl:</p>
              <Button variant="success" className="m-2" onClick={() => setDecision('bat')}>
                Bat First
              </Button>
              <Button variant="danger" className="m-2" onClick={() => setDecision('bowl')}>
                Bowl First
              </Button>
            </div>
          ) : (
            <p>Opponent won the toss and chose to {decision === 'bat' ? 'bat first' : 'bowl first'}</p>
          )}
          
          {decision && (
            <div className="mt-3">
              <Button variant="primary" onClick={handleNext}>
                Start Match
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toss;