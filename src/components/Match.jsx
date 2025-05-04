import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import handleInning from "../utils/handleInning.js";
import handleSuperOverInning from "../utils/handleSuperOverInning.js";
import handlePointsTable from "../utils/handlePointsTable.js";
import handleStatistics from "../utils/handleStatistics.js";
import handleMatch from "../utils/handleMatch.js";
function Match() {
    const { matchId } = useParams();
    const [status, setStatus] = useState();
    const [fixture, setFixture] = useState();
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
        const squad = JSON.parse(localStorage.getItem("squad"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setFixture(JSON.parse(localStorage.getItem("fixture")));
        setStatus(localStorage.getItem("status"));
        if (matchId >= 1 && matchId <= 74 && fixture[matchId - 1]?.tossStatus == "Completed") {
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
    useEffect(() => {
        if (matchStatus === "Completed") {
            const matchTitlePart = (matchId === 71) ? "Qualifier 1" : (matchId === 72) ? "Eliminator" : (matchId === 73) ? "Qualifier 2" : (matchId === 74) ? "Final" : `Match #${matchId}`;
            document.title = `${matchTitlePart}: ${teams?.[fixture?.[matchId - 1]?.homeTeamId - 1]?.shortName} vs ${teams?.[fixture?.[matchId - 1]?.awayTeamId - 1]?.shortName}`;
        }
        else if (matchStatus == "First Inning" || matchStatus == "Innings Break") {
            document.title = `${teams[matchData.inning1.teamId - 1].shortName}: ${matchData.inning1.runs}-${matchData.inning1.wickets} (${Math.floor(matchData.inning1.balls / 6)}.${matchData.inning1.balls % 6})`;
        }
        else if (matchStatus == "Second Inning") {
            document.title = `${teams[matchData.inning2.teamId - 1].shortName}: ${matchData.inning2.runs}-${matchData.inning2.wickets} (${Math.floor(matchData.inning2.balls / 6)}.${matchData.inning2.balls % 6}) vs ${teams[matchData.inning1.teamId - 1].shortName}: ${matchData.inning1.runs}-${matchData.inning1.wickets} (${Math.floor(matchData.inning1.balls / 6)}.${matchData.inning1.balls % 6})`;
        }
    }, [matchData]);
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
        handleMatch();
    }
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            {(matchId >= 1 && matchId <= 74) ?
                <>
                    {(!status) ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a team.</div> :
                        ((fixture) && (fixture[matchId - 1].tossStatus != "Completed")) ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Toss not Completed. Please Complete a Toss to Play a Match.</div> :
                            <>
                                <div className="row bg-green border-bottom sticky-top">
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
                                                <p className="col-9 fs-8 py-1 m-0">{(matchId == 71) ? "Qualifier 1" : (matchId == 72) ? "Eliminator" : (matchId == 73) ? "Qualifier 2" : (matchId == 74) ? "Final" : `Match ${matchId}`}</p>
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
                                    {(tab == "Commentary") &&
                                        ((matchStatus == "Completed") ?
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
                                            </div> :
                                            (((matchStatus == "First Inning") || (matchStatus == "Innings Break")) ?
                                                <>
                                                    <div className="row p-0 m-0">
                                                        <div className="col-8 d-flex flex-column fw-semibold">
                                                            <p className="col-2 fs-5 m-0">{teams[matchData.inning1.teamId - 1].shortName}</p>
                                                            <p className="col-10 fs-4 fw-bold m-0">{matchData.inning1.runs}{(matchData.inning1.wickets != 10) && "-" + matchData.inning1.wickets} <span className="fs-5 text-secondary">({Math.floor(matchData.inning1.balls / 6)}{(matchData.inning1.balls % 6 != 0) && "." + (matchData.inning1.balls % 6)})</span></p>
                                                        </div>
                                                        <div className="col-4 d-flex flex-column justify-content-center">
                                                            <p className="m-0 fw-semibold text-secondary">CRR</p>
                                                            <p className="m-0 fw-semibold">{(matchData.inning1.balls == 0) ? "-" : ((matchData.inning1.runs / matchData.inning1.balls) * 6).toFixed(1)}</p>
                                                        </div>
                                                        <p className="col-12 fs-8 fw-semibold text-danger text-truncate py-1 m-0">{(matchStatus == "First Inning") ? fixture[matchId - 1].tossResult : "Innings Break"}</p>
                                                        <div className="row bg-gray py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold p-0 m-0">Batter</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">R</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">B</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">4s</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">6s</p>
                                                                <p className="col-3 fs-8 fw-semibold text-end m-0">SR</p>
                                                            </div>
                                                        </div>
                                                        {(matchData.inning1.strikerId != null) &&
                                                            <div className="row py-1 m-0">
                                                                <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning1.strikerId - 1].shortName}*</p>
                                                                <div className="col-8 d-flex">
                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].runs}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].balls}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].fours}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].sixes}</p>
                                                                    <p className="col-3 fs-8 text-end m-0">{(matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].balls == 0) ? "-" : (matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.strikerId))].balls * 100).toFixed(1)}</p>
                                                                </div>
                                                            </div>}
                                                        {(matchData.inning1.nonStrikerId != null) &&
                                                            <div className="row py-1 m-0">
                                                                <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning1.nonStrikerId - 1].shortName}</p>
                                                                <div className="col-8 d-flex">
                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].runs}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].balls}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].fours}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].sixes}</p>
                                                                    <p className="col-3 fs-8 text-end m-0">{(matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].balls == 0) ? "-" : (matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].runs / matchData.inning1Batsman[matchData.inning1Batsman.findIndex((p) => (p.playerId == matchData.inning1.nonStrikerId))].balls * 100).toFixed(1)}</p>
                                                                </div>
                                                            </div>}
                                                        <div className="row bg-gray py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold p-0 m-0">Bowler</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">O</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">M</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">R</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">W</p>
                                                                <p className="col-3 fs-8 fw-semibold text-end m-0">ER</p>
                                                            </div>
                                                        </div>
                                                        <div className="row py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning1.bowlerId - 1].shortName}</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 text-end m-0">{Math.floor(matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls / 6)}{(matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls % 6 != 0) && "." + (matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls % 6)}</p>
                                                                <p className="col-2 fs-8 text-end m-0">0</p>
                                                                <p className="col-2 fs-8 text-end m-0">{matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].runs}</p>
                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].wickets}</p>
                                                                <p className="col-3 fs-8 text-end m-0">{(matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls == 0) ? "-" : (matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].runs / (Math.floor(matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls / 6) + ((matchData.inning1Bowler[matchData.inning1Bowler.findIndex((p) => (p.playerId == matchData.inning1.bowlerId))].balls % 6) / 6))).toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                        <p className="col-12 fw-semibold bg-gray py-1 m-0">Commentary</p>
                                                        {matchData.commentary.slice().reverse().map((c) => (
                                                            <div key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`} className="col-12 d-flex border-bottom px-0 pe-2">
                                                                <p className="col-2 d-flex flex-column align-items-center fw-semibold text-center py-2 m-0">
                                                                    <span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>
                                                                    {(c.outcome == "SIX") ? <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-info px-2 rounded-circle mt-1">6</span> : ((c.outcome == "FOUR") ? <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-purple px-2 rounded-circle mt-1">4</span> : (c.outcome == "OUT") && <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-danger px-2 rounded-circle mt-1">W</span>)}
                                                                </p>
                                                                <p className="col-10 py-2 m-0">{c.bowler} to {c.batsman}, <span className="fw-semibold">{c.outcome}</span>, {c.comment}</p>
                                                            </div>))}
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="row p-0 m-0">
                                                        <div className="col-7 d-flex flex-column fw-semibold">
                                                            <p className="col-2 fs-5 m-0">{teams[matchData.inning2.teamId - 1].shortName}</p>
                                                            <p className="col-10 fs-4 fw-bold m-0">{matchData.inning2.runs}{(matchData.inning2.wickets != 10) && "-" + matchData.inning2.wickets} <span className="fs-5 text-secondary">({Math.floor(matchData.inning2.balls / 6)}{(matchData.inning2.balls % 6 != 0) && "." + (matchData.inning2.balls % 6)})</span></p>
                                                        </div>
                                                        <div className="col-5 d-flex align-items-center justify-content-center gap-3">
                                                            <div className="col-3 d-flex flex-column justify-content-center">
                                                                <p className="m-0 fw-semibold text-secondary">CRR</p>
                                                                <p className="m-0 fw-semibold">{(matchData.inning2.balls == 0) ? "-" : ((matchData.inning2.runs / matchData.inning2.balls) * 6).toFixed(1)}</p>
                                                            </div>
                                                            <div className="col-3 d-flex flex-column justify-content-center">
                                                                <p className="m-0 fw-semibold text-secondary">REQ</p>
                                                                <p className="m-0 fw-semibold">{(120 - matchData.inning2.balls == 0) ? "-" : (((matchData.inning1.runs - matchData.inning2.runs + 1) / (120 - matchData.inning2.balls)) * 6).toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                        <p className="col-12 fs-8 fw-semibold text-danger text-truncate py-1 m-0">{(matchStatus == "Second Inning") ? (`${teams[matchData.inning2.teamId - 1].shortName} need ${matchData.inning1.runs - matchData.inning2.runs + 1} run${(matchData.inning1.runs - matchData.inning2.runs + 1 == 1) ? "" : "s"} from ${120 - matchData.inning2.balls} ball${(120 - matchData.inning2.balls == 1) ? "" : "s"}`) : "Super Over"}</p>
                                                        <div className="row bg-gray py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold p-0 m-0">Batter</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">R</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">B</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">4s</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">6s</p>
                                                                <p className="col-3 fs-8 fw-semibold text-end m-0">SR</p>
                                                            </div>
                                                        </div>
                                                        {(matchData.inning2.strikerId != null) &&
                                                            <div className="row py-1 m-0">
                                                                <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning2.strikerId - 1].shortName}*</p>
                                                                <div className="col-8 d-flex">
                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].runs}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].balls}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].fours}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].sixes}</p>
                                                                    <p className="col-3 fs-8 text-end m-0">{(matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].balls == 0) ? "-" : (matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.strikerId))].balls * 100).toFixed(1)}</p>
                                                                </div>
                                                            </div>}
                                                        {(matchData.inning2.nonStrikerId != null) &&
                                                            <div className="row py-1 m-0">
                                                                <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning2.nonStrikerId - 1].shortName}</p>
                                                                <div className="col-8 d-flex">
                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].runs}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].balls}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].fours}</p>
                                                                    <p className="col-2 fs-8 text-end m-0">{matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].sixes}</p>
                                                                    <p className="col-3 fs-8 text-end m-0">{(matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].balls == 0) ? "-" : (matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].runs / matchData.inning2Batsman[matchData.inning2Batsman.findIndex((p) => (p.playerId == matchData.inning2.nonStrikerId))].balls * 100).toFixed(1)}</p>
                                                                </div>
                                                            </div>}
                                                        <div className="row bg-gray py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold p-0 m-0">Bowler</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">O</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">M</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">R</p>
                                                                <p className="col-2 fs-8 fw-semibold text-end m-0">W</p>
                                                                <p className="col-3 fs-8 fw-semibold text-end m-0">ER</p>
                                                            </div>
                                                        </div>
                                                        <div className="row py-1 m-0">
                                                            <p className="col-4 fs-8 fw-semibold text-truncate p-0 m-0">{squad[matchData.inning2.bowlerId - 1].shortName}</p>
                                                            <div className="col-8 d-flex">
                                                                <p className="col-2 fs-8 text-end m-0">{Math.floor(matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls / 6)}{(matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls % 6 != 0) && "." + (matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls % 6)}</p>
                                                                <p className="col-2 fs-8 text-end m-0">0</p>
                                                                <p className="col-2 fs-8 text-end m-0">{matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].runs}</p>
                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].wickets}</p>
                                                                <p className="col-3 fs-8 text-end m-0">{(matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls == 0) ? "-" : (matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].runs / (Math.floor(matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls / 6) + ((matchData.inning2Bowler[matchData.inning2Bowler.findIndex((p) => (p.playerId == matchData.inning2.bowlerId))].balls % 6) / 6))).toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                        <p className="col-12 fw-semibold bg-gray py-1 m-0">Commentary</p>
                                                        {matchData.commentary.slice().reverse().map((c) => (
                                                            <div key={`${c.ball}+${c.bowler}+${c.batsman}+${c.outcome}+${c.comment}+${matchData.inning1.runs + matchData.inning2.runs}`} className="col-12 d-flex border-bottom px-0 pe-2">
                                                                <p className="col-2 d-flex flex-column align-items-center fw-semibold text-center py-2 m-0">
                                                                    <span>{Math.floor(c.ball / 6) + "." + (c.ball % 6)}</span>
                                                                    {(c.outcome == "SIX") ? <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-info px-2 rounded-circle mt-1">6</span> : ((c.outcome == "FOUR") ? <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-purple px-2 rounded-circle mt-1">4</span> : (c.outcome == "OUT") && <span className="s-25 d-flex align-items-center justify-content-center fs-8 fw-bold text-light bg-danger px-2 rounded-circle mt-1">W</span>)}
                                                                </p>
                                                                <p className="col-10 py-2 m-0">{c.bowler} to {c.batsman}, <span className="fw-semibold">{c.outcome}</span>, {c.comment}</p>
                                                            </div>))}
                                                    </div>
                                                </>))}
                                    {(tab == "Scorecard") &&
                                        ((matchStatus == "Completed") ?
                                            <div className="row p-0 m-0">
                                                <p className="col-12 fs-8 fw-semibold text-info text-truncate p-2 m-0">{fixture[matchId - 1].matchResult}</p>
                                                <div id="accordionExample" className="accordion p-0">
                                                    <div className="accordion-item border-0 border-top rounded-0">
                                                        <h2 className="accordion-header">
                                                            <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="accordion-button collapsed fw-semibold rounded-0 px-2 py-3 shadow-none">
                                                                <div className="col-11 d-flex m-0">
                                                                    <p className="col-8 fs-8 m-0">{teams[matchData.inning1.teamId - 1].name}</p>
                                                                    <p className="col-4 fs-8 text-end m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" data-bs-parent="#accordionExample" className="accordion-collapse collapse">
                                                            <div className="accordion-body p-0">
                                                                <div className="row bg-gray py-1 m-0">
                                                                    <p className="col-5 fs-8 fw-semibold m-0">Batter</p>
                                                                    <div className="col-7 d-flex fw-semibold">
                                                                        <p className="col-2 fs-8 text-end m-0">R</p>
                                                                        <p className="col-2 fs-8 text-end m-0">B</p>
                                                                        <p className="col-2 fs-8 text-end m-0">4s</p>
                                                                        <p className="col-2 fs-8 text-end m-0">6s</p>
                                                                        <p className="col-3 fs-8 text-end m-0">SR</p>
                                                                    </div>
                                                                </div>
                                                                {matchData.inning1Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                                                    <React.Fragment key={b.playerId}>
                                                                        <div className="row pt-1 m-0">
                                                                            <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : ((squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)")}</p>
                                                                            <div className="col-7 d-flex">
                                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{b.runs}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.balls}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.fours}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.sixes}</p>
                                                                                <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : ((b.runs / b.balls) * 100).toFixed(1)}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row border-bottom py-0 pb-1 m-0">
                                                                            <p className="col-12 fs-8 text-secondary text-truncate m-0 pe-5 py-0">{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</p>
                                                                        </div>
                                                                    </React.Fragment>))}
                                                                <div className="row border-bottom py-1 m-0">
                                                                    <p className="col-6 fs-8 fw-semibold m-0">Extras</p>
                                                                    <p className="col-6 text-end fs-8 m-0"><span className="fw-bold">{matchData.inning1.extras}</span> w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</p>
                                                                </div>
                                                                <div className="row py-1 m-0">
                                                                    <p className="col-6 fs-8 fw-semibold m-0">Total</p>
                                                                    <p className="col-6 fw-bold text-end fs-8 m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                </div>
                                                                {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                                                    <>
                                                                        <div className="row bg-gray py-1 m-0">
                                                                            <p className="col-12 fs-8 fw-semibold m-0">Did not bat</p>
                                                                        </div>
                                                                        <div className="row py-1 m-0">
                                                                            <p className="col-12 fs-8 m-0">
                                                                                {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                                                            </p>
                                                                        </div>
                                                                    </>}
                                                                <div className="row bg-gray py-1 m-0">
                                                                    <p className="col-5 fs-8 fw-semibold m-0">Bowler</p>
                                                                    <div className="col-7 d-flex fw-semibold">
                                                                        <p className="col-2 fs-8 text-end m-0">O</p>
                                                                        <p className="col-2 fs-8 text-end m-0">M</p>
                                                                        <p className="col-2 fs-8 text-end m-0">R</p>
                                                                        <p className="col-2 fs-8 text-end m-0">W</p>
                                                                        <p className="col-3 fs-8 text-end m-0">ER</p>
                                                                    </div>
                                                                </div>
                                                                {(matchData.inning1Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
                                                                    <>
                                                                        <div key={b.playerId} className="row border-bottom py-1 m-0">
                                                                            <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}</p>
                                                                            <div className="col-7 d-flex">
                                                                                <p className="col-2 fs-8 text-end m-0">{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">0</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.runs}</p>
                                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{b.wickets}</p>
                                                                                <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : (b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item border-0 border-top border-bottom rounded-0">
                                                        <h2 className="accordion-header">
                                                            <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" className="accordion-button fw-semibold rounded-0 px-2 py-3 shadow-none">
                                                                <div className="col-11 d-flex m-0">
                                                                    <p className="col-8 fs-8 m-0">{teams[matchData.inning2.teamId - 1].name}</p>
                                                                    <p className="col-4 fs-8 text-end m-0">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</p>
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" data-bs-parent="#accordionExample" className="accordion-collapse collapse show">
                                                            <div className="accordion-body p-0">
                                                                <div className="row bg-gray py-1 m-0">
                                                                    <p className="col-5 fs-8 fw-semibold m-0">Batter</p>
                                                                    <div className="col-7 d-flex fw-semibold">
                                                                        <p className="col-2 fs-8 text-end m-0">R</p>
                                                                        <p className="col-2 fs-8 text-end m-0">B</p>
                                                                        <p className="col-2 fs-8 text-end m-0">4s</p>
                                                                        <p className="col-2 fs-8 text-end m-0">6s</p>
                                                                        <p className="col-3 fs-8 text-end m-0">SR</p>
                                                                    </div>
                                                                </div>
                                                                {matchData.inning2Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                                                    <React.Fragment key={b.playerId}>
                                                                        <div className="row pt-1 m-0">
                                                                            <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : ((squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)")}</p>
                                                                            <div className="col-7 d-flex">
                                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{b.runs}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.balls}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.fours}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.sixes}</p>
                                                                                <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : ((b.runs / b.balls) * 100).toFixed(1)}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row border-bottom py-0 pb-1 m-0">
                                                                            <p className="col-12 fs-8 text-secondary text-truncate m-0 pe-5 py-0">{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</p>
                                                                        </div>
                                                                    </React.Fragment>))}
                                                                <div className="row border-bottom py-1 m-0">
                                                                    <p className="col-6 fs-8 fw-semibold m-0">Extras</p>
                                                                    <p className="col-6 text-end fs-8 m-0"><span className="fw-bold">{matchData.inning2.extras}</span> w {matchData.inning2.wides}, nb {matchData.inning2.noBalls}, lb {matchData.inning2.legByes}, b {matchData.inning2.byes}</p>
                                                                </div>
                                                                <div className="row py-1 m-0">
                                                                    <p className="col-6 fs-8 fw-semibold m-0">Total</p>
                                                                    <p className="col-6 fw-bold text-end fs-8 m-0">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</p>
                                                                </div>
                                                                {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                                                    <>
                                                                        <div className="row bg-gray py-1 m-0">
                                                                            <p className="col-12 fs-8 fw-semibold m-0">Did not bat</p>
                                                                        </div>
                                                                        <div className="row py-1 m-0">
                                                                            <p className="col-12 fs-8 m-0">
                                                                                {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                                                            </p>
                                                                        </div>
                                                                    </>}
                                                                <div className="row bg-gray py-1 m-0">
                                                                    <p className="col-5 fs-8 fw-semibold m-0">Bowler</p>
                                                                    <div className="col-7 d-flex fw-semibold">
                                                                        <p className="col-2 fs-8 text-end m-0">O</p>
                                                                        <p className="col-2 fs-8 text-end m-0">M</p>
                                                                        <p className="col-2 fs-8 text-end m-0">R</p>
                                                                        <p className="col-2 fs-8 text-end m-0">W</p>
                                                                        <p className="col-3 fs-8 text-end m-0">ER</p>
                                                                    </div>
                                                                </div>
                                                                {(matchData.inning2Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
                                                                    <>
                                                                        <div key={b.playerId} className="row border-bottom py-1 m-0">
                                                                            <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}</p>
                                                                            <div className="col-7 d-flex">
                                                                                <p className="col-2 fs-8 text-end m-0">{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</p>
                                                                                <p className="col-2 fs-8 text-end m-0">0</p>
                                                                                <p className="col-2 fs-8 text-end m-0">{b.runs}</p>
                                                                                <p className="col-2 fs-8 fw-bold text-end m-0">{b.wickets}</p>
                                                                                <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : (b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            ((matchStatus == "First Inning") || (matchStatus == "Innings Break")) ?
                                                <div className="row p-0 m-0">
                                                    <p className="col-12 fs-8 fw-semibold text-danger text-truncate p-2 m-0">{(matchStatus == "First Inning") ? fixture[matchId - 1].tossResult : "Innings Break"}</p>
                                                    <div id="accordionExample" className="accordion p-0">
                                                        <div className="accordion-item border-0 border-top border-bottom rounded-0">
                                                            <h2 className="accordion-header">
                                                                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="accordion-button fw-semibold rounded-0 px-2 py-3 shadow-none">
                                                                    <div className="col-11 d-flex m-0">
                                                                        <p className="col-8 fs-8 m-0">{teams[matchData.inning1.teamId - 1].name}</p>
                                                                        <p className="col-4 fs-8 text-end m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                    </div>
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" data-bs-parent="#accordionExample" className="accordion-collapse collapse show">
                                                                <div className="accordion-body p-0">
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Batter</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">B</p>
                                                                            <p className="col-2 fs-8 text-end m-0">4s</p>
                                                                            <p className="col-2 fs-8 text-end m-0">6s</p>
                                                                            <p className="col-3 fs-8 text-end m-0">SR</p>
                                                                        </div>
                                                                    </div>
                                                                    {matchData.inning1Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                                                        <React.Fragment key={b.playerId}>
                                                                            <div className="row pt-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : ((squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)")}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.balls}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.fours}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.sixes}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : ((b.runs / b.balls) * 100).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row border-bottom py-0 pb-1 m-0">
                                                                                <p className="col-12 fs-8 text-secondary text-truncate m-0 pe-5 py-0">{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</p>
                                                                            </div>
                                                                        </React.Fragment>))}
                                                                    <div className="row border-bottom py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Extras</p>
                                                                        <p className="col-6 text-end fs-8 m-0"><span className="fw-bold">{matchData.inning1.extras}</span> w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</p>
                                                                    </div>
                                                                    <div className="row py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Total</p>
                                                                        <p className="col-6 fw-bold text-end fs-8 m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                    </div>
                                                                    {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                                                        <>
                                                                            <div className="row bg-gray py-1 m-0">
                                                                                <p className="col-12 fs-8 fw-semibold m-0">Yet to bat</p>
                                                                            </div>
                                                                            <div className="row py-1 m-0">
                                                                                <p className="col-12 fs-8 m-0">
                                                                                    {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                                                                </p>
                                                                            </div>
                                                                        </>}
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Bowler</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">O</p>
                                                                            <p className="col-2 fs-8 text-end m-0">M</p>
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">W</p>
                                                                            <p className="col-3 fs-8 text-end m-0">ER</p>
                                                                        </div>
                                                                    </div>
                                                                    {(matchData.inning1Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
                                                                        <>
                                                                            <div key={b.playerId} className="row border-bottom py-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 text-end m-0">{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">0</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.wickets}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : (b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div className="row p-0 m-0">
                                                    <p className="col-12 fs-8 fw-semibold text-danger text-truncate py-1 m-0">{(matchStatus == "Second Inning") ? (`${teams[matchData.inning2.teamId - 1].shortName} need ${matchData.inning1.runs - matchData.inning2.runs + 1} run${(matchData.inning1.runs - matchData.inning2.runs + 1 == 1) ? "" : "s"} from ${120 - matchData.inning2.balls} ball${(120 - matchData.inning2.balls == 1) ? "" : "s"}`) : "Super Over"}</p>
                                                    <div id="accordionExample" className="accordion p-0">
                                                        <div className="accordion-item border-0 border-top rounded-0">
                                                            <h2 className="accordion-header">
                                                                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="accordion-button collapsed fw-semibold rounded-0 px-2 py-3 shadow-none">
                                                                    <div className="col-11 d-flex m-0">
                                                                        <p className="col-8 fs-8 m-0">{teams[matchData.inning1.teamId - 1].name}</p>
                                                                        <p className="col-4 fs-8 text-end m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                    </div>
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" data-bs-parent="#accordionExample" className="accordion-collapse collapse">
                                                                <div className="accordion-body p-0">
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Batter</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">B</p>
                                                                            <p className="col-2 fs-8 text-end m-0">4s</p>
                                                                            <p className="col-2 fs-8 text-end m-0">6s</p>
                                                                            <p className="col-3 fs-8 text-end m-0">SR</p>
                                                                        </div>
                                                                    </div>
                                                                    {matchData.inning1Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                                                        <React.Fragment key={b.playerId}>
                                                                            <div className="row pt-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : ((squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)")}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.balls}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.fours}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.sixes}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : ((b.runs / b.balls) * 100).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row border-bottom py-0 pb-1 m-0">
                                                                                <p className="col-12 fs-8 text-secondary text-truncate m-0 pe-5 py-0">{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</p>
                                                                            </div>
                                                                        </React.Fragment>))}
                                                                    <div className="row border-bottom py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Extras</p>
                                                                        <p className="col-6 text-end fs-8 m-0"><span className="fw-bold">{matchData.inning1.extras}</span> w {matchData.inning1.wides}, nb {matchData.inning1.noBalls}, lb {matchData.inning1.legByes}, b {matchData.inning1.byes}</p>
                                                                    </div>
                                                                    <div className="row py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Total</p>
                                                                        <p className="col-6 fw-bold text-end fs-8 m-0">{matchData.inning1.runs}-{matchData.inning1.wickets} ({Math.floor(matchData.inning1.balls / 6)}.{matchData.inning1.balls % 6})</p>
                                                                    </div>
                                                                    {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                                                        <>
                                                                            <div className="row bg-gray py-1 m-0">
                                                                                <p className="col-12 fs-8 fw-semibold m-0">Did not bat</p>
                                                                            </div>
                                                                            <div className="row py-1 m-0">
                                                                                <p className="col-12 fs-8 m-0">
                                                                                    {(matchData.inning1Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                                                                </p>
                                                                            </div>
                                                                        </>}
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Bowler</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">O</p>
                                                                            <p className="col-2 fs-8 text-end m-0">M</p>
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">W</p>
                                                                            <p className="col-3 fs-8 text-end m-0">ER</p>
                                                                        </div>
                                                                    </div>
                                                                    {(matchData.inning1Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
                                                                        <>
                                                                            <div key={b.playerId} className="row border-bottom py-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 text-end m-0">{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">0</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.wickets}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : (b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0 border-top border-bottom rounded-0">
                                                            <h2 className="accordion-header">
                                                                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" className="accordion-button fw-semibold rounded-0 px-2 py-3 shadow-none">
                                                                    <div className="col-11 d-flex m-0">
                                                                        <p className="col-8 fs-8 m-0">{teams[matchData.inning2.teamId - 1].name}</p>
                                                                        <p className="col-4 fs-8 text-end m-0">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</p>
                                                                    </div>
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" data-bs-parent="#accordionExample" className="accordion-collapse collapse show">
                                                                <div className="accordion-body p-0">
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Batter</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">B</p>
                                                                            <p className="col-2 fs-8 text-end m-0">4s</p>
                                                                            <p className="col-2 fs-8 text-end m-0">6s</p>
                                                                            <p className="col-3 fs-8 text-end m-0">SR</p>
                                                                        </div>
                                                                    </div>
                                                                    {matchData.inning2Batsman.filter((b) => (!b.didNotBat)).map((b) => (
                                                                        <React.Fragment key={b.playerId}>
                                                                            <div className="row pt-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : ((squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)")}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.balls}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.fours}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.sixes}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : ((b.runs / b.balls) * 100).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row border-bottom py-0 pb-1 m-0">
                                                                                <p className="col-12 fs-8 text-secondary text-truncate m-0 pe-5 py-0">{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? ((b.caughtById == b.wicketById) ? "c & b " + (squad[b.wicketById - 1].name) : "c " + (squad[b.caughtById - 1].name) + " b " + (squad[b.wicketById - 1].name)) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1].name) + " b " + (squad[b.wicketById - 1].name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1].name) + ")"}</p>
                                                                            </div>
                                                                        </React.Fragment>))}
                                                                    <div className="row border-bottom py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Extras</p>
                                                                        <p className="col-6 text-end fs-8 m-0"><span className="fw-bold">{matchData.inning2.extras}</span> w {matchData.inning2.wides}, nb {matchData.inning2.noBalls}, lb {matchData.inning2.legByes}, b {matchData.inning2.byes}</p>
                                                                    </div>
                                                                    <div className="row py-1 m-0">
                                                                        <p className="col-6 fs-8 fw-semibold m-0">Total</p>
                                                                        <p className="col-6 fw-bold text-end fs-8 m-0">{matchData.inning2.runs}-{matchData.inning2.wickets} ({Math.floor(matchData.inning2.balls / 6)}.{matchData.inning2.balls % 6})</p>
                                                                    </div>
                                                                    {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).length > 0) &&
                                                                        <>
                                                                            <div className="row bg-gray py-1 m-0">
                                                                                <p className="col-12 fs-8 fw-semibold m-0">Yet to bat</p>
                                                                            </div>
                                                                            <div className="row py-1 m-0">
                                                                                <p className="col-12 fs-8 m-0">
                                                                                    {(matchData.inning2Batsman.filter((b) => (b.didNotBat)).map((b) => (<span key={b.playerId}>{squad[b.playerId - 1].name}{(squad[b.playerId - 1].captain && squad[b.playerId - 1].wicketKeeper) ? " (c & wk)" : (squad[b.playerId - 1].captain) ? " (c)" : (squad[b.playerId - 1].wicketKeeper) && " (wk)"}{(b.playerId % 11 != 0) && ", "}</span>)))}
                                                                                </p>
                                                                            </div>
                                                                        </>}
                                                                    <div className="row bg-gray py-1 m-0">
                                                                        <p className="col-5 fs-8 fw-semibold m-0">Bowler</p>
                                                                        <div className="col-7 d-flex fw-semibold">
                                                                            <p className="col-2 fs-8 text-end m-0">O</p>
                                                                            <p className="col-2 fs-8 text-end m-0">M</p>
                                                                            <p className="col-2 fs-8 text-end m-0">R</p>
                                                                            <p className="col-2 fs-8 text-end m-0">W</p>
                                                                            <p className="col-3 fs-8 text-end m-0">ER</p>
                                                                        </div>
                                                                    </div>
                                                                    {(matchData.inning2Bowler.filter((b) => (b.runs > 0) || (b.balls > 0)).map((b) => (
                                                                        <>
                                                                            <div key={b.playerId} className="row border-bottom py-1 m-0">
                                                                                <p className="col-5 fs-8 fw-semibold text-truncate m-0">{squad[b.playerId - 1].name}</p>
                                                                                <div className="col-7 d-flex">
                                                                                    <p className="col-2 fs-8 text-end m-0">{Math.floor(b.balls / 6)}{(b.balls % 6 != 0) && "." + (b.balls % 6)}</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">0</p>
                                                                                    <p className="col-2 fs-8 text-end m-0">{b.runs}</p>
                                                                                    <p className="col-2 fs-8 fw-bold text-end m-0">{b.wickets}</p>
                                                                                    <p className="col-3 fs-8 text-end m-0">{(b.balls == 0) ? "-" : (b.runs / (Math.floor(b.balls / 6) + ((b.balls % 6) / 6))).toFixed(1)}</p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}
                                    {(tab == "Squad") &&
                                        <div>
                                            <div className="row fs-8 fw-bold bg-gray py-1">
                                                <div className="col-6 d-flex align-items-center">
                                                    <img src={teams[fixture[matchId - 1].homeTeamId - 1].logo} alt={teams[fixture[matchId - 1].homeTeamId - 1].shortName} className="img" />
                                                    <p className="m-0">{teams[fixture[matchId - 1].homeTeamId - 1].shortName}</p>
                                                </div>
                                                <div className="col-6 d-flex align-items-center justify-content-end">
                                                    <p className="m-0">{teams[fixture[matchId - 1].awayTeamId - 1].shortName}</p>
                                                    <img src={teams[fixture[matchId - 1].awayTeamId - 1].logo} alt={teams[fixture[matchId - 1].awayTeamId - 1].shortName} className="img" />
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 0].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 0].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 1].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 1].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 2].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 2].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 3].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 3].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 4].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 4].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 5].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 5].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 6].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 6].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 7].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 7].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 8].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 8].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 9].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 9].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row border-bottom">
                                                <div className="col-6 d-flex align-items-center p-1 border-end">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].foreigner ? "col-10" : "col-12"}`}>
                                                        <img src={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].profile} alt={squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].name} className="img rounded-circle border" />
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].wicketKeeper && squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].captain) && <p className="fs-8 m-0">(c)</p>}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].homeTeamId - 1) + 10].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-center p-1 border-start">
                                                    <div className={`d-flex align-items-center ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].foreigner && "col-2"}`}>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" />}
                                                    </div>
                                                    <div className={`d-flex align-items-center justify-content-end ${squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].foreigner ? "col-10" : "col-12"}`}>
                                                        <p className="fs-8 text-truncate px-1 m-0">{squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].name}</p>
                                                        {(squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].wicketKeeper && squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].captain) ? <p className="fs-8 m-0">(c&wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].wicketKeeper) ? <p className="fs-8 m-0">(wk)</p> : (squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].captain) && <p className="fs-8 m-0">(c)</p>}
                                                        <img src={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].profile} alt={squad[11 * (fixture[matchId - 1].awayTeamId - 1) + 10].name} className="img rounded-circle border" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </>}
                </> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Error 404 - Page not Found!</div>}
        </>
    );
}
export default Match;