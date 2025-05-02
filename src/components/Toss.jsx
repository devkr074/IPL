import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleTossCall from "../utils/handleTossCall.js";
import handleTossOutcome from "../utils/handleTossOutcome.js"
import handleOptionOutcome from "../utils/handleOptionOutcome.js"
import handleMatchData from "../utils/handleMatchData.js";
function Toss() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState();
    const [homeTeamId, setHomeTeamId] = useState();
    const [teams, setTeams] = useState();
    const [tossOutcome, setTossOutcome] = useState();
    const [userTeamId, setUserTeamId] = useState();
    const [optionOutcome, setOptionOutcome] = useState();
    const [flipped, setFlipped] = useState(false);
    const [opponentCall, setOpponentCall] = useState();
    const [userCall, setUserCall] = useState();
    const [status, setStatus] = useState();
    useEffect(() => {
        document.title = "IPL - Toss";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const tossOutcome = localStorage.getItem("tossOutcome");
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const optionOutcome = localStorage.getItem("optionOutcome");
        setStatus(localStorage.getItem("status"));

        setFixture(fixture);
        setTeams(teams);
        setTossOutcome(tossOutcome);
        setUserTeamId(userTeamId);
        setOptionOutcome(optionOutcome);
        if (matchId >= 1 && matchId <= 74 && status) {
            setHomeTeamId(fixture[matchId - 1].homeTeamId);
        }
        const opponentCall = localStorage.getItem("opponentCall");
        if (opponentCall) {
            setFlipped(true);
            setOpponentCall(opponentCall);
        }
        const userCall = localStorage.getItem("userCall");
        if (userCall) {
            setFlipped(true);
            setUserCall(userCall);
        }
    }, []);
    const navigate = useNavigate();
    function handleFlip(e) {
        e.target.textContent = "Flipping...";
        setTimeout(() => {
            e.target.textContent = "Flipped";
            setFlipped(true);
            const opponentCall = handleTossCall();
            localStorage.setItem("opponentCall", opponentCall);
            setOpponentCall(opponentCall);
            const tossOutcome = handleTossOutcome();
            localStorage.setItem("tossOutcome", tossOutcome);
            setTossOutcome(tossOutcome);
            if (opponentCall == tossOutcome) {
                const optionOutcome = handleOptionOutcome();
                localStorage.setItem("optionOutcome", optionOutcome);
                setOptionOutcome(optionOutcome);
            }
        }, 1000);
    }
    function handleTossCallSelect(e) {
        const userCall = e.target.value;
        setFlipped(true);
        localStorage.setItem("userCall", userCall);
        setUserCall(userCall);
        const tossOutcome = handleTossOutcome();
        localStorage.setItem("tossOutcome", tossOutcome);
        setTossOutcome(tossOutcome);
        if (userCall != tossOutcome) {
            const optionOutcome = handleOptionOutcome();
            localStorage.setItem("optionOutcome", optionOutcome);
            setOptionOutcome(optionOutcome);
        }
    }
    function handleOptionChange(e) {
        const optionOutcome = `${e.target.value}`;
        localStorage.setItem("optionOutcome", optionOutcome);
        setOptionOutcome(optionOutcome);
    }
    function handleMatch() {
        fixture[matchId - 1].tossStatus = "Completed";
        if (userCall && (userCall == tossOutcome)) {
            if ((optionOutcome == "Bat") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bat") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
        }
        else if (userCall && (userCall != tossOutcome)) {
            if ((optionOutcome == "Bat") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bat") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
        }
        else if (opponentCall && (opponentCall == tossOutcome)) {
            if ((optionOutcome == "Bat") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bat") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
        }
        else if (opponentCall && (opponentCall != tossOutcome)) {
            if ((optionOutcome == "Bat") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bat") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId == homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
            }
            else if ((optionOutcome == "Bowl") && (userTeamId != homeTeamId)) {
                fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].name} opt to ${optionOutcome}`;
                handleMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
            }
        }
        localStorage.setItem("fixture", JSON.stringify(fixture));
        const temporaryKeyData = ['opponentCall', 'optionOutcome', 'tossOutcome', 'userCall'];
        temporaryKeyData.forEach((k) => (localStorage.removeItem(k)));
        navigate(`/match/${matchId}`);
    }
    return (
        <>
            {(matchId >= 1 && matchId <= 74) ? <>
                <div className="row sticky-top shadow">
                    <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">Toss - {(matchId == 71) ? "Qualifier 1" : (matchId == 72) ? "Eliminator" : (matchId == 73) ? "Qualifier 2" : (matchId == 74) ? "Final" : `Match #${matchId}`}</p>
                </div>
                {(!status) ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a team.</div> :
                    (fixture && fixture[matchId - 1].tossStatus == "Completed") ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-green my-2">Toss Completed</div> :
                        (fixture && fixture[matchId - 2].matchStatus != "Completed") ? <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Previous Match not Completed</div> :
                            <div>
                                {(userTeamId == homeTeamId) ?
                                    <div>
                                        <button onClick={(!flipped) ? handleFlip : undefined}>{(!flipped) ? "Flip" : "Flipped"}</button>
                                        {(flipped) && <p>{teams && teams[fixture[matchId - 1].awayTeamId - 1].name} ask for {opponentCall}</p>}
                                        {(flipped) && <p>It's {tossOutcome}</p>}
                                        {(flipped) ? (opponentCall == tossOutcome) ? <p>{teams && teams[fixture[matchId - 1].awayTeamId - 1].name} opt to {optionOutcome}</p> :
                                            <div>
                                                <p>{teams && teams[fixture[matchId - 1].homeTeamId - 1].name} won the toss</p>
                                                <button value="Bat" onClick={handleOptionChange}>Bat</button>
                                                <button value="Bowl" onClick={handleOptionChange}>Bowl</button>
                                            </div> : <></>}
                                        {optionOutcome ? <button onClick={handleMatch}>Next</button> : <></>}
                                    </div> :
                                    <div>
                                        <p>{(!flipped) ? "Flipping..." : "Flipped"}</p>
                                        <div>
                                            <button className={userCall == "Heads" ? 'border border-5 border-dark btn fw-semibold fs-5 btn-green' : 'btn fw-semibold fs-5 btn-green border border-5 border-light'} value="Heads" onClick={(!flipped) ? handleTossCallSelect : undefined}>Heads</button>
                                            <button className={userCall == "Tails" ? 'border border-5 border-dark btn fw-semibold fs-5 btn-green' : 'btn fw-semibold fs-5 btn-green border border-5 border-light'} value="Tails" onClick={(!flipped) ? handleTossCallSelect : undefined}>Tails</button>
                                        </div>
                                        {(flipped) && <p>It's {tossOutcome}</p>}
                                        {(flipped) ? (userCall != tossOutcome) ? <p>{teams && teams[fixture[matchId - 1].homeTeamId - 1].name} opt to {optionOutcome}</p> :
                                            <div>
                                                <p>{teams && teams[fixture[matchId - 1].awayTeamId - 1].name} won the toss</p>
                                                <button className={optionOutcome == "Bat" ? 'border border-5 border-dark btn fw-semibold fs-5 btn-green' : 'btn fw-semibold fs-5 btn-green border border-5 border-light'} value="Bat" onClick={handleOptionChange}>Bat</button>
                                                <button className={optionOutcome == "Bowl" ? 'border border-5 border-dark btn fw-semibold fs-5 btn-green' : 'btn fw-semibold fs-5 btn-green border border-5 border-light'} value="Bowl" onClick={handleOptionChange}>Bowl</button>
                                            </div> : <></>}
                                        {(optionOutcome) && <button onClick={handleMatch}>Next</button>}
                                    </div>}
                            </div>}</> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">Error 404 - Page not Found!</div>}
        </>
    );
}
export default Toss;