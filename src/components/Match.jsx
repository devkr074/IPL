import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import handleInning from "../utils/handleInning.js";
import handleSuperOverInning from "../utils/handleSuperOverInning.js";
import handlePointsTable from "../utils/handlePointsTable.js";
import handleStatistics from "../utils/handleStatistics.js";
function Match() {
    const navigate = useNavigate();
    const { matchId } = useParams();
    const [fixture, setFixture] = useState([]);
    const [matchData, setMatchData] = useState();
    const [tossResult, setTossResult] = useState();
    const [matchStatus, setMatchStatus] = useState();
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState("Commentary");
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    const [status, setStatus] = useState();
    const firstInningTimeout = useRef(null);
    const secondInningTimeout = useRef(null);
    const superOverFirstInningTimeout = useRef(null);
    const superOverSecondInningTimeout = useRef(null);
    const inningsBreakTimeout = useRef(null);
    const superOverInningsBreakTimeout = useRef(null);
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture")) || [];
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(fixture);
        setStatus(localStorage.getItem("status"));
        if (matchId >= 1 && matchId <= 74 && fixture[matchId - 1].tossStatus == "Completed") {
            const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
            const tossResult = fixture[matchId - 1].tossResult;
            const matchStatus = fixture[matchId - 1].matchStatus;
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
        }
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
        const teams = JSON.parse(localStorage.getItem("teams"));
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
            {(matchId >= 1 && matchId <= 74) ?
                <>
                    {(!status) ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a team.</div> :
                        (fixture && fixture[matchId - 1].tossStatus != "Completed") ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Toss not Completed</div> : <>
                            <div className="row bg-green border-bottom border-2 sticky-top">
                                <p className="col-12 fs-5 fw-bold text-light text-center p-2 m-0">{(matchId == 71) ? "Qualifier 1" : (matchId == 72) ? "Eliminator" : (matchId == 73) ? "Qualifier 2" : (matchId == 74) ? "Final" : `Match #${matchId}`}: {(teams) && teams[fixture[matchId - 1].homeTeamId - 1].shortName} vs {(teams) && teams[fixture[matchId - 1].awayTeamId - 1].shortName}</p>
                                <div className="col-12 d-flex overflow-auto sw-none">
                                    <button value="Info" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Info") && "border-bottom border-4"}`} onClick={handleTabChange}>Info</button>
                                    <button value="Commentary" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Commentary") && "border-bottom border-4"}`} onClick={handleTabChange}>Commentary</button>
                                    <button value="Scorecard" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Scorecard") && "border-bottom border-4"}`} onClick={handleTabChange}>Scorecard</button>
                                    <button value="Squad" className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == "Squad") && "border-bottom border-4"}`} onClick={handleTabChange}>Squad</button>
                                </div>
                            </div>
                            <div className="row">
                                {(tab == "Info") &&
                                    <div className="row p-0 m-0">
                                        <p className="col-12 fs-8 fw-semibold bg-gray py-1 m-0">Info</p>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Match</p>
                                            <p className="col-9 fs-8 py-1 m-0">Match #2</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Series</p>
                                            <p className="col-9 fs-8 py-1 m-0">Indian Premier League - 2025</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Toss</p>
                                            <p className="col-9 fs-8 py-1 m-0">{fixture[matchId - 1].tossResult}</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Venue</p>
                                            <p className="col-9 fs-8 py-1 m-0">{venues[fixture[matchId - 1].venueId - 1].name}, {venues[fixture[matchId - 1].venueId - 1].city}</p>
                                        </div>
                                        <p className="col-12 fs-8 fw-semibold bg-gray py-1 m-0">Venue Guide</p>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Stadium</p>
                                            <p className="col-9 fs-8 py-1 m-0">{venues[fixture[matchId - 1].venueId - 1].name}</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">City</p>
                                            <p className="col-9 fs-8 py-1 m-0">{venues[fixture[matchId - 1].venueId - 1].city}</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Capacity</p>
                                            <p className="col-9 fs-8 py-1 m-0">{venues[fixture[matchId - 1].venueId - 1].capacity}</p>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <p className="col-3 fs-8 py-1 m-0">Hosts to</p>
                                            <p className="col-9 fs-8 py-1 m-0">{teams[venues[fixture[matchId - 1].venueId - 1].venueId - 1].name}</p>
                                        </div>
                                    </div>}
                                {(tab == "Commentary") && ((matchStatus == "Completed") ?
                                    <div className="row p-0 m-0">
                                        <div className={`col-12 d-flex fs-5 fw-semibold ${(matchData.inning1.runs < matchData.inning2.runs) && "text-secondary"}`}>
                                            <p className="col-2 m-0">{teams[matchData.inning1.teamId - 1].shortName}</p>
                                            <p className="col-10 m-0">{matchData.inning1.runs}{matchData.inning1.wickets != 10 && "-" + matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}{(matchData.inning1.balls % 6 != 0) && "." + (matchData.inning1.balls % 6)})</p>
                                        </div>
                                        <div className={`col-12 d-flex fs-5 fw-semibold ${(matchData.inning2.runs < matchData.inning1.runs) && "text-secondary"}`}>
                                            <p className="col-2 m-0">{teams[matchData.inning2.teamId - 1].shortName}</p>
                                            <p className="col-10 m-0">{matchData.inning2.runs}{matchData.inning2.wickets != 10 && "-" + matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}{(matchData.inning2.balls % 6 != 0) && "." + (matchData.inning2.balls % 6)})</p>
                                        </div>
                                        <p className="col-12 fs-8 fw-semibold text-info text-truncate m-0 py-1">{fixture[matchId - 1].matchResult}</p>
                                        <p className="col-12 fw-semibold bg-gray py-1 m-0">Player of the Match</p>
                                        <p className="col-12 py-1 m-0">{squad[fixture[matchId - 1].playerOfTheMatch - 1]?.name}</p>
                                        <p className="col-12 fw-semibold bg-gray py-1 m-0">Commentary</p>
                                        {matchData.commentary.slice().reverse().map((c) => (
                                            <div className="col-12 d-flex border-bottom px-0 pe-2" key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`}>
                                                <p className="col-2 d-flex text-center flex-column align-items-center fw-semibold py-2 m-0">
                                                    <span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>
                                                    {(c.outcome == "SIX") ? <span className="bg-info fs-8 text-light fw-bold px-2 rounded-circle mt-1" style={{ width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>6</span> : (c.outcome == "FOUR") ? <span className="bg-purple fs-8 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>4</span> : (c.outcome == "OUT") && <span className="bg-danger fs-8 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>W</span>}
                                                </p>
                                                <p className="col-10 py-2 m-0">{c.bowler} to {c.batsman}, <span className="fw-semibold">{c.outcome}</span>, {c.comment}</p>
                                            </div>))}
                                    </div> : (((matchStatus == 'First Inning') || (matchStatus == "Innings Break")) ?
                                        <>
                                            <div className="row">
                                                <div className="col-8 d-flex flex-column justify-content-center">
                                                    <p className="p-0 px-2 py-1 fw-semibold fs-5 m-0">{teams[matchData.inning1.teamId - 1].shortName}</p>
                                                    <p className="col-12 fs-4 fw-bold p-0 px-2 py-1 m-0">{matchData.inning1.runs}{matchData.inning1.wickets != 10 && "-" + matchData.inning1.wickets} <span className="fs-5 text-secondary">({Math.floor(matchData.inning1.balls / 6)}{(matchData.inning1.balls % 6 != 0) && "." + (matchData.inning1.balls % 6)})</span></p>
                                                </div>
                                                <div className="col-4 d-flex flex-column justify-content-center">
                                                    <p className="m-0 text-secondary">CRR</p>
                                                    <p className="m-0 fw-semibold">{(matchData.inning1.runs / ((matchData.inning1.balls / 6) + ((matchData.inning1.balls % 6) / 6))).toFixed(2)}</p>
                                                </div>
                                                <div className="col-12">
                                                    <p className="col-12 p-0 px-2 py-1 mb-1 fw-semibold text-danger">{(matchStatus == 'First Inning') ? fixture[matchId - 1].tossResult : "Innings Break"}</p>
                                                </div>
                                            </div>
                                            <div className="row border-bottom border-top m-0 py-1">
                                                <p className="col-5 m-0 p-0 fs-7 fw-semibold">Batter</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 fs-7 fw-semibold">R</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">B</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">4s</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">6s</p>
                                                    <p className="col-3 m-0 fs-7 ps-2 fw-semibold">SR</p>
                                                </div>
                                            </div>
                                            {(matchData.inning1.strikerId != null) &&
                                                <div className="row m-0 p-0">
                                                    <p className="col-5 m-0 py-1 fs-7 text-truncate">{squad[matchData.inning1.strikerId - 1].name}*</p>
                                                    <div className="col-7 d-flex">
                                                        <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].runs}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].balls}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].fours}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].sixes}</p>
                                                        <p className="col-3 m-0 py-1 fs-7">{(matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].balls * 100).toFixed(2) == "NaN" ?
                                                            "-" : (matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.strikerId)].balls * 100).toFixed(2)}</p>
                                                    </div>
                                                </div>}
                                            {(matchData.inning1.nonStrikerId != null) &&
                                                <div className="row m-0 p-0">
                                                    <p className="col-5 m-0 py-1 fs-7">{squad[matchData.inning1.nonStrikerId - 1].name}</p>
                                                    <div className="col-7 d-flex">
                                                        <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].runs}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].balls}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].fours}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].sixes}</p>
                                                        <p className="col-3 m-0 py-1 fs-7">{(matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].balls * 100).toFixed(2) == "NaN" ?
                                                            "-" : (matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex(p => p.playerId == matchData.inning1.nonStrikerId)].balls * 100).toFixed(2)}</p>
                                                    </div>
                                                </div>}
                                            <div className="row border-bottom border-top m-0 py-1">
                                                <p className="col-5 m-0 p-0 fs-7 fw-semibold">Bowler</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 fs-7 fw-semibold">O</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">M</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">R</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">W</p>
                                                    <p className="col-3 m-0 fs-7 ps-2 fw-semibold">ER</p>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0 border-bottom">
                                                <p className="col-5 m-0 py-1 fs-7 text-truncate">{squad[matchData.inning1.bowlerId - 1].name}</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 py-1 fs-7">{Math.floor(matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].balls / 6)}{(matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].balls % 6 != 0) && "." + (matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].balls % 6)}</p>
                                                    <p className="col-2 m-0 py-1 fs-7">0</p>
                                                    <p className="col-2 m-0 py-1 fs-7">{matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].runs}</p>
                                                    <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].wickets}</p>
                                                    <p className="col-3 m-0 py-1 fs-7">{(matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].runs / (Math.floor(matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].balls / 6) + ((matchData.inning1Bowler[matchData.inning1Bowler.findIndex(p => p.playerId == matchData.inning1.bowlerId)].balls % 6) / 6))).toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0">
                                                <p className="fs-4 fw-bold mt-2 col-12">Commentary</p>
                                                {matchData.commentary.slice().reverse().map((c) => (
                                                    <div className="row m-0 border-bottom p-0" key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`}>
                                                        <p className="fw-bold col-lg-1 col-md-1 col-2 py-1 text-center d-flex align-items-center flex-column"><span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>{(c.outcome == "SIX") ? <span className="bg-info fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>6</span> : (c.outcome == "FOUR") ? <span className="fs-6 text-light fw-bold  px-2 rounded-circle mt-1 bg-purple" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>4</span> : (c.outcome == "OUT") && <span className="bg-danger fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>W</span>}</p>
                                                        <p className="col-10 col-lg-11 col-md-11 py-1">{c.bowler} to {c.batsman}, <span className="fw-bold">{c.outcome}</span>, {c.comment}</p>
                                                    </div>))}
                                            </div>
                                        </> : (matchStatus == "Second Inning") && <>
                                            <div className="row">
                                                <div className="col-8 d-flex flex-column justify-content-center">
                                                    <p className="p-0 px-2 py-1 fw-semibold fs-5 m-0">{teams[matchData.inning2.teamId - 1].shortName}</p>
                                                    <p className="col-12 fs-4 fw-bold p-0 px-2 py-1 m-0">{matchData.inning2.runs}{matchData.inning2.wickets != 10 && "-" + matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}{(matchData.inning2.balls % 6 != 0) && "." + (matchData.inning2.balls % 6)})</p>
                                                </div>
                                                <div className="col-2 d-flex flex-column justify-content-center">
                                                    <p className="m-0 text-secondary">CRR</p>
                                                    <p className="m-0 fw-semibold">{(matchData.inning2.runs / ((matchData.inning2.balls / 6) + ((matchData.inning2.balls % 6) / 6))).toFixed(2)}</p>
                                                </div>
                                                <div className="col-2 d-flex flex-column justify-content-center">
                                                    <p className="m-0 text-secondary">REQ</p>
                                                    <p className="m-0 fw-semibold">{((matchData.inning1.runs - matchData.inning2.runs + 1) / (((120 - matchData.inning2.balls) / 6) + (((120 - matchData.inning2.balls) % 6) / 6))).toFixed(2)}</p>
                                                </div>
                                                <div className="col-12">
                                                    <p className="col-12 p-0 px-2 py-1 mb-1 fw-semibold text-danger">{(matchStatus == 'Second Inning') ? `${teams[matchData.inning2.teamId - 1].name} need ${(matchData.inning1.runs - matchData.inning2.runs + 1)} runs from ${120 - matchData.inning2.balls}` : "Innings Break"}</p>
                                                </div>
                                            </div>
                                            <div className="row border-bottom border-top m-0 py-1">
                                                <p className="col-5 m-0 p-0 fs-7 fw-semibold">Batter</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 fs-7 fw-semibold">R</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">B</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">4s</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">6s</p>
                                                    <p className="col-3 m-0 fs-7 ps-2 fw-semibold">SR</p>
                                                </div>
                                            </div>
                                            {(matchData.inning2.strikerId != null) &&
                                                <div className="row m-0 p-0">
                                                    <p className="col-5 m-0 py-1 fs-7 text-truncate">{squad[matchData.inning2.strikerId - 1].name}*</p>
                                                    <div className="col-7 d-flex">
                                                        <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].runs}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].balls}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].fours}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].sixes}</p>
                                                        <p className="col-3 m-0 py-1 fs-7">{(matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].balls * 100).toFixed(2) == "NaN" ?
                                                            "-" : (matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.strikerId)].balls * 100).toFixed(2)}</p>
                                                    </div>
                                                </div>}
                                            {(matchData.inning2.nonStrikerId != null) &&
                                                <div className="row m-0 p-0">
                                                    <p className="col-5 m-0 py-1 fs-7">{squad[matchData.inning2.nonStrikerId - 1].name}</p>
                                                    <div className="col-7 d-flex">
                                                        <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].runs}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].balls}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].fours}</p>
                                                        <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].sixes}</p>
                                                        <p className="col-3 m-0 py-1 fs-7">{(matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].balls * 100).toFixed(2) == "NaN" ?
                                                            "-" : (matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex(p => p.playerId == matchData.inning2.nonStrikerId)].balls * 100).toFixed(2)}</p>
                                                    </div>
                                                </div>}
                                            <div className="row border-bottom border-top m-0 py-1">
                                                <p className="col-5 m-0 p-0 fs-7 fw-semibold">Bowler</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 fs-7 fw-semibold">O</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">M</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">R</p>
                                                    <p className="col-2 m-0 fs-7 fw-semibold">W</p>
                                                    <p className="col-3 m-0 fs-7 ps-2 fw-semibold">ER</p>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0 border-bottom">
                                                <p className="col-5 m-0 py-1 fs-7 text-truncate">{squad[matchData.inning2.bowlerId - 1].name}</p>
                                                <div className="col-7 d-flex">
                                                    <p className="col-2 m-0 py-1 fs-7">{Math.floor(matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].balls / 6)}{(matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].balls % 6 != 0) && "." + (matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].balls % 6)}</p>
                                                    <p className="col-2 m-0 py-1 fs-7">0</p>
                                                    <p className="col-2 m-0 py-1 fs-7">{matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].runs}</p>
                                                    <p className="col-2 m-0 py-1 fs-7 fw-semibold">{matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].wickets}</p>
                                                    <p className="col-3 m-0 py-1 fs-7">{(matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].runs / (Math.floor(matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].balls / 6) + ((matchData.inning2Bowler[matchData.inning2Bowler.findIndex(p => p.playerId == matchData.inning2.bowlerId)].balls % 6) / 6))).toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0">
                                                <p className="fs-4 fw-bold mt-2 col-12">Commentary</p>
                                                {matchData.commentary.slice().reverse().map((c) => (
                                                    <div className="row m-0 border-bottom p-0" key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`}>
                                                        <p className="fw-bold col-lg-1 col-md-1 col-2 py-1 text-center d-flex align-items-center flex-column"><span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>{(c.outcome == "SIX") ? <span className="bg-info fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>6</span> : (c.outcome == "FOUR") ? <span className="fs-6 text-light fw-bold  px-2 rounded-circle mt-1 bg-purple" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>4</span> : (c.outcome == "OUT") && <span className="bg-danger fs-6 text-light fw-bold  px-2 rounded-circle mt-1" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>W</span>}</p>
                                                        <p className="col-10 col-lg-11 col-md-11 py-1">{c.bowler} to {c.batsman}, <span className="fw-bold">{c.outcome}</span>, {c.comment}</p>
                                                    </div>))}
                                            </div>
                                        </>))}
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
                                                                {(matchData.inning1Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
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
                                                                {(matchData.inning2Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
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
                                    <div className="row bg-gray fw-bold py-1 fs-8">
                                        <div className="col-6 d-flex align-items-center">
                                            <img src={teams[fixture[matchId - 1].homeTeamId - 1].logo} alt="" className="img-2" />
                                            <p className="m-0">{teams[fixture[matchId - 1].homeTeamId - 1].shortName}</p>
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-end">
                                            <p className="m-0">{teams[fixture[matchId - 1].awayTeamId - 1].shortName}</p>
                                            <img src={teams[fixture[matchId - 1].awayTeamId - 1].logo} alt="" className="img-2" />
                                        </div>
                                    </div>
                                    <div className="row border-bottom py-1">
                                        <div className="col-6 d-flex align-items-center">
                                            <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].name} className="img-2 rounded-circle border" />
                                            <p className="fs-8 text-truncate m-0 px-1">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].name}</p>
                                            {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].wicketKeeper) ? <p className="m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].captain) && <p className="m-0">(c)</p> }
                                        </div>
                                        <div className="col-6 text-end d-flex align-items-center justify-content-end">
                                            <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].name}</p>
                                            <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].name} className="img-2 rounded-circle border" />
                                        </div>
                                    </div>
                                    <div className="row border-bottom py-1">
                                        <div className="col-6 d-flex align-items-center">
                                            <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name} className="img rounded-circle border" />
                                            <p className="fs-8 text-truncate m-0 px-1">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name}</p>
                                            
                                        </div>
                                        <div className="col-6 text-end d-flex align-items-center justify-content-end">
                                            <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].name}</p>
                                            <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name} className="img rounded-circle border" />
                                        </div>
                                    </div>
                                    <div className="row border-bottom py-1">
                                        <div className="col-6 d-flex align-items-center">
                                            <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name} className="img rounded-circle border" />
                                            <p className="fs-8 text-truncate m-0 px-1">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name}</p>
                                        </div>
                                        <div className="col-6 text-end d-flex align-items-center justify-content-end">
                                            <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].name}</p>
                                            <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name} className="img rounded-circle border" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].name}</div>
                                        <div className="col-6 text-end">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].name}</div>
                                    </div>
                                </div>}
                            </div ></>}</> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Error 404 - Page not Found!</div>}
        </>
    );
}
export default Match;