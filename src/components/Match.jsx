import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, ProgressBar, Table, ListGroup, Alert, Badge } from 'react-bootstrap';

function Match() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState({});
  const [venues, setVenues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [matchStatus, setMatchStatus] = useState({
    innings: 1,
    battingTeam: null,
    bowlingTeam: null,
    batsman1: null,
    batsman2: null,
    bowler: null,
    overs: 0,
    balls: 0,
    runs: 0,
    wickets: 0,
    extras: 0,
    target: 0,
    isCompleted: false,
    commentary: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load match data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('cricketData'));
        if (!storedData) throw new Error('No tournament data found');
        
        const currentMatch = storedData.schedule.find(m => m.id === parseInt(matchId));
        if (!currentMatch) throw new Error('Match not found');

        setMatchData(currentMatch);
        setTeams(storedData.teams);
        setPlayers(storedData.players);
        setVenues(storedData.venues);
        setSelectedTeam(storedData.selectedTeam);

        // Initialize match status
        if (!currentMatch.status || currentMatch.status === 'scheduled') {
          setMatchStatus({
            innings: 1,
            battingTeam: currentMatch.toss.wonBy,
            bowlingTeam: currentMatch.toss.wonBy === currentMatch.team1 ? currentMatch.team2 : currentMatch.team1,
            batsman1: storedData.players[currentMatch.toss.wonBy][0].id,
            batsman2: storedData.players[currentMatch.toss.wonBy][1].id,
            bowler: storedData.players[currentMatch.toss.wonBy === currentMatch.team1 ? currentMatch.team2 : currentMatch.team1]
              .find(p => p.role === 'Bowler')?.id || storedData.players[currentMatch.toss.wonBy === currentMatch.team1 ? currentMatch.team2 : currentMatch.team1][0].id,
            overs: 0,
            balls: 0,
            runs: 0,
            wickets: 0,
            extras: 0,
            target: 0,
            isCompleted: false,
            commentary: []
          });
        } else if (currentMatch.status === 'in-progress') {
          setMatchStatus(currentMatch.matchStatus);
        }

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

  // Helper functions
  const getTeamName = (id) => teams.find(team => team.id === id)?.name || 'Team';
  const getPlayerName = (id) => Object.values(players).flat().find(player => player.id === id)?.name || 'Player';
  const getPlayerRole = (id) => Object.values(players).flat().find(player => player.id === id)?.role || 'Player';
  const getVenueName = (id) => venues.find(venue => venue.id === id)?.name || 'Venue';

  // Simulate a ball being bowled
  const simulateBall = () => {
    if (matchStatus.isCompleted) return;

    const outcomes = [
      { type: 'dot', runs: 0, weight: 20 },
      { type: 'single', runs: 1, weight: 25 },
      { type: 'double', runs: 2, weight: 15 },
      { type: 'triple', runs: 3, weight: 5 },
      { type: 'boundary', runs: 4, weight: 15 },
      { type: 'six', runs: 6, weight: 5 },
      { type: 'wicket', runs: 0, weight: 8 },
      { type: 'wide', runs: 1, weight: 4 },
      { type: 'no-ball', runs: 1, weight: 3 }
    ];

    const totalWeight = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedOutcome = outcomes[0];

    for (const outcome of outcomes) {
      if (random < outcome.weight) {
        selectedOutcome = outcome;
        break;
      }
      random -= outcome.weight;
    }

    let newCommentary = '';
    let isWicket = false;
    let isExtra = false;
    let runsToAdd = selectedOutcome.runs;

    switch (selectedOutcome.type) {
      case 'wicket':
        isWicket = true;
        newCommentary = `OUT! ${getPlayerName(matchStatus.batsman1)} is out!`;
        break;
      case 'wide':
        isExtra = true;
        newCommentary = `Wide ball! ${runsToAdd} extra run(s)`;
        break;
      case 'no-ball':
        isExtra = true;
        newCommentary = `No ball! ${runsToAdd} extra run(s)`;
        break;
      case 'dot':
        newCommentary = `${getPlayerName(matchStatus.batsman1)} defends`;
        break;
      case 'single':
        newCommentary = `${getPlayerName(matchStatus.batsman1)} takes a single`;
        break;
      case 'double':
        newCommentary = `${getPlayerName(matchStatus.batsman1)} runs two`;
        break;
      case 'triple':
        newCommentary = `${getPlayerName(matchStatus.batsman1)} runs three`;
        break;
      case 'boundary':
        newCommentary = `FOUR! ${getPlayerName(matchStatus.batsman1)} hits a boundary`;
        break;
      case 'six':
        newCommentary = `SIX! ${getPlayerName(matchStatus.batsman1)} clears the ropes`;
        break;
    }

    // Update match status
    setMatchStatus(prev => {
      const newBalls = isExtra ? prev.balls : prev.balls + 1;
      const newOvers = newBalls >= 6 ? prev.overs + 1 : prev.overs;
      const finalBalls = newBalls >= 6 ? 0 : newBalls;

      // Rotate strike on odd runs (except for extras)
      const shouldRotate = !isExtra && runsToAdd % 2 !== 0;
      const newBatsman1 = shouldRotate ? prev.batsman2 : prev.batsman1;
      const newBatsman2 = shouldRotate ? prev.batsman1 : prev.batsman2;

      // Handle wickets
      let nextBatsman1 = newBatsman1;
      let nextBatsman2 = newBatsman2;
      let newWickets = prev.wickets;

      if (isWicket) {
        newWickets = prev.wickets + 1;
        const battingTeamPlayers = players[prev.battingTeam];
        const newBatsman = battingTeamPlayers.find(p => 
          p.id !== prev.batsman1 && 
          p.id !== prev.batsman2 &&
          !battingTeamPlayers.slice(0, battingTeamPlayers.indexOf(p)).some(pl => pl.id === p.id)
        );

        if (newBatsman) {
          nextBatsman1 = newBatsman2;
          nextBatsman2 = newBatsman.id;
        }
      }

      // Check innings conditions
      const isInningsOver = newWickets >= 10 || (newOvers >= 20 && finalBalls === 0);
      const isTargetReached = prev.innings === 2 && (prev.runs + runsToAdd) >= prev.target;

      const updatedStatus = {
        ...prev,
        overs: newOvers,
        balls: finalBalls,
        runs: prev.runs + runsToAdd,
        wickets: newWickets,
        extras: isExtra ? prev.extras + runsToAdd : prev.extras,
        batsman1: nextBatsman1,
        batsman2: nextBatsman2,
        commentary: [`${prev.overs}.${prev.balls} - ${newCommentary}`, ...prev.commentary.slice(0, 9)],
        isCompleted: isInningsOver || isTargetReached
      };

      if (isInningsOver && prev.innings === 1) {
        // Switch to second innings
        return {
          ...updatedStatus,
          innings: 2,
          battingTeam: prev.bowlingTeam,
          bowlingTeam: prev.battingTeam,
          batsman1: players[prev.bowlingTeam][0].id,
          batsman2: players[prev.bowlingTeam][1].id,
          bowler: players[prev.battingTeam].find(p => p.role === 'Bowler')?.id || players[prev.battingTeam][0].id,
          overs: 0,
          balls: 0,
          runs: 0,
          wickets: 0,
          extras: 0,
          target: prev.runs + runsToAdd + 1,
          commentary: [],
          isCompleted: false
        };
      }

      return updatedStatus;
    });
  };

  // Save match progress to localStorage
  useEffect(() => {
    if (matchData && matchStatus.batsman1) {
      const storedData = JSON.parse(localStorage.getItem('cricketData'));
      const updatedSchedule = storedData.schedule.map(m => {
        if (m.id === matchData.id) {
          return {
            ...m,
            status: matchStatus.isCompleted ? 'completed' : 'in-progress',
            matchStatus: matchStatus.isCompleted ? null : matchStatus
          };
        }
        return m;
      });

      localStorage.setItem('cricketData', JSON.stringify({
        ...storedData,
        schedule: updatedSchedule
      }));
    }
  }, [matchStatus, matchData]);

  // Handle match completion
  useEffect(() => {
    if (matchStatus.isCompleted && matchData) {
      const updateMatchResult = () => {
        try {
          const storedData = JSON.parse(localStorage.getItem('cricketData'));
          const updatedSchedule = storedData.schedule.map(m => {
            if (m.id === matchData.id) {
              const winner = matchStatus.innings === 1 ? matchStatus.bowlingTeam : 
                           matchStatus.runs > matchStatus.target ? matchStatus.battingTeam : 
                           matchStatus.runs === matchStatus.target ? null : matchStatus.bowlingTeam;

              // Update team stats
              const updatedTeams = storedData.teams.map(team => {
                if (team.id === matchStatus.battingTeam || team.id === matchStatus.bowlingTeam) {
                  const isBattingTeam = team.id === matchStatus.battingTeam;
                  const isWinner = team.id === winner;
                  const isTie = winner === null;

                  return {
                    ...team,
                    matches: (team.matches || 0) + 1,
                    won: (team.won || 0) + (isWinner ? 1 : 0),
                    lost: (team.lost || 0) + (!isWinner && !isTie ? 1 : 0),
                    tied: (team.tied || 0) + (isTie ? 1 : 0),
                    point: (team.point || 0) + (isWinner ? 2 : isTie ? 1 : 0),
                    nrr: (team.nrr || 0) + (isBattingTeam ? 
                      (matchStatus.runs / 20) - (matchStatus.target / 20) : 
                      (matchStatus.target / 20) - (matchStatus.runs / 20))
                  };
                }
                return team;
              });

              // Update player stats (simplified)
              const updatedPlayers = { ...storedData.players };

              return {
                ...m,
                status: 'completed',
                winner,
                score: `${matchStatus.runs}/${matchStatus.wickets} (${matchStatus.overs}.${matchStatus.balls} overs)`,
                matchStatus: null
              };
            }
            return m;
          });

          localStorage.setItem('cricketData', JSON.stringify({
            ...storedData,
            schedule: updatedSchedule,
            teams: updatedTeams
          }));
        } catch (err) {
          console.error('Failed to update match result:', err);
        }
      };

      updateMatchResult();
    }
  }, [matchStatus.isCompleted, matchData]);

  const handleNextMatch = () => {
    const storedData = JSON.parse(localStorage.getItem('cricketData'));
    const nextMatch = storedData.schedule.find(m => 
      !m.completed && (m.team1 === selectedTeam || m.team2 === selectedTeam)
    );
    
    if (nextMatch) {
      navigate(`/toss/${nextMatch.id}`);
    } else {
      navigate('/schedule');
    }
  };

  const handleEndTournament = () => {
    localStorage.removeItem('cricketData');
    navigate('/');
  };

  if (isLoading) return <div className="container text-center py-5">Loading match data...</div>;
  if (error) return <Alert variant="danger" className="container mt-4">{error}</Alert>;
  if (!matchData || !selectedTeam) return null;

  const battingTeamName = getTeamName(matchStatus.battingTeam);
  const bowlingTeamName = getTeamName(matchStatus.bowlingTeam);
  const venueName = getVenueName(matchData.venue);
  const isUserBatting = matchStatus.battingTeam === selectedTeam;
  const requiredRunRate = matchStatus.innings === 2 && matchStatus.overs > 0 ? 
    ((matchStatus.target - matchStatus.runs) / (20 - matchStatus.overs - (matchStatus.balls / 6))).toFixed(2) : 
    null;

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">
              {battingTeamName} vs {bowlingTeamName}
              <Badge bg={isUserBatting ? 'primary' : 'secondary'} className="ms-2">
                {isUserBatting ? 'Your Team Batting' : 'Your Team Bowling'}
              </Badge>
            </h4>
            <small className="text-muted">Venue: {venueName}</small>
          </div>
          <div>
            <Badge bg="dark">
              {matchStatus.innings === 1 ? '1st Innings' : '2nd Innings'} | {matchStatus.overs}.{matchStatus.balls} overs
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="mb-0">{matchStatus.runs}/{matchStatus.wickets}</h2>
                  <small className="text-muted">
                    {matchStatus.innings === 2 && `Target: ${matchStatus.target} | Need ${matchStatus.target - matchStatus.runs} runs`}
                  </small>
                </div>
                <div className="text-end">
                  <div>Run Rate: {(matchStatus.runs / (matchStatus.overs + matchStatus.balls / 6)).toFixed(2)}</div>
                  {requiredRunRate && <div>Req. RR: {requiredRunRate}</div>}
                </div>
              </div>

              <ProgressBar 
                now={(matchStatus.overs * 6 + matchStatus.balls) / 120 * 100} 
                label={`${matchStatus.overs}.${matchStatus.balls}/20`} 
                className="mb-4"
              />

              {!matchStatus.batsman1 ? (
                <Button variant="primary" size="lg" onClick={() => setMatchStatus(prev => ({
                  ...prev,
                  batsman1: players[matchStatus.battingTeam][0].id,
                  batsman2: players[matchStatus.battingTeam][1].id,
                  bowler: players[matchStatus.bowlingTeam].find(p => p.role === 'Bowler')?.id || players[matchStatus.bowlingTeam][0].id
                }))}>
                  Start Match
                </Button>
              ) : (
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={simulateBall}
                  disabled={matchStatus.isCompleted}
                >
                  {matchStatus.isCompleted ? 'Match Over' : 'Simulate Ball'}
                </Button>
              )}

              {matchStatus.isCompleted && (
                <div className="mt-4 text-center">
                  <h4 className="mb-3">
                    {matchStatus.innings === 2 ? (
                      matchStatus.runs > matchStatus.target ? (
                        `${battingTeamName} won by ${10 - matchStatus.wickets} wickets!`
                      ) : matchStatus.runs === matchStatus.target ? (
                        'Match tied!'
                      ) : (
                        `${bowlingTeamName} won by ${matchStatus.target - matchStatus.runs - 1} runs!`
                      )
                    ) : (
                      'First innings completed'
                    )}
                  </h4>
                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="primary" onClick={handleNextMatch}>
                      Next Match
                    </Button>
                    <Button variant="outline-secondary" onClick={handleEndTournament}>
                      End Tournament
                    </Button>
                  </div>
                </div>
              )}

              <Card className="mt-4">
                <Card.Header>Commentary</Card.Header>
                <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <ListGroup variant="flush">
                    {matchStatus.commentary.length > 0 ? (
                      matchStatus.commentary.map((item, index) => (
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
              <Card className="mb-3">
                <Card.Header className="py-2">Current Batsmen</Card.Header>
                <Card.Body className="p-0">
                  <Table striped bordered hover size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>Batsman</th>
                        <th>R</th>
                        <th>B</th>
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={matchStatus.batsman1 ? 'table-active' : ''}>
                        <td>
                          {matchStatus.batsman1 ? getPlayerName(matchStatus.batsman1) : '-'}
                          <br />
                          <small className="text-muted">{matchStatus.batsman1 ? getPlayerRole(matchStatus.batsman1) : ''}</small>
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr className={matchStatus.batsman2 ? 'table-active' : ''}>
                        <td>
                          {matchStatus.batsman2 ? getPlayerName(matchStatus.batsman2) : '-'}
                          <br />
                          <small className="text-muted">{matchStatus.batsman2 ? getPlayerRole(matchStatus.batsman2) : ''}</small>
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Header className="py-2">Current Bowler</Card.Header>
                <Card.Body className="p-0">
                  <Table striped bordered hover size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>Bowler</th>
                        <th>O</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={matchStatus.bowler ? 'table-active' : ''}>
                        <td>
                          {matchStatus.bowler ? getPlayerName(matchStatus.bowler) : '-'}
                          <br />
                          <small className="text-muted">{matchStatus.bowler ? getPlayerRole(matchStatus.bowler) : ''}</small>
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="py-2">Match Summary</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Extras:</span>
                    <span>{matchStatus.extras}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Runs:</span>
                    <span>{matchStatus.runs}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Wickets:</span>
                    <span>{matchStatus.wickets}</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Match;