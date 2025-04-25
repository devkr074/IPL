import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import handleInning from "../utils/handleInning";

function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [squad, setSquad] = useState([]);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(5000);
    const startTimeRef = useRef(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        const loadData = () => {
            const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
            const teams = JSON.parse(localStorage.getItem("teams"));
            const fixture = JSON.parse(localStorage.getItem("fixture"));
            const squad = JSON.parse(localStorage.getItem("squad"));
            
            setTeams(teams);
            setMatchData(matchData);
            setFixture(fixture);
            setSquad(squad);
            document.title = `Match ${matchId}`;
            
            return matchData;
        };

        const matchData = loadData();
        if (fixture[matchId - 1]?.matchStatus !== "Completed") {
            startMatchSimulation(matchData);
        }
        return () => {
            mountedRef.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [matchId]);

    const startMatchSimulation = (matchData) => {
        if (!mountedRef.current) return;

        const now = Date.now();
        let timeRemaining = intervalRef.current;
        if (matchData?.lastBallTime) {
            const elapsed = now - matchData.lastBallTime;
            timeRemaining = Math.max(0, intervalRef.current - elapsed);
        }
        const currentInning = matchData?.currentInning || 1;
        
        timeoutRef.current = setTimeout(() => {
            if (!mountedRef.current) return;

            if (currentInning === 1) {
                simulateInning(1, matchId);
            } else {
                simulateInning(2, matchId);
            }
        }, timeRemaining);
    };

    const simulateInning = (inningNumber, matchId) => {
        if (!mountedRef.current) return;

        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const inning = matchData[`inning${inningNumber}`];
        const isInningComplete = inning.balls >= 120 || inning.wickets >= 10 || 
                               (inningNumber === 2 && inning.runs > matchData.inning1.runs);

        if (!isInningComplete) {
            startTimeRef.current = Date.now();
            handleInning(inningNumber, matchId);
            const updatedMatchData = {
                ...JSON.parse(localStorage.getItem(`match-${matchId}`)),
                lastBallTime: startTimeRef.current,
                currentInning: inningNumber
            };
            localStorage.setItem(`match-${matchId}`, JSON.stringify(updatedMatchData));
            setMatchData(updatedMatchData);
            const processingTime = Date.now() - startTimeRef.current;
            const adjustedInterval = Math.max(0, intervalRef.current - processingTime);
            
            timeoutRef.current = setTimeout(() => {
                simulateInning(inningNumber, matchId);
            }, adjustedInterval);
        } else if (inningNumber === 1) {
            const updatedMatchData = {
                ...JSON.parse(localStorage.getItem(`match-${matchId}`)),
                currentInning: 2
            };
            localStorage.setItem(`match-${matchId}`, JSON.stringify(updatedMatchData));
            setMatchData(updatedMatchData);
            simulateInning(2, matchId);
        } else {
            const updatedFixture = [...fixture];
            updatedFixture[matchId - 1].matchStatus = "Completed";
            localStorage.setItem("fixture", JSON.stringify(updatedFixture));
            setFixture(updatedFixture);
        }
    };
    return (
        <div className="container">
            <div className="header">
                <p>Match {matchId}: {teams[fixture[matchId - 1]?.homeTeamId - 1]?.shortName} vs {teams[fixture[matchId - 1]?.awayTeamId - 1]?.shortName}</p>
            </div>
            <div className="content">
                <h2>{teams[matchData?.inning1?.teamId - 1]?.shortName} {matchData?.inning1?.runs}{(matchData?.inning1?.wickets != 10) && -matchData?.inning1?.wickets}</h2>
                <h2>{teams[matchData?.inning2?.teamId - 1]?.shortName} {matchData?.inning2?.runs}{(matchData?.inning2?.wickets != 10) && -matchData?.inning2?.wickets}</h2>
                <h3> <img src={squad[fixture[matchId - 1]?.playerOfTheMatch - 1]?.profile} height={60} style={{ borderRadius: "50%" }} alt="" />{squad[fixture[matchId - 1]?.playerOfTheMatch - 1]?.name}</h3>
                <p>{squad[matchData?.inning1?.strikerId-1]?.shortName}* |</p>
                <p>{squad[matchData?.inning1?.nonStrikerId-1]?.shortName} |</p>
                <div>
                    <h1>Commentary</h1>
                    {matchData?.commentary?.slice()?.reverse()?.map((c) => {
                        return (
                            <>
                                <p>{Math.floor(c.ball / 6) + "." + (c.ball % 6)} {(c.outcome == "SIX") ? <div style={{ background: "#0a858e", height: "30px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: "30px", color: "#fff", fontWeight: "bold" }}>6</div> : (c.outcome == "FOUR") ? <div style={{ background: "rgb(187, 110, 235)", height: "30px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: "30px", color: "#fff", fontWeight: "bold" }}>4</div> : (c.outcome == "OUT") ? <div style={{ background: "red", height: "30px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: "30px", color: "#fff", fontWeight: "bold" }}>W</div> : ""} {c.bowler} to {c.batsman}, <b>{c.outcome}</b>, {c.comment}</p>
                            </>
                        )
                    })}
                </div>
                <div>
                    <h2>{teams[matchData?.inning1?.teamId - 1]?.shortName} {matchData?.inning1?.runs}-{matchData?.inning1?.wickets} ({Math.floor(matchData?.inning1?.balls / 6)}{((matchData?.inning1?.balls % 6 > 0) ? "." + matchData?.inning1?.balls % 6 : "")})</h2>
                    <h1>Batsman</h1>
                    {(matchData?.inning1Batsman?.filter((b) => b.didNotBat == false)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | <b>{b.runs}</b> | {b.balls} | {b.fours} | {b.sixes} | {Math.floor(b.runs / b.balls * 100).toFixed(2)} |</p>
                                <p>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1]?.name) + ")"}</p>
                            </>
                        )
                    }))}
                    <span>Did not Bat: </span>
                    {(matchData?.inning1Batsman?.filter((b) => b.didNotBat == true)?.map((b) => {
                        return (
                            <>
                                <span>{squad[b?.playerId - 1]?.name}, </span>
                            </>
                        )
                    }))}
                    <p>Extras: {matchData?.inning1?.extras} w {matchData?.inning1?.wides} nb {matchData?.inning1?.noBalls} lb {matchData?.inning1?.legByes} b {matchData?.inning1?.byes}</p>
                    <p>Total: {matchData?.inning1?.runs}</p>
                    <h2>Bowler</h2>
                    {(matchData?.inning1Bowler?.filter((b) => b.balls > 0)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | {Math.floor(b.balls / 6) + "." + (b.balls % 6)} | {b.runs} | <b>{b.wickets}</b> | {(b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))).toFixed(2)} |</p>
                            </>
                        )
                    }))}
                </div>
                <div>
                    <h2>{teams[matchData?.inning2?.teamId - 1]?.shortName} {matchData?.inning2?.runs}-{matchData?.inning2?.wickets} ({Math.floor(matchData?.inning2?.balls / 6)}{((matchData?.inning2?.balls % 6 > 0) ? "." + matchData?.inning2?.balls % 6 : "")})</h2>
                    <h1>Batsman</h1>
                    {(matchData?.inning2Batsman?.filter((b) => b.didNotBat == false)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | <b>{b.runs}</b> | {b.balls} | {b.fours} | {b.sixes} | {Math.floor(b.runs / b.balls * 100).toFixed(2)} |</p>
                                <p>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1]?.name) + ")"}</p>
                            </>
                        )
                    }))}
                    <span>Did not Bat: </span>
                    {(matchData?.inning2Batsman?.filter((b) => b.didNotBat == true)?.map((b) => {
                        return (
                            <>
                                <span>{squad[b?.playerId - 1]?.name}, </span>
                            </>
                        )
                    }))}
                    <p>Extras: {matchData?.inning2?.extras} w {matchData?.inning2?.wides} nb {matchData?.inning2?.noBalls} lb {matchData?.inning2?.legByes} b {matchData?.inning2?.byes}</p>
                    <p>Total: {matchData?.inning2?.runs}</p>
                    <h2>Bowler</h2>
                    {(matchData?.inning2Bowler?.filter((b) => b.balls > 0)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | {Math.floor(b.balls / 6) + "." + (b.balls % 6)} | {b.runs} | <b>{b.wickets}</b> | {(b.runs / ((b.balls / 6) + ((b.balls % 6) / 6))).toFixed(2)} |</p>
                            </>
                        )
                    }))}
                </div>
            </div>
        </div>
    );
}

export default Match;