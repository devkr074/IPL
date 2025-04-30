import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import handleInning from "../utils/handleInning.js";
import handleSuperOverInning from "../utils/handleSuperOverInning.js";
import handlePointsTable from "../utils/handlePointsTable.js";
import handleStatistics from "../utils/handleStatistics.js";
function Match() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState([]);
    const [matchData, setMatchData] = useState();
    const [tossResult, setTossResult] = useState();
    const [matchStatus, setMatchStatus] = useState();
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Commentary");
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    const firstInningTimeout = useRef(null);
    const secondInningTimeout = useRef(null);
    const superOverFirstInningTimeout = useRef(null);
    const superOverSecondInningTimeout = useRef(null);
    const inningsBreakTimeout = useRef(null);
    const superOverInningsBreakTimeout = useRef(null);
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture")) || [];
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const tossResult = fixture[matchId - 1].tossResult;
        const matchStatus = fixture[matchId - 1].matchStatus;
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(fixture);
        setMatchData(matchData);
        setTossResult(tossResult);
        setMatchStatus(matchStatus);
        setSquad(squad);
        setTeams(teams);
        setVenues(venues);
        if (matchStatus == null || matchStatus == "First Inning" || matchStatus == "Innings Break") {
            handleFirstInningWithDelay(matchId, matchStatus);
        }
        else if (matchStatus == "Second Inning" || matchStatus == "Second Innings Break") {
            handleSecondInningWithDelay(matchId, matchStatus);
        }
        else if (matchStatus == "Super Over First Inning" || matchStatus == "Super Over Innings Break") {
            handleSuperOverFirstInningWithDelay(matchId, matchStatus);
        }
        else if (matchStatus == "Super Over Second Inning") {
            handleSuperOverSecondInningWithDelay(matchId, matchStatus);
        }
        return () => {
            clearTimeout(firstInningTimeout.current);
            clearTimeout(secondInningTimeout.current);
            clearTimeout(superOverFirstInningTimeout.current);
            clearTimeout(superOverSecondInningTimeout.current);
            clearTimeout(inningsBreakTimeout.current);
            clearTimeout(superOverInningsBreakTimeout.current);
        };
    }, [matchId, matchStatus]);
    function handleFirstInningWithDelay(matchId, currentStatus) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        fixture[matchId - 1].matchStatus = "First Inning";
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setMatchStatus("First Inning");
        const startTimeKey = `firstInningStartTime-${matchId}`;
        let startTime = localStorage.getItem(startTimeKey);
        if (!startTime) {
            startTime = Date.now().toString();
            localStorage.setItem(startTimeKey, startTime);
        }
        const elapsed = Date.now() - parseInt(startTime, 10);
        const timeSinceLastBall = elapsed % 5000;
        const delay = Math.max(0, 5000 - timeSinceLastBall);
        if ((matchData.inning1.balls < 120) && (matchData.inning1.wickets < 10)) {
            firstInningTimeout.current = setTimeout(() => {
                handleInning(1, matchId);
                setMatchData(JSON.parse(localStorage.getItem(`match-${matchId}`)));
                handleFirstInningWithDelay(matchId, "First Inning");
            }, delay);
        }
        else {
            localStorage.removeItem(startTimeKey);
            fixture[matchId - 1].matchStatus = "Innings Break";
            localStorage.setItem("fixture", JSON.stringify(fixture));
            setMatchStatus("Innings Break");
            setMatchData(matchData);
            const breakStartTimeKey = `inningsBreakStartTime-${matchId}`;
            let breakStartTime = localStorage.getItem(breakStartTimeKey);
            if (!breakStartTime) {
                breakStartTime = Date.now().toString();
                localStorage.setItem(breakStartTimeKey, breakStartTime);
            }
            const elapsedBreakTime = Date.now() - parseInt(breakStartTime, 10);
            const remainingBreakDelay = Math.max(0, 20000 - elapsedBreakTime);
            inningsBreakTimeout.current = setTimeout(() => {
                localStorage.removeItem(breakStartTimeKey);
                handleSecondInningWithDelay(matchId, "Innings Break");
            }, remainingBreakDelay);
        }
    }
    function handleSecondInningWithDelay(matchId, currentStatus) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        fixture[matchId - 1].matchStatus = "Second Inning";
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setMatchStatus("Second Inning");
        const startTimeKey = `secondInningStartTime-${matchId}`;
        let startTime = localStorage.getItem(startTimeKey);
        if (!startTime) {
            startTime = Date.now().toString();
            localStorage.setItem(startTimeKey, startTime);
        }
        const elapsed = Date.now() - parseInt(startTime, 10);
        const timeSinceLastBall = elapsed % 5000;
        const delay = Math.max(0, 5000 - timeSinceLastBall);
        if ((matchData.inning2.balls < 120) && (matchData.inning2.wickets < 10) && (matchData.inning1.runs >= matchData.inning2.runs)) {
            secondInningTimeout.current = setTimeout(() => {
                handleInning(2, matchId);
                setMatchData(JSON.parse(localStorage.getItem(`match-${matchId}`)));
                handleSecondInningWithDelay(matchId, "Second Inning");
            }, delay);
        }
        else if (matchData.inning1.runs == matchData.inning2.runs) {
            localStorage.removeItem(startTimeKey);
            fixture[matchId - 1].matchStatus = "Second Innings Break";
            localStorage.setItem("fixture", JSON.stringify(fixture));
            setMatchStatus("Second Innings Break");
            setMatchData(matchData);
            const breakStartTimeKey = `superOverInningsBreakStartTime-${matchId}`;
            let breakStartTime = localStorage.getItem(breakStartTimeKey);
            if (!breakStartTime) {
                breakStartTime = Date.now().toString();
                localStorage.setItem(breakStartTimeKey, breakStartTime);
            }
            const elapsedBreakTime = Date.now() - parseInt(breakStartTime, 10);
            const remainingBreakDelay = Math.max(0, 20000 - elapsedBreakTime);
            superOverInningsBreakTimeout.current = setTimeout(() => {
                localStorage.removeItem(breakStartTimeKey);
                handleSuperOverFirstInningWithDelay(matchId, "Second Innings Break");
            }, remainingBreakDelay);
        }
        else {
            localStorage.removeItem(startTimeKey);
            setMatchData(matchData);
            fixture[matchId - 1].matchStatus = "Completed";
            localStorage.setItem("fixture", JSON.stringify(fixture));
            setMatchStatus("Completed");
            handleResult(matchId);
        }
    }
    function handleSuperOverFirstInningWithDelay(matchId, currentStatus) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        fixture[matchId - 1].matchStatus = "Super Over First Inning";
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setMatchStatus("Super Over First Inning");
        if (!superOverFirstInningStartTime.current) {
            superOverFirstInningStartTime.current = Date.now();
        }
        const elapsed = Date.now() - superOverFirstInningStartTime.current;
        const remainingDelay = Math.max(0, 5000 - (elapsed % 5000));
        if ((matchData.superOverInning1.balls < 6) && (matchData.superOverInning1.wickets < 2)) {
            superOverFirstInningTimeout.current = setTimeout(() => {
                handleSuperOverInning(1, matchId);
                setMatchData(JSON.parse(localStorage.getItem(`match-${matchId}`)));
                handleSuperOverFirstInningWithDelay(matchId, "Super Over First Inning");
            }, remainingDelay > 0 && currentStatus === "Super Over First Inning" ? remainingDelay : 5000);
        }
        else {
            fixture[matchId - 1].matchStatus = "Super Over Innings Break";
            localStorage.setItem("fixture", JSON.stringify(fixture));
            setMatchStatus("Super Over Innings Break");
            setMatchData(matchData);
            superOverInningsBreakStartTime.current = Date.now();
            superOverInningsBreakTimeout.current = setTimeout(() => {
                handleSuperOverSecondInning(matchId);
            }, 5000);
        }
    }
    function handleSuperOverSecondInning(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        fixture[matchId - 1].matchStatus = "Super Over Second Inning";
        localStorage.setItem("fixture", JSON.stringify(fixture));
        setMatchStatus("Super Over Second Inning");
        if ((matchData.superOverInning2.balls < 6) && (matchData.superOverInning2.wickets < 2) && (matchData.superOverInning1.runs >= matchData.superOverInning2.runs)) {
            handleSuperOverInning(2, matchId);
            setTimeout(() => {
                setMatchData(matchData);
                handleSuperOverSecondInning(matchId);
            }, 100);
        }
        else {
            fixture[matchId - 1].matchStatus = "Completed";
            localStorage.setItem(fixture, JSON.stringify(fixture));
            setMatchStatus("Completed");
            handleResult(matchId);
        }
    }
    function handleResult(matchId) {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams=JSON.parse(localStorage.getItem("teams"));
        if (matchData.inning1.runs > matchData.inning2.runs) {
            fixture[matchId - 1].matchResult = `${teams[matchData.inning1.teamId - 1].name} won by ${matchData.inning1.runs - matchData.inning2.runs} ${(matchData.inning1.runs - matchData.inning2.runs) > 1 ? "Runs" : "Run"}`;
            localStorage.setItem("fixture", JSON.stringify(fixture));
            handlePointsTable(1, 2, matchData, matchId, false, false)
        }
        else if (matchData.inning2.runs > matchData.inning1.runs) {
            fixture[matchId - 1].matchResult = `${teams[matchData.inning2.teamId - 1].name} won by ${10 - matchData.inning2.wickets} ${(10 - matchData.inning2.wickets) > 1 ? "Wickets" : "Wicket"}`;
            localStorage.setItem("fixture", JSON.stringify(fixture));
            handlePointsTable(2, 1, matchData, matchId, false, false);
        }
        else {
            if (matchData.superOverInning1.runs > matchData.superOverInning2.runs) {
                fixture[matchId - 1].matchResult = `${teams[matchData.superOverInning1.teamId - 1].name} won Super Over`;
                localStorage.setItem("fixture", JSON.stringify(fixture));
                handlePointsTable(2, 1, matchData, matchId, true, false);
            }
            else if (matchData.superOverInning2.runs > matchData.superOverInning1.runs) {
                fixture[matchId - 1].matchResult = `${teams[matchData.superOverInning2.teamId - 1].name} won Super Over`;
                localStorage.setItem("fixture", JSON.stringify(fixture));
                handlePointsTable(1, 2, matchData, matchId, true, false);
            }
            else {
                fixture[matchId - 1].matchResult = "Match Tied";
                localStorage.setItem("fixture", JSON.stringify(fixture));
                handlePointsTable(1, 2, matchData, matchId, true, true);
            }
        }
        if (matchId - 1 == 69) {
            const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
            fixture[matchId - 1 + 1].homeTeamId = pointsTable[0].teamId;
            fixture[matchId - 1 + 1].awayTeamId = pointsTable[1].teamId;
            fixture[matchId - 1 + 2].homeTeamId = pointsTable[2].teamId;
            fixture[matchId - 1 + 2].awayTeamId = pointsTable[3].teamId;
        }
        else if (matchId - 1 == 70) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId - 1 + 2].awayTeamId = matchData.inning2.teamId;
                fixture[matchId - 1 + 3].homeTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId - 1 + 2].awayTeamId = matchData.inning1.teamId;
                fixture[matchId - 1 + 3].homeTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId - 1 == 71) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId - 1 + 1].homeTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId - 1 + 1].homeTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId - 1 == 72) {
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                fixture[matchId - 1 + 1].awayTeamId = matchData.inning1.teamId;
            }
            else {
                fixture[matchId - 1 + 1].awayTeamId = matchData.inning2.teamId;
            }
        }
        else if (matchId - 1 == 73) {
            localStorage.setItem("nextMatch", null);
            if ((matchData.inning1.runs > matchData.inning2.runs) || (matchData.superOverInning2.runs > matchData.superOverInning1.runs)) {
                localStorage.setItem("winnerTeamId", matchData.inning1.teamId);
                localStorage.setItem("runnerUpTeamId", matchData.inning2.teamId);
            }
            else {
                localStorage.setItem("winnerTeamId", matchData.inning2.teamId);
                localStorage.setItem("runnerUpTeamId", matchData.inning1.teamId);
            }
        }
        const playerOfTheMatch = handleStatistics(matchId);
        fixture[matchId - 1].playerOfTheMatch = playerOfTheMatch;
        localStorage.setItem("fixture", JSON.stringify(fixture));
    }
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row sticky-top" style={{ backgroundColor: "#009270" }}>
                <p className="col-12 text-light fs-5 fw-bolder m-0 sticky-top p-2 text-center">{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}: {teams && teams[fixture[matchId - 1]?.homeTeamId - 1]?.shortName} vs {teams && teams[fixture[matchId - 1]?.awayTeamId - 1]?.shortName}</p>
                <div className="col-12 m-0">
                    <button className={`btn border-0 text-light fw-semibold rounded-0 ${tab === "Info" ? "border-bottom border-4 " : ""}`} value="Info" onClick={handleTabChange}>Info</button>
                    <button className={`btn border-0 text-light fw-semibold rounded-0 ${tab === "Commentary" ? "border-bottom border-4" : ""}`} value="Commentary" onClick={handleTabChange}>Commentary</button>
                    <button className={`btn border-0 text-light fw-semibold rounded-0  ${tab === "Scorecard" ? "border-bottom border-4" : ""}`} value="Scorecard" onClick={handleTabChange}>Scorecard</button>
                    <button className={`btn border-0 text-light fw-semibold rounded-0 ${tab === "Squad" ? "border-bottom border-4" : ""}`} value="Squad" onClick={handleTabChange}>Squad</button>
                </div>
            </div>
            <div>
                {tab == "Info" && <div>
                    <table>
                        <tr>
                            <td>Info</td>
                        </tr>
                        <tr>
                            <td>Match</td>
                            <td>{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}</td>
                        </tr>
                    </table>
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
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr className="fs-5 fw-semibold">
                                    <td className="ps-4 col-1 text-body-secondary">{teams[matchData.inning1.teamId - 1].shortName}</td>
                                    <td className="text-body-secondary">{matchData.inning1.runs}{matchData.inning1.wickets != 10 && "-" + matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}{(matchData.inning1.balls % 6 != 0) && "." + (matchData.inning1.balls % 6)})</td>
                                </tr>
                                <tr className="fs-5 fw-semibold">
                                    <td className="ps-4 text-body-secondary">{teams[matchData.inning2.teamId - 1].shortName}</td>
                                    <td className="text-body-secondary">{matchData.inning2.runs}{matchData.inning2.wickets != 10 && "-" + matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}{(matchData.inning2.balls % 6 != 0) && "." + (matchData.inning2.balls % 6)})</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-info fs-6 fw-semibold">{fixture[matchId - 1].matchResult}</p>
                        <p className="fs-5 fw-bold">Player of the Match</p>
                        <img className="col-1 img-fluid rounded-circle p-1 mx-2 border" src={squad[fixture[matchId - 1].playerOfTheMatch - 1]?.profile} alt={squad[fixture[matchId - 1].playerOfTheMatch - 1]?.name} />
                        <p className="col-10 fs-5 fw-semibold d-flex align-items-center">{squad[fixture[matchId - 1].playerOfTheMatch - 1]?.name}</p>
                        <p className="fs-3 fw-bold mt-3">Commentary</p>
                        <table>
                            <tbody>
                                {matchData.commentary.slice().reverse().map((c) => (
                                    <div key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`}>
                                        <tr className="row fs-6 py-3 border-bottom  border-body-tertiary">
                                            <td className="col-1 text-center d-flex align-items-center flex-column"><span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>{(c.outcome == "SIX") ? <span className="bg-info fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>6</span> : (c.outcome == "FOUR") ? <span className="bg-warning fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>4</span> : (c.outcome == "OUT") && <span className="bg-danger fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>W</span>}</td>
                                            <td className="col-9">{c.bowler} to {c.batsman}, <span className="fw-bold">{c.outcome}</span>, {c.comment}</td>
                                        </tr>
                                    </div>))}
                            </tbody>
                        </table>
                    </div> : ((matchStatus == tossResult) || (matchStatus == "Innings Break")) ? <p>{matchStatus}</p> : <p>{teams[matchData.inning2.teamId - 1].name} need {matchData.inning1.runs - matchData.inning2.runs + 1} from {120 - matchData.inning2.balls}</p>)}
                {tab == "Scorecard" &&
                    ((matchStatus == "Completed") ? <div>
                        <p className="fs-6 fw-semibold text-info">{fixture[matchId - 1].matchResult}</p>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item rounded-0">
                                <h2 class="accordion-header">
                                    <button class="accordion-button rounded-0 shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <div className="d-flex justify-content-between w-100">
                                            <span className="fs-5 fw-bold">{teams[matchData.inning1.teamId - 1].shortName}</span>
                                            <span className="fs-5 fw-bold me-3">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6) + "." + (matchData.inning1.balls % 6)})</span>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <table className="table">
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
                                                    <td className="text-end" colSpan={5}>{matchData.inning1.extras} w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td className="text-end" colSpan={5}>{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</td>
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
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                        <div className="d-flex justify-content-between w-100">
                                            <span className="fs-5 fw-bold">{teams[matchData.inning2.teamId - 1].shortName}</span>
                                            <span className="fs-5 fw-bold me-3">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6) + "." + (matchData.inning2.balls % 6)})</span>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <table className="table">
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
                                                    <td className="text-end" colSpan={5}>{matchData.inning2.extras} w {matchData.inning2.wides}, nb {matchData.inning2.noBalls}, lb {matchData.inning2.legByes}, b {matchData.inning2.byes}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td className="text-end" colSpan={5}>{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</td>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : (matchStatus == "First Inning" || matchStatus == "Innings Break") ?
                        <div>
                            <p className="fs-6 fw-semibold text-danger">{fixture[matchId - 1].tossResult}</p>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <div className="d-flex justify-content-between w-100">
                                                <span className="fs-5 fw-bold">{teams[matchData.inning1.teamId - 1].shortName}</span>
                                                <span className="fs-5 fw-bold me-3">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6) + "." + (matchData.inning1.balls % 6)})</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <table className="table">
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
                                                        <td className="text-end" colSpan={5}>{matchData.inning1.extras} w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td className="text-end" colSpan={5}>{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</td>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <p className="fs-6 fw-semibold text-danger">{teams[matchData.inning2.teamId - 1].name} need {matchData.inning1.runs - matchData.inning2.runs + 1} from {120 - matchData.inning2.balls}</p>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <div className="d-flex justify-content-between w-100">
                                                <span className="fs-5 fw-bold">{teams[matchData.inning1.teamId - 1].shortName}</span>
                                                <span className="fs-5 fw-bold me-3">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6) + "." + (matchData.inning1.balls % 6)})</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <table className="table">
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
                                                        <td className="text-end" colSpan={5}>{matchData.inning1.extras} w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td className="text-end" colSpan={5}>{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</td>
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
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            <div className="d-flex justify-content-between w-100">
                                                <span className="fs-5 fw-bold">{teams[matchData.inning2.teamId - 1].shortName}</span>
                                                <span className="fs-5 fw-bold me-3">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6) + "." + (matchData.inning2.balls % 6)})</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <table className="table">
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
                                                        <td className="text-end" colSpan={5}>{matchData.inning2.extras} w {matchData.inning2.wides}, nb {matchData.inning2.noBalls}, lb {matchData.inning2.legByes}, b {matchData.inning2.byes}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td className="text-end" colSpan={5}>{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</td>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
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