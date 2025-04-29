import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import handleInning from "../utils/handleInning.js";
function Match() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState();
    const [matchData, setMatchData] = useState();
    const [matchStatus, setMatchStatus] = useState();
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Commentary");
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const matchStatus = fixture[matchId - 1].matchStatus;
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(fixture);
        setMatchData(matchData);
        setMatchStatus(matchStatus);
        setSquad(squad);
        setTeams(teams);
        setVenues(venues);
        if (matchStatus != "Completed") {
            handleFirstInning(matchId);
        }
    }, []);
    useEffect(() => {
        document.title = `${matchData?.inning1?.runs}-${matchData?.inning1?.wickets} vs ${matchData?.inning2?.runs}-${matchData?.inning2?.runs}`;
    }, [matchData]);
    function handleFirstInning(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if ((matchData.inning1.balls < 120) && (matchData.inning1.wickets < 10)) {
            handleInning(1, matchId);
            setTimeout(() => {
                setMatchData(matchData);
                handleFirstInning(matchId);
                console.log(matchData.inning1.runs);
            }, 1000);
        }
        else {
            setTimeout(() => {
                handleSecondInning(matchId);
            }, 5000);
        }
    }
    function handleSecondInning(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        if ((matchData.inning2.balls < 120) && (matchData.inning2.wickets < 10) && (matchData.inning1.runs >= matchData.inning2.runs)) {
            handleInning(2, matchId);
            setTimeout(() => {
                setMatchData(matchData);
                handleSecondInning(matchId);
                console.log(matchData.inning2.runs);
            }, 1000);
        }
        // else if (matchData.inning1.runs == matchData.inning2.runs) {
        //     handleSuperOverFirstInning(matchId);
        //     handleSuperOverSecondInning(matchId);
        // }
    }
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
                        <p>{fixture[matchId - 1].matchResult}</p>
                        <p>Player of the Match</p>
                        <img src={squad[fixture[matchId - 1].playerOfTheMatch - 1].profile} alt={squad[fixture[matchId - 1].playerOfTheMatch - 1].name} />
                        <p>{squad[fixture[matchId - 1].playerOfTheMatch - 1].name}</p>
                        <p>Commentary</p>
                        {matchData.commentary.slice().reverse().map((c) => (
                            <div key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`}>
                                <p>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</p>
                                <p>{(c.outcome == "SIX") ? 6 : (c.outcome == "FOUR") ? 4 : (c.outcome == "OUT") && "W"}</p>
                                <p>{c.bowler} to {c.batsman}, {c.outcome}, {c.comment}</p>
                            </div>))}
                    </div> : <p>Not Completed</p>)}
                {tab == "Scorecard" &&
                    <div>
                        <p>{fixture[matchId - 1].matchResult}</p>
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
                                        <tr key={b.playerId}>
                                            <td>{squad[b?.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}</td>
                                            <th>{b.runs}</th>
                                            <td>{b.balls}</td>
                                            <td>{b.fours}</td>
                                            <td>{b.sixes}</td>
                                            <td>{Math.floor(b.runs / b.balls * 100).toFixed(2)}</td>
                                        </tr>
                                        <tr key={b.playerId - 1}>
                                            <td colSpan={6}>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</td>
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
                                                {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                            </td>
                                        </tr>
                                    </>}
                                <tr>
                                    <th>Bowler</th>
                                    <th>O</th>
                                    <th>M</th>
                                    <th>R</th>
                                    <th>W</th>
                                    <th>ER</th>
                                </tr>
                                {(matchData.inning1Bowler.filter((b) => (b.runs > 0)).map((b) => (
                                    <>
                                        <tr>
                                            <td>{squad[b.playerId - 1].name}</td>
                                            <td>{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</td>
                                            <td>0</td>
                                            <td>{b.runs}</td>
                                            <th>{b.wickets}</th>
                                            <td>{(b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</td>
                                        </tr>
                                    </>
                                )))}
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
                                        <tr key={b.playerId}>
                                            <td>{squad[b?.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}</td>
                                            <th>{b.runs}</th>
                                            <td>{b.balls}</td>
                                            <td>{b.fours}</td>
                                            <td>{b.sixes}</td>
                                            <td>{Math.floor(b.runs / b.balls * 100).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</td>
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
                                                {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                            </td>
                                        </tr>
                                    </>}
                                <tr>
                                    <th>Bowler</th>
                                    <th>O</th>
                                    <th>M</th>
                                    <th>R</th>
                                    <th>W</th>
                                    <th>ER</th>
                                </tr>
                                {(matchData.inning2Bowler.filter((b) => (b.runs > 0)).map((b) => (
                                    <>
                                        <tr>
                                            <td>{squad[b.playerId - 1].name}</td>
                                            <td>{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</td>
                                            <td>0</td>
                                            <td>{b.runs}</td>
                                            <th>{b.wickets}</th>
                                            <td>{(b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</td>
                                        </tr>
                                    </>
                                )))}
                            </tbody>
                        </table>
                    </div>}
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