import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import style from './Match.module.css';
import simulateInning from '../../utils/simulateInning';

function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(() => JSON.parse(localStorage.getItem(`match-${matchId}`)) || { inning1: { balls: 0, wickets: 0, runs: 0, teamShortName: '' } });
    const [teams, setTeams] = useState(() => JSON.parse(localStorage.getItem("teams")) || []);
    const [squad, setSquad] = useState(() => JSON.parse(localStorage.getItem("squad")) || []);
    const [fixture, setFixture] = useState(() => JSON.parse(localStorage.getItem("fixture")) || []);
    const [matchName, setMatchName] = useState('');
    const [inningTeamName, setInningTeamName] = useState(matchData.inning1?.teamShortName || '');
    const [inningRuns, setInningRuns] = useState(matchData.inning1?.runs || 0);
    const [inningWickets, setInningWickets] = useState(matchData.inning1?.wickets || 0);
    const [inningBalls, setInningBalls] = useState(matchData.inning1?.balls || 0);
    const [isFirstInning, setIsFirstInning] = useState(false);
    const [striker, setStriker] = useState("");
    const timeoutId = useRef(null);

    useEffect(() => {
        const storedMatchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixtureData = JSON.parse(localStorage.getItem("fixture"));
        const teamsData = JSON.parse(localStorage.getItem("teams")) || [];
        setMatchData(storedMatchData);
        setFixture(fixtureData);
        setTeams(teamsData);
        const name = `${(matchId == 71) ? "Quaifier 1" : (matchId == 72) ? "Eliminator" : (matchId == 73) ? "Qualifier 2" : (matchId == 74) ? "Final" : "Match #" + matchId}: ${teamsData[fixtureData[matchId - 1]?.homeTeamId - 1]?.teamShortName} vs  ${teamsData[fixtureData[matchId - 1]?.awayTeamId - 1]?.teamShortName}`;
        setMatchName(name);
        document.title = name;
        const isFirstInning = (storedMatchData.inning1.balls < 120 && storedMatchData.inning1.wickets < 10);
        setIsFirstInning(isFirstInning);
        timeoutId.current = setTimeout(simulateMatch, 100);
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [matchId]);

    function simulateMatch() {
        const storedMatchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || { inning1: { balls: 0, wickets: 0, runs: 0 } };
        const isFirstInning = (storedMatchData.inning1.balls < 120 && storedMatchData.inning1.wickets < 10);
        setInningTeamName(storedMatchData.inning1.teamShortName);
        setInningRuns(storedMatchData.inning1.runs);
        setInningWickets(storedMatchData.inning1.wickets);
        setInningBalls(storedMatchData.inning1.balls);
        setStriker(squad[storedMatchData.inning1.strikerId - 1].playerName);
        if (isFirstInning) {
            simulateInning(1, matchId);
            timeoutId.current = setTimeout(simulateMatch, 100);
        }
        else {
            timeoutId.current = setTimeout(simulateMatch2, 1000);
        }
    }


    function simulateMatch2() {
        const storedMatchData = JSON.parse(localStorage.getItem(`match-${matchId}`)) || { inning1: { balls: 0, wickets: 0, runs: 0 } };
        const isFirstInning = (storedMatchData.inning2.balls < 120 && storedMatchData.inning2.wickets < 10 && storedMatchData.inning1.runs >= storedMatchData.inning2.runs);
        setInningTeamName(storedMatchData.inning2.teamShortName);
        setInningRuns(storedMatchData.inning2.runs);
        setInningWickets(storedMatchData.inning2.wickets);
        setInningBalls(storedMatchData.inning2.balls);
        setStriker(squad[storedMatchData.inning2.strikerId - 1].playerName);
        if (isFirstInning) {
            simulateInning(2, matchId);
            timeoutId.current = setTimeout(simulateMatch2, 100);
        }
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>{matchName}</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.tabsContainer}>
                        <button>Info</button>
                        <button>Commentary</button>
                        <button>Scorecard</button>
                    </div>
                    <div>
                        <p>{inningTeamName}: {inningRuns}/{inningWickets} {Math.floor(inningBalls / 6) + "." + (inningBalls % 6)}</p>
                        <p>{striker}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Match;