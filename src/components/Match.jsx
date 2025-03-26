import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table, ProgressBar, Card, ListGroup, Badge } from 'react-bootstrap';

const Match = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [cricketData, setCricketData] = useState(null);
  const [match, setMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
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
  const [batsmanStats, setBatsmanStats] = useState({});
  const [bowlerStats, setBowlerStats] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cricketData'));
    if (storedData) {
      setCricketData(storedData);
      const currentMatch = storedData.schedule.find(m => m.id === parseInt(matchId));
      setMatch(currentMatch);
      setSelectedTeam(storedData.selectedTeam);
      
      if (currentMatch) {
        setBattingTeam(currentMatch.toss?.wonBy || currentMatch.team1);
        setBowlingTeam(currentMatch.toss?.wonBy === currentMatch.team1 ? currentMatch.team2 : currentMatch.team1);
        
        // Initialize player stats if not already set
        if (!currentMatch.playerStats) {
          const initialBatsmanStats = {};
          const initialBowlerStats = {};
          
          // Get team players
          const battingTeamPlayers = storedData.players.filter(p => 
            p.id >= (currentMatch.toss?.wonBy === currentMatch.team1 ? 
              (currentMatch.team1 - 1) * 11 + 1 : 
              (currentMatch.team2 - 1) * 11 + 1) && 
            p.id <= (currentMatch.toss?.wonBy === currentMatch.team1 ? 
              currentMatch.team1 * 11 : 
              currentMatch.team2 * 11)
          );
          
          const bowlingTeamPlayers = storedData.players.filter(p => 
            p.id >= (currentMatch.toss?.wonBy === currentMatch.team1 ? 
              (currentMatch.team2 - 1) * 11 + 1 : 
              (currentMatch.team1 - 1) * 11 + 1) && 
            p.id <= (currentMatch.toss?.wonBy === currentMatch.team1 ? 
              currentMatch.team2 * 11 : 
              currentMatch.team1 * 11)
          );
          
          // Initialize batsman stats
          battingTeamPlayers.forEach(player => {
            initialBatsmanStats[player.id] = {
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              out: false
            };
          });
          
          // Initialize bowler stats
          bowlingTeamPlayers.forEach(player => {
            initialBowlerStats[player.id] = {
              overs: 0,
              balls: 0,
              runsGiven: 0,
              wickets: 0,
              maidens: 0
            };
          });
          
          setBatsmanStats(initialBatsmanStats);
          setBowlerStats(initialBowlerStats);
        } else {
          setBatsmanStats(currentMatch.playerStats.batsmen);
          setBowlerStats(currentMatch.playerStats.bowlers);
        }
      }
    }
  }, [matchId]);

  useEffect(() => {
    if (match && innings === 2) {
      setTarget(totalRuns + 1);
    }
  }, [innings, match, totalRuns]);

  const getTeamName = (id) => {
    return cricketData?.teams.find(team => team.id === id)?.name || 'Team';
  };

  const getTeamShortName = (id) => {
    return cricketData?.teams.find(team => team.id === id)?.short || '';
  };

  const getPlayerName = (id) => {
    return cricketData?.players.find(player => player.id === id)?.name || 'Player';
  };

  const getPlayerShortName = (id) => {
    return cricketData?.players.find(player => player.id === id)?.short || '';
  };

  const getPlayerRole = (id) => {
    const roleId = cricketData?.players.find(player => player.id === id)?.role_id;
    switch(roleId) {
      case 1: return 'Batsman';
      case 2: return 'Bowler';
      case 3: return 'All-rounder';
      case 4: return 'Wicket-keeper';
      default: return 'Player';
    }
  };

  const getVenueName = (id) => {
    return cricketData?.venues.find(venue => venue.id === id)?.name || 'Venue';
  };

  const simulateBall = () => {
    if (matchCompleted) return;
    
    // Enhanced simulation logic based on player ratings
    const batsmanRating = cricketData.players.find(p => p.id === currentBatsman1)?.batting_rating || 5;
    const bowlerRating = cricketData.players.find(p => p.id === currentBowler)?.bowling_rating || 5;
    
    // Adjust outcome probabilities based on ratings
    const baseOutcomes = [
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
    
    // Adjust weights based on player ratings
    const adjustedOutcomes = baseOutcomes.map(outcome => {
      let adjustedWeight = outcome.weight;
      
      // Batsman advantage
      if (['single', 'double', 'triple', 'boundary', 'six'].includes(outcome.type)) {
        adjustedWeight += (batsmanRating - 5) * 2;
      }
      
      // Bowler advantage
      if (['dot', 'wicket'].includes(outcome.type)) {
        adjustedWeight += (bowlerRating - 5) * 2;
      }
      
      return { ...outcome, weight: Math.max(1, adjustedWeight) };
    });
    
    const totalWeight = adjustedOutcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedOutcome = adjustedOutcomes[0];
    
    for (const outcome of adjustedOutcomes) {
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
    let isBoundary = false;
    
    switch (selectedOutcome.type) {
      case 'wicket':
        isWicket = true;
        newCommentary = `OUT! ${getPlayerName(currentBatsman1)} is out!`;
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
        newCommentary = `${getPlayerName(currentBatsman1)} defends`;
        break;
      case 'single':
        newCommentary = `${getPlayerName(currentBatsman1)} takes a single`;
        break;
      case 'double':
        newCommentary = `${getPlayerName(currentBatsman1)} runs two`;
        break;
      case 'triple':
        newCommentary = `${getPlayerName(currentBatsman1)} runs three`;
        break;
      case 'boundary':
        isBoundary = true;
        newCommentary = `FOUR! ${getPlayerName(currentBatsman1)} hits a boundary`;
        break;
      case 'six':
        isBoundary = true;
        newCommentary = `SIX! ${getPlayerName(currentBatsman1)} clears the ropes`;
        break;
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
      
      // Update batsman stats
      setBatsmanStats(prev => {
        const updated = { ...prev };
        if (updated[currentBatsman1]) {
          updated[currentBatsman1] = {
            ...updated[currentBatsman1],
            runs: updated[currentBatsman1].runs + runsToAdd,
            balls: updated[currentBatsman1].balls + 1,
            fours: isBoundary && runsToAdd === 4 ? updated[currentBatsman1].fours + 1 : updated[currentBatsman1].fours,
            sixes: isBoundary && runsToAdd === 6 ? updated[currentBatsman1].sixes + 1 : updated[currentBatsman1].sixes,
            out: isWicket ? true : updated[currentBatsman1].out
          };
        }
        return updated;
      });
      
      // Update bowler stats
      setBowlerStats(prev => {
        const updated = { ...prev };
        if (updated[currentBowler]) {
          updated[currentBowler] = {
            ...updated[currentBowler],
            balls: (updated[currentBowler].balls % 6) + 1,
            overs: Math.floor((updated[currentBowler].balls + 1) / 6),
            runsGiven: updated[currentBowler].runsGiven + runsToAdd,
            wickets: isWicket ? updated[currentBowler].wickets + 1 : updated[currentBowler].wickets,
            maidens: updated[currentBowler].maidens // TODO: Update maidens based on over completion
          };
        }
        return updated;
      });
    }
    
    if (isWicket) {
      setWickets(prev => prev + 1);
      // Select new batsman
      const battingTeamPlayers = cricketData.players.filter(p => 
        p.id >= (battingTeam - 1) * 11 + 1 && 
        p.id <= battingTeam * 11 &&
        !batsmanStats[p.id]?.out &&
        p.id !== currentBatsman1 && 
        p.id !== currentBatsman2
      );
      
      if (battingTeamPlayers.length > 0) {
        setCurrentBatsman1(currentBatsman2);
        setCurrentBatsman2(battingTeamPlayers[0].id);
      }
    } else if (runsToAdd > 0) {
      setTotalRuns(prev => prev + runsToAdd);
      // Rotate strike on odd runs
      if (runsToAdd % 2 !== 0) {
        setCurrentBatsman1(currentBatsman2);
        setCurrentBatsman2(currentBatsman1);
      }
    }
    
    // Update commentary
    setCommentary(prev => [
      `${overs}.${balls} - ${newCommentary}`,
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
        
        // Set new batsmen and bowler
        const newBattingTeamPlayers = cricketData.players.filter(p => 
          p.id >= (bowlingTeam - 1) * 11 + 1 && 
          p.id <= bowlingTeam * 11
        );
        
        const newBowlingTeamPlayers = cricketData.players.filter(p => 
          p.id >= (battingTeam - 1) * 11 + 1 && 
          p.id <= battingTeam * 11
        );
        
        setCurrentBatsman1(newBattingTeamPlayers[0].id);
        setCurrentBatsman2(newBattingTeamPlayers[1].id);
        setCurrentBowler(newBowlingTeamPlayers.find(p => p.role_id === 2)?.id || newBowlingTeamPlayers[0].id);
        
        // Reset commentary
        setCommentary([]);
        
        // Reset player stats for new innings
        const newBatsmanStats = {};
        const newBowlerStats = {};
        
        newBattingTeamPlayers.forEach(player => {
          newBatsmanStats[player.id] = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            out: false
          };
        });
        
        newBowlingTeamPlayers.forEach(player => {
          newBowlerStats[player.id] = {
            overs: 0,
            balls: 0,
            runsGiven: 0,
            wickets: 0,
            maidens: 0
          };
        });
        
        setBatsmanStats(newBatsmanStats);
        setBowlerStats(newBowlerStats);
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
    const updatedSchedule = cricketData.schedule.map(m => {
      if (m.id === match.id) {
        const winner = innings === 1 ? bowlingTeam : 
                      totalRuns > target ? battingTeam : 
                      totalRuns === target ? null : bowlingTeam;
        
        // Update team stats
        const updatedTeams = cricketData.teams.map(team => {
          if (team.id === battingTeam || team.id === bowlingTeam) {
            const isBattingTeam = team.id === battingTeam;
            const isWinner = team.id === winner;
            const isTie = winner === null;
            
            return {
              ...team,
              matches: team.matches + 1,
              won: isWinner ? team.won + 1 : team.won,
              lost: !isWinner && !isTie ? team.lost + 1 : team.lost,
              tied: isTie ? team.tied + 1 : team.tied,
              point: team.point + (isWinner ? 2 : isTie ? 1 : 0),
              nrr: calculateNRR(team)
            };
          }
          return team;
        });
        
        return {
          ...m,
          status: 'completed',
          winner,
          score: `${totalRuns}/${wickets} (${overs}.${balls} overs)`,
          playerStats: {
            batsmen: batsmanStats,
            bowlers: bowlerStats
          },
          innings1: innings === 1 ? {
            runs: totalRuns,
            wickets: wickets,
            overs: `${overs}.${balls}`
          } : match.innings1,
          innings2: innings === 2 ? {
            runs: totalRuns,
            wickets: wickets,
            overs: `${overs}.${balls}`
          } : null
        };
      }
      return m;
    });
    
    // Update player stats in main players array
    const updatedPlayers = cricketData.players.map(player => {
      // Update batsmen
      if (batsmanStats[player.id]) {
        const stats = batsmanStats[player.id];
        return {
          ...player,
          matches: player.matches + 1,
          innings: player.innings + (stats.out || stats.balls > 0 ? 1 : 0),
          runs: player.runs + stats.runs,
          balls: player.balls + stats.balls,
          fours: player.fours + stats.fours,
          sixes: player.sixes + stats.sixes,
          strike_rate: stats.balls > 0 ? 
            (player.runs + stats.runs) / (player.balls + stats.balls) * 100 : 
            player.strike_rate,
          half_century: stats.runs >= 50 ? player.half_century + 1 : player.half_century,
          century: stats.runs >= 100 ? player.century + 1 : player.century,
          batting_avg: (player.innings + (stats.out ? 1 : 0)) > 0 ? 
            (player.runs + stats.runs) / (player.innings + (stats.out ? 1 : 0)) : 
            player.batting_avg
        };
      }
      
      // Update bowlers
      if (bowlerStats[player.id]) {
        const stats = bowlerStats[player.id];
        return {
          ...player,
          matches: player.matches + 1,
          overs: player.overs + stats.overs + (stats.balls / 6),
          runs_given: player.runs_given + stats.runsGiven,
          wickets: player.wickets + stats.wickets,
          maiden: player.maiden + stats.maidens,
          bowl_avg: stats.wickets > 0 ? 
            (player.runs_given + stats.runsGiven) / (player.wickets + stats.wickets) : 
            player.bowl_avg,
          bowl_strike_rate: stats.wickets > 0 ? 
            ((player.overs * 6 + player.balls) + (stats.overs * 6 + stats.balls)) / 
            (player.wickets + stats.wickets) : 
            player.bowl_strike_rate,
          eco: ((player.overs * 6 + player.balls) + (stats.overs * 6 + stats.balls)) > 0 ? 
            ((player.runs_given + stats.runsGiven) / 
            ((player.overs * 6 + player.balls) + (stats.overs * 6 + stats.balls))) * 6 : 
            player.eco,
          four_fers: stats.wickets >= 4 ? player.four_fers + 1 : player.four_fers,
          five_fers: stats.wickets >= 5 ? player.five_fers + 1 : player.five_fers
        };
      }
      
      return player;
    });
    
    // Calculate NRR for teams
    function calculateNRR(team) {
      if (team.matches === 0) return 0;
      
      // This is simplified - actual NRR calculation would consider all matches
      if (team.id === battingTeam) {
        const runsScored = totalRuns;
        const oversFaced = overs + (balls / 6);
        const runsConceded = innings === 2 ? target - 1 : 0; // Simplified
        const oversBowled = innings === 2 ? 20 : 0; // Simplified
        
        return ((runsScored / oversFaced) - (runsConceded / oversBowled));
      } else if (team.id === bowlingTeam) {
        const runsConceded = totalRuns;
        const oversBowled = overs + (balls / 6);
        const runsScored = innings === 2 ? target - 1 : 0; // Simplified
        const oversFaced = innings === 2 ? 20 : 0; // Simplified
        
        return ((runsScored / oversFaced) - (runsConceded / oversBowled));
      }
      return team.nrr;
    }
    
    // Save updated data
    const updatedData = {
      ...cricketData,
      schedule: updatedSchedule,
      teams: updatedTeams,
      players: updatedPlayers
    };
    
    localStorage.setItem('cricketData', JSON.stringify(updatedData));
    setCricketData(updatedData);
  };

  const startMatch = () => {
    // Initialize batsmen and bowler
    const battingTeamPlayers = cricketData.players.filter(p => 
      p.id >= (battingTeam - 1) * 11 + 1 && 
      p.id <= battingTeam * 11
    );
    
    const bowlingTeamPlayers = cricketData.players.filter(p => 
      p.id >= (bowlingTeam - 1) * 11 + 1 && 
      p.id <= bowlingTeam * 11
    );
    
    setCurrentBatsman1(battingTeamPlayers[0].id);
    setCurrentBatsman2(battingTeamPlayers[1].id);
    setCurrentBowler(bowlingTeamPlayers.find(p => p.role_id === 2)?.id || bowlingTeamPlayers[0].id);
  };

  const handleNextMatch = () => {
    const nextMatch = cricketData.schedule.find(m => 
      !m.status && (m.team1 === selectedTeam || m.team2 === selectedTeam)
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

  if (!cricketData || !match || !selectedTeam) return <div className="container text-center py-5">Loading match data...</div>;

  const battingTeamName = getTeamName(battingTeam);
  const bowlingTeamName = getTeamName(bowlingTeam);
  const venueName = getVenueName(match.venue);
  const isUserBatting = battingTeam === selectedTeam;
  const requiredRunRate = innings === 2 && overs > 0 ? 
    ((target - totalRuns) / (20 - overs - (balls / 6))).toFixed(2) : 
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
              {innings === 1 ? '1st Innings' : '2nd Innings'} | {overs}.{balls} overs
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="mb-0">{totalRuns}/{wickets}</h2>
                  <small className="text-muted">
                    {innings === 2 && `Target: ${target} | Need ${target - totalRuns} runs`}
                  </small>
                </div>
                <div className="text-end">
                  <div>Run Rate: {(totalRuns / (overs + balls / 6)).toFixed(2)}</div>
                  {requiredRunRate && <div>Req. RR: {requiredRunRate}</div>}
                </div>
              </div>

              <ProgressBar 
                now={(overs * 6 + balls) / 120 * 100} 
                label={`${overs}.${balls}/20`} 
                className="mb-4"
              />

              {!currentBatsman1 ? (
                <Button variant="primary" size="lg" onClick={startMatch}>
                  Start Match
                </Button>
              ) : (
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={simulateBall}
                  disabled={matchCompleted}
                >
                  {matchCompleted ? 'Match Over' : 'Simulate Ball'}
                </Button>
              )}

              {matchCompleted && (
                <div className="mt-4 text-center">
                  <h4 className="mb-3">
                    {innings === 2 ? (
                      totalRuns > target ? (
                        `${battingTeamName} won by ${10 - wickets} wickets!`
                      ) : totalRuns === target ? (
                        'Match tied!'
                      ) : (
                        `${bowlingTeamName} won by ${target - totalRuns - 1} runs!`
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
                      <tr className={currentBatsman1 ? 'table-active' : ''}>
                        <td>
                          {currentBatsman1 ? (
                            <>
                              {getPlayerShortName(currentBatsman1)} ({getPlayerRole(currentBatsman1)})
                              <br />
                              <small className="text-muted">{getPlayerName(currentBatsman1)}</small>
                            </>
                          ) : '-'}
                        </td>
                        <td>{currentBatsman1 ? batsmanStats[currentBatsman1]?.runs || 0 : '-'}</td>
                        <td>{currentBatsman1 ? batsmanStats[currentBatsman1]?.balls || 0 : '-'}</td>
                        <td>
                          {currentBatsman1 && batsmanStats[currentBatsman1]?.balls > 0 ? 
                            ((batsmanStats[currentBatsman1].runs / batsmanStats[currentBatsman1].balls) * 100).toFixed(2) : 
                            currentBatsman1 ? '0.00' : '-'}
                        </td>
                      </tr>
                      <tr className={currentBatsman2 ? 'table-active' : ''}>
                        <td>
                          {currentBatsman2 ? (
                            <>
                              {getPlayerShortName(currentBatsman2)} ({getPlayerRole(currentBatsman2)})
                              <br />
                              <small className="text-muted">{getPlayerName(currentBatsman2)}</small>
                            </>
                          ) : '-'}
                        </td>
                        <td>{currentBatsman2 ? batsmanStats[currentBatsman2]?.runs || 0 : '-'}</td>
                        <td>{currentBatsman2 ? batsmanStats[currentBatsman2]?.balls || 0 : '-'}</td>
                        <td>
                          {currentBatsman2 && batsmanStats[currentBatsman2]?.balls > 0 ? 
                            ((batsmanStats[currentBatsman2].runs / batsmanStats[currentBatsman2].balls) * 100).toFixed(2) : 
                            currentBatsman2 ? '0.00' : '-'}
                        </td>
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
                      <tr className={currentBowler ? 'table-active' : ''}>
                        <td>
                          {currentBowler ? (
                            <>
                              {getPlayerShortName(currentBowler)} ({getPlayerRole(currentBowler)})
                              <br />
                              <small className="text-muted">{getPlayerName(currentBowler)}</small>
                            </>
                          ) : '-'}
                        </td>
                        <td>{currentBowler ? `${Math.floor(bowlerStats[currentBowler]?.balls / 6)}.${bowlerStats[currentBowler]?.balls % 6}` || '0.0' : '-'}</td>
                        <td>{currentBowler ? bowlerStats[currentBowler]?.runsGiven || 0 : '-'}</td>
                        <td>{currentBowler ? bowlerStats[currentBowler]?.wickets || 0 : '-'}</td>
                        <td>
                          {currentBowler && bowlerStats[currentBowler]?.balls > 0 ? 
                            ((bowlerStats[currentBowler].runsGiven / bowlerStats[currentBowler].balls) * 6).toFixed(2) : 
                            currentBowler ? '0.00' : '-'}
                        </td>
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
                    <span>{totalRuns - Object.values(batsmanStats).reduce((sum, b) => sum + b.runs, 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Runs:</span>
                    <span>{totalRuns}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Wickets:</span>
                    <span>{wickets}</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Match;