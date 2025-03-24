import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table, ProgressBar, Card, ListGroup } from 'react-bootstrap';

const Match = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState({});
  const [innings, setInnings] = useState(1);
  const [currentBatsman1, setCurrentBatsman1] = useState(null);
  const [currentBatsman2, setCurrentBatsman2] = useState(null);
  const [currentBowler, setCurrentBowler] = useState(null);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [commentary, setCommentary] = useState([]);
  const [matchCompleted, setMatchCompleted] = useState(false);
  const [target, setTarget] = useState(0);
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  useEffect(() => {
    const storedSchedule = JSON.parse(localStorage.getItem('schedule'));
    const storedTeam = JSON.parse(localStorage.getItem('selectedTeam'));
    const storedPlayers = JSON.parse(localStorage.getItem('players'));
    
    if (storedSchedule) {
      const currentMatch = storedSchedule.find(m => m.id === parseInt(matchId));
      setMatch(currentMatch);
      
      if (currentMatch) {
        setBattingTeam(currentMatch.toss.wonBy);
        setBowlingTeam(currentMatch.toss.wonBy === currentMatch.team1 ? currentMatch.team2 : currentMatch.team1);
      }
    }
    
    if (storedTeam) setSelectedTeam(storedTeam);
    if (storedPlayers) {
      setPlayers(storedPlayers);
      setTeam1Players(storedPlayers[match?.team1] || []);
      setTeam2Players(storedPlayers[match?.team2] || []);
    }
  }, [matchId, match?.team1, match?.team2]);

  useEffect(() => {
    if (match && innings === 2) {
      setTarget(totalRuns + 1);
    }
  }, [innings, match, totalRuns]);

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

  const getPlayerName = (id) => {
    const allPlayers = Object.values(players).flat();
    return allPlayers.find(player => player.id === id)?.name || 'Player';
  };

  const simulateBall = () => {
    if (matchCompleted) return;
    
    // Simple simulation logic (can be enhanced)
    const outcomes = [0, 1, 2, 3, 4, 6, 'wicket', 'wide', 'no-ball'];
    const weights = [30, 25, 15, 5, 15, 5, 3, 1, 1];
    
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    let outcomeIndex = 0;
    
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        outcomeIndex = i;
        break;
      }
      random -= weights[i];
    }
    
    const outcome = outcomes[outcomeIndex];
    let runs = 0;
    let isWicket = false;
    let isExtra = false;
    let comment = '';
    
    switch (outcome) {
      case 'wicket':
        isWicket = true;
        comment = `OUT! ${getPlayerName(currentBatsman1)} is out!`;
        break;
      case 'wide':
        isExtra = true;
        runs = 1;
        comment = `Wide ball! ${runs} extra run(s)`;
        break;
      case 'no-ball':
        isExtra = true;
        runs = 1;
        comment = `No ball! ${runs} extra run(s)`;
        break;
      default:
        runs = outcome;
        comment = `${getPlayerName(currentBatsman1)} scores ${runs} run(s)`;
    }
    
    // Update match state
    if (!isExtra) {
      setBalls(prev => {
        const newBalls = prev + 1;
        if (newBalls === 6) {
          setOvers(prevOvers => prevOvers + 1);
          return 0;
        }
        return newBalls;
      });
    }
    
    if (isWicket) {
      setWickets(prev => prev + 1);
      // Select new batsman (simplified logic)
      const battingTeamPlayers = battingTeam === match.team1 ? team1Players : team2Players;
      const newBatsman = battingTeamPlayers.find(p => p.id !== currentBatsman1 && p.id !== currentBatsman2);
      if (newBatsman) {
        setCurrentBatsman1(currentBatsman2);
        setCurrentBatsman2(newBatsman.id);
      }
    } else {
      setTotalRuns(prev => prev + runs);
      // Rotate strike on odd runs
      if (runs % 2 !== 0) {
        setCurrentBatsman1(currentBatsman2);
        setCurrentBatsman2(currentBatsman1);
      }
    }
    
    // Update commentary
    setCommentary(prev => [
      `${overs}.${balls} - ${comment}`,
      ...prev.slice(0, 9)
    ]);
    
    // Check innings conditions
    if (wickets >= 10 || (overs >= 20 && balls === 0)) {
      if (innings === 1) {
        // Switch to second innings
        setInnings(2);
        setBattingTeam(bowlingTeam);
        setBowlingTeam(battingTeam);
        setOvers(0);
        setBalls(0);
        setWickets(0);
        setCurrentBatsman1(null);
        setCurrentBatsman2(null);
        setCurrentBowler(null);
        setCommentary([]);
      } else {
        // Match completed
        setMatchCompleted(true);
        updateMatchResult();
      }
    }
    
    // Check target in second innings
    if (innings === 2 && totalRuns >= target) {
      setMatchCompleted(true);
      updateMatchResult();
    }
  };

  const updateMatchResult = () => {
    // Update match result in localStorage
    const updatedSchedule = JSON.parse(localStorage.getItem('schedule')).map(m => {
      if (m.id === match.id) {
        const winner = innings === 1 ? bowlingTeam : 
                      totalRuns > target ? battingTeam : 
                      totalRuns === target ? null : bowlingTeam;
        
        return {
          ...m,
          completed: true,
          winner,
          score: `${totalRuns}/${wickets} (${overs}.${balls} overs)`
        };
      }
      return m;
    });
    
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    
    // Update player points (simplified)
    const updatedPlayers = JSON.parse(localStorage.getItem('players'));
    // Add logic to update player stats based on performance
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const startMatch = () => {
    // Initialize batsmen and bowler
    const battingTeamPlayers = battingTeam === match.team1 ? team1Players : team2Players;
    const bowlingTeamPlayers = bowlingTeam === match.team1 ? team1Players : team2Players;
    
    setCurrentBatsman1(battingTeamPlayers[0].id);
    setCurrentBatsman2(battingTeamPlayers[1].id);
    setCurrentBowler(bowlingTeamPlayers.find(p => p.role === 'Bowler')?.id || bowlingTeamPlayers[0].id);
  };

  const handleNextMatch = () => {
    // Find next match with user's team
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    const nextMatch = schedule.find(m => 
      !m.completed && (m.team1 === selectedTeam || m.team2 === selectedTeam)
    );
    
    if (nextMatch) {
      navigate(`/toss/${nextMatch.id}`);
    } else {
      // No more matches with user's team
      navigate('/schedule');
    }
  };

  const handleEndTournament = () => {
    // Clear tournament data
    localStorage.removeItem('runningStatus');
    localStorage.removeItem('selectedTeam');
    localStorage.removeItem('schedule');
    localStorage.removeItem('players');
    localStorage.removeItem('teamIds');
    navigate('/');
  };

  if (!match || !selectedTeam) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {getTeamName(battingTeam)} vs {getTeamName(bowlingTeam)}
      </h2>
      
      <div className="row">
        <div className="col-md-8">
          <Card>
            <Card.Header>
              Innings {innings} - {getTeamName(battingTeam)} batting
              {innings === 2 && <span> | Target: {target}</span>}
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h5>{totalRuns}/{wickets}</h5>
                  <p>{overs}.{balls} overs</p>
                </div>
                <div>
                  <p>Current Partnership: {currentBatsman1 && currentBatsman2 ? 'X runs' : '-'}</p>
                  <p>Run Rate: {overs > 0 ? (totalRuns / overs).toFixed(2) : 0}</p>
                </div>
              </div>
              
              <ProgressBar 
                now={(overs * 6 + balls) / 120 * 100} 
                label={`${overs}.${balls}/20`} 
                className="mb-3"
              />
              
              {!currentBatsman1 ? (
                <Button variant="primary" onClick={startMatch}>
                  Start Match
                </Button>
              ) : (
                <Button variant="success" onClick={simulateBall} disabled={matchCompleted}>
                  Bowl Next Ball
                </Button>
              )}
              
              {matchCompleted && (
                <div className="mt-3">
                  <h4>
                    {match.winner === selectedTeam ? 'You won!' : 
                     match.winner ? 'You lost!' : 'Match tied!'}
                  </h4>
                  <Button variant="primary" className="me-2" onClick={handleNextMatch}>
                    Next Match
                  </Button>
                  <Button variant="secondary" onClick={handleEndTournament}>
                    End Tournament
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="mt-3">
            <Card.Header>Commentary</Card.Header>
            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {commentary.length > 0 ? (
                  commentary.map((item, index) => (
                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No commentary yet</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        
        <div className="col-md-4">
          <Card>
            <Card.Header>Batting</Card.Header>
            <Card.Body>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Batsman</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={currentBatsman1 ? 'table-active' : ''}>
                    <td>{currentBatsman1 ? getPlayerName(currentBatsman1) : '-'}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr className={currentBatsman2 ? 'table-active' : ''}>
                    <td>{currentBatsman2 ? getPlayerName(currentBatsman2) : '-'}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          <Card className="mt-3">
            <Card.Header>Bowling</Card.Header>
            <Card.Body>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Bowler</th>
                    <th>Overs</th>
                    <th>Runs</th>
                    <th>Wkts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={currentBowler ? 'table-active' : ''}>
                    <td>{currentBowler ? getPlayerName(currentBowler) : '-'}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Match;