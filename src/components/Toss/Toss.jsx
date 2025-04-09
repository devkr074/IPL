import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Toss() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [call, setCall] = useState(null);
  const [result, setResult] = useState(null);
  const [tossDone, setTossDone] = useState(false);

  useEffect(() => {
    try {
      const schedule = JSON.parse(localStorage.getItem("schedule"));
      const teamsData = JSON.parse(localStorage.getItem("team"));
      const currentMatch = schedule[Number(matchId) - 1];
      setMatch(currentMatch);
      setTeams(teamsData);
    } catch (err) {
      console.log(err.message);
    }
  }, [matchId]);

  function selectCall() {
    const callValue = Math.round(Math.random());
    setCall(callValue);
    return callValue;
  }

  function performToss() {
    const tossResult = Math.round(Math.random());
    setResult(tossResult);
    setTossDone(true);
    return tossResult;
  }

  function handleToss() {
    selectCall();
    performToss();
  }

  if (!match) {
    return <div>No match or team data available</div>;
  }

  return (
    <div>
      <p>{teams[match.teamAId - 1]?.teamName} vs {teams[match.teamBId - 1]?.teamName}</p>
      <h2>It's Toss Time</h2>
      <p>{teams[match.teamAId - 1]?.teamName} will flip the coin</p>
      <p>{teams[match.teamBId - 1]?.teamName} have chosen {call === 0 ? "Heads" : "Tails"}</p>
      
      {!tossDone ? (
        <button onClick={handleToss}>Flip Coin</button>
      ) : (
        <>
          <p>And it's {result === 0 ? "Heads" : "Tails"}</p>
          <p>{result === call ? 
            `${teams[match.teamBId - 1]?.teamName} won the toss!` : 
            `${teams[match.teamAId - 1]?.teamName} won the toss!`}
          </p>
        </>
      )}
    </div>
  );
}

export default Toss;