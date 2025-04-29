import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import handleInning from "../utils/handleInning";

function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [matchStatus, setMatchStatus] = useState();
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [squad, setSquad] = useState([]);
    const [venues, setVenues] = useState([]);
    const [tab, setTab] = useState("Commentary");
    const timeoutRef = useRef(null);
    const intervalRef = useRef(500);
    const startTimeRef = useRef(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        const loadData = () => {
            const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
            const teams = JSON.parse(localStorage.getItem("teams"));
            const fixture = JSON.parse(localStorage.getItem("fixture"));
            const squad = JSON.parse(localStorage.getItem("squad"));
            const venues = JSON.parse(localStorage.getItem("venues"));
            const matchStatus = fixture[matchId - 1].matchStatus;
            setMatchStatus(matchStatus);
            setVenues(venues);
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
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div>
                <p>{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}: {teams && teams[fixture[matchId - 1]?.homeTeamId - 1]?.shortName} vs {teams && teams[fixture[matchId - 1]?.awayTeamId - 1]?.shortName}</p>
            </div>
            <div>
                <button value="Info" onClick={handleTabChange}>Info</button>
                <button value="Commentary" onClick={handleTabChange}>Commentary</button>
                <button value="Scorecard" onClick={handleTabChange}>Scorecard</button>
                <button value="Squad" onClick={handleTabChange}>Squad</button>
            </div>
            <div>
                {tab == "Info" && <div>
                    <p>Info</p>
                    <p>Match</p>
                    <p>{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}</p>
                    <p>Series</p>
                    <p>Indian Premier League 2025</p>
                    <p>Toss</p>
                    <p>{fixture[matchId - 1].tossResult}</p>
                    <p>Venue</p>
                    <p>{venues[fixture[matchId - 1].venueId - 1].name}, {venues[fixture[matchId - 1].venueId - 1].city}</p>
                    <p>Venue Guide</p>
                    <p>Stadium</p>
                    <p>{venues[fixture[matchId - 1].venueId - 1].name}</p>
                    <p>City</p>
                    <p>{venues[fixture[matchId - 1].venueId - 1].city}</p>
                    <p>Capacity</p>
                    <p>{venues[fixture[matchId - 1].venueId - 1].capacity}</p>
                    <p>Hosts to</p>
                    <p>{teams[venues[fixture[matchId - 1].venueId - 1].venueId - 1].name}</p>
                </div>}
                {tab == "Commentary" && (matchStatus == "Completed" ?
                    <div>
                        <p>{teams[matchData.inning1.teamId - 1].shortName}</p>
                        <p>{matchData.inning1.runs}</p>
                        {matchData.inning1.wickets != 10 && <p>-{matchData.inning1.wickets}</p>}
                        <p>{Math.floor(matchData.inning1.balls / 6)}</p>
                        {(matchData.inning1.balls % 6 != 0) && <p>.{(matchData.inning1.balls % 6)}</p>}
                        <p>{teams[matchData.inning2.teamId - 1].shortName}</p>
                        <p>{matchData.inning2.runs}</p>
                        {matchData.inning2.wickets != 10 && <p>-{matchData.inning2.wickets}</p>}
                        <p>{Math.floor(matchData.inning2.balls / 6)}</p>
                        {(matchData.inning2.balls % 6 != 0) && <p>.{(matchData.inning2.balls % 6)}</p>}
                        <p>Player of the Match</p>
                        <img src={squad[fixture[matchId - 1].playerOfTheMatch - 1].profile} alt={squad[fixture[matchId - 1].playerOfTheMatch - 1].name} />
                        <p>{squad[fixture[matchId - 1].playerOfTheMatch - 1].name}</p>
                        <p>Commentary</p>
                        {matchData.commentary.slice().reverse().map((c) => (
                            <div key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}`}>
                                <p>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</p>
                                <p>{(c.outcome == "SIX") ? 6 : (c.outcome == "FOUR") ? 4 : (c.outcome == "OUT") && "W"}</p>
                                <p>{c.bowler} to {c.batsman}, {c.outcome}, {c.comment}</p>
                            </div>))}
                    </div> : <p>Not Completed</p>)}
                {tab == "Scorecard" && (matchStatus == "Completed" ?
                    <div>
                        <p>{teams[matchData.inning1.teamId - 1].shortName}</p>
                        <p>{matchData.inning1.runs}</p>
                        <p>-{matchData.inning1.wickets}</p>
                        <p>({Math.floor(matchData.inning1.balls / 6) + "." + (matchData.inning1.balls % 6)})</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>R</th>
                                    <th>B</th>
                                    <th>4s</th>
                                    <th>6s</th>
                                    <th>SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(matchData.inning1Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                    <>
                                        <tr>
                                            <td>{squad[b?.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}</td>
                                            <td>{b.runs}</td>
                                            <td>{b.balls}</td>
                                            <td>{b.fours}</td>
                                            <td>{b.sixes}</td>
                                            <td>{Math.floor(b.runs / b.balls * 100).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</td>
                                        </tr>
                                    </>)))}
                                <tr>
                                    <td>Extras</td>
                                    <td colSpan={5}>{matchData.inning1.extras} w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td colSpan={5}>{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</td>
                                </tr>
                                {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                    <>
                                        <tr>
                                            <td colSpan={6}>Did not bat</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}>
                                                {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).map((b) => (<span>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                            </td>
                                        </tr>
                                    </>}
                            </tbody>
                        </table>
                        <p>{teams[matchData.inning2.teamId - 1].shortName}</p>
                        <p>{matchData.inning2.runs}</p>
                        <p>-{matchData.inning2.wickets}</p>
                        <p>({Math.floor(matchData.inning2.balls / 6) + "." + (matchData.inning2.balls % 6)})</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Batter</th>
                                    <th>R</th>
                                    <th>B</th>
                                    <th>4s</th>
                                    <th>6s</th>
                                    <th>SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(matchData.inning2Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                    <>
                                        <tr>
                                            <td>{squad[b?.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}</td>
                                            <td>{b.runs}</td>
                                            <td>{b.balls}</td>
                                            <td>{b.fours}</td>
                                            <td>{b.sixes}</td>
                                            <td>{Math.floor(b.runs / b.balls * 100).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</td>
                                        </tr>
                                    </>)))}
                                <tr>
                                    <td>Extras</td>
                                    <td colSpan={5}>{matchData.inning2.extras} w {matchData.inning2.wides}, nb {matchData.inning2.noBalls}, lb {matchData.inning2.legByes}, b {matchData.inning2.byes}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td colSpan={5}>{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</td>
                                </tr>
                                {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                    <>
                                        <tr>
                                            <td colSpan={6}>Did not bat</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}>
                                                {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).map((b) => (<span>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                            </td>
                                        </tr>
                                    </>}
                            </tbody>
                        </table>
                    </div> : <div></div>)}
                {tab == "Squad" && <div>
                    <p>{teams[fixture[matchId - 1].homeTeamId - 1].name}</p>
                    {squad && squad.filter((p) => (p.playerId >= ((fixture[matchId - 1].homeTeamId - 1) * 11 + 1) && p.playerId <= ((fixture[matchId - 1].homeTeamId - 1) * 11 + 11))).map((p) => (
                        <div key={p.playerId}>
                            <img src={p.profile} alt={p.name} />
                            <p>{p.name}</p>
                            {(p.captain && p.wicketKeeper) ? <p>C & WK</p> : (p.captain) ? <p>C</p> : (p.wicketKeeper) && <p>WK</p>}
                            {(p.foreigner) && <p>F</p>}
                        </div>))}
                    <p>{teams[fixture[matchId - 1].awayTeamId - 1].name}</p>
                    {squad && squad.filter((p) => (p.playerId >= ((fixture[matchId - 1].awayTeamId - 1) * 11 + 1) && p.playerId <= ((fixture[matchId - 1].awayTeamId - 1) * 11 + 11))).map((p) => (
                        <div key={p.playerId}>
                            <img src={p.profile} alt={p.name} />
                            <p>{p.name}</p>
                            {(p.captain && p.wicketKeeper) ? <p>C & WK</p> : (p.captain) ? <p>C</p> : (p.wicketKeeper) && <p>WK</p>}
                            {(p.foreigner) && <p>F</p>}
                        </div>))}
                </div>}
            </div>
        </>
    );
}
export default Match;