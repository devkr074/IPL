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
    useEffect(() => {
        document.title = "IPL - Toss";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const tossOutcome = localStorage.getItem("tossOutcome");
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const optionOutcome = localStorage.getItem("optionOutcome");
        setFixture(fixture);
        setHomeTeamId(fixture[matchId - 1].homeTeamId);
        setTeams(teams);
        setTossOutcome(tossOutcome);
        setUserTeamId(userTeamId);
        setOptionOutcome(optionOutcome);
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
            <div className="row bg-green border-bottom sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center p-2 m-0">{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}: Toss</p>
            </div>
            <div className="row">
                {(userTeamId == homeTeamId) ?
                    <div>
                        <button className="btn-green" onClick={(!flipped) ? handleFlip : undefined}>{(!flipped) ? "Flip" : "Flipped"}</button>
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
                    <div className="col-12">
                        <p className="col-12 fs-5 fw-semibold text-center py-1 m-0">{(!flipped) ? "Coin Flipping..." : "Flipped"}</p>
                        <div className="col-12 text-center py-3">
                            <button value="Heads" className="btn-green fs-5 fw-semibold px-2 py-1 me-3" onClick={(!flipped) ? handleTossCallSelect : undefined}>H</button>
                            <button value="Tails" className="btn px-2 fs fw-semibold hover rounded-circle" onClick={(!flipped) ? handleTossCallSelect : undefined}>T</button>
                        </div>
                        {(flipped) && <p className="col-12 fs-5 fw-semibold text-center py-1 m-0">It's {tossOutcome}</p>}
                        {(flipped) ? (userCall != tossOutcome) ? <p className="col-12 fs-5 fw-semibold text-center py-1 m-0">{teams && teams[fixture[matchId - 1].homeTeamId - 1].name} opt to {optionOutcome}</p> :
                            <div>
                                <p className="col-12 fw-semibold text-center py-1 m-0">{teams && teams[fixture[matchId - 1].awayTeamId - 1].name} won the toss</p>
                                <div className="col-12 text-center py-3">
                                    <button value="Bat" className="btn-green s-25 fs-5 fw-semibold px-2 py-1 me-3" onClick={handleOptionChange}><img src="https://www.iplt20.com/assets/images/teams-batsman-icon.svg" height={40} alt="" /></button>
                                    <button value="Bowl" className="btn-green fs-5 fw-semibold px-2 py-1" onClick={handleOptionChange}>Bowl</button>
                                </div>
                            </div> : <></>}
                        {(optionOutcome) && <button onClick={handleMatch}>Next</button>}
                    </div>}
            </div>
        </>
    );
}
export default Toss;