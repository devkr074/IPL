import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleTossCall from "../utils/handleTossCall.js";
import handleTossOutcome from "../utils/handleTossOutcome.js"
import handleOptionOutcome from "../utils/handleOptionOutcome.js"
import handleMatchData from "../utils/handleMatchData.js";
function Toss() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState();
    const [teams, setTeams] = useState();
    const [userTeamId, setUserTeamId] = useState();
    const [homeTeamId, setHomeTeamId] = useState();
    const [userCall, setUserCall] = useState();
    const [opponentCall, setOpponentCall] = useState();
    const [tossOutcome, setTossOutcome] = useState();
    const [tossResult, setTossResult] = useState();
    const [optionOutcome, setOptionOutcome] = useState();
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const tossOutcome = localStorage.getItem("tossOutcome");
        const tossResult = localStorage.getItem("tossResult");
        const optionOutcome = localStorage.getItem("optionOutcome");
        const teams = JSON.parse(localStorage.getItem("teams"));
        setTeams(teams);
        setFixture(fixture);
        setTossResult(tossResult);
        setUserTeamId(userTeamId);
        setHomeTeamId(fixture[matchId - 1].homeTeamId);
        setTossOutcome(tossOutcome);
        setOptionOutcome(optionOutcome);
        const opponentCall = localStorage.getItem("opponentCall");
        if (opponentCall) {
            setOpponentCall(opponentCall);
            setFlipped(true);
        }
        const userCall = localStorage.getItem("userCall");
        if (userCall) {
            setUserCall(userCall);
            setFlipped(true);
        }
    }, []);
    const navigate = useNavigate();
    function handleMatch() {
        // const keysToRemove = ['opt', 'call', 'result', 'won'];
        //             keysToRemove.forEach(key => {
        //                 localStorage.removeItem(key);
        //             });
        //             navigate(`/match/${matchId}`);
    }
    function handleFlip(e) {
        e.target.textContent = "Flipping...";
        setTimeout(() => {
            e.target.textContent = "Flipped";
            const opponentCall = handleTossCall();
            localStorage.setItem("opponentCall", opponentCall);
            setOpponentCall(opponentCall);
            setFlipped(true);
            const tossOutcome = handleTossOutcome();
            localStorage.setItem("tossOutcome", tossOutcome);
            setTossOutcome(tossOutcome);
            if (tossOutcome == opponentCall) {
                const optionOutcome = handleOptionOutcome();
                localStorage.setItem("optionOutcome", optionOutcome);
                setOptionOutcome(optionOutcome);
                let tossResult;
                if (optionOutcome == "Bat") {
                    tossResult = "Opponent opt to Bat";
                }
                else {
                    tossResult = "Opponent opt to Ball";
                }
                localStorage.setItem("tossResult", tossResult);
                setTossResult(tossResult);
            }
        }, 1000);
    }
    function handleOptionChange(e) {
        const optionOutcome = `${e.target.value}`;
        localStorage.setItem("optionOutcome", optionOutcome);
        setOptionOutcome(optionOutcome);
    }
    function handleTossCallChange(e) {
        const userCall = e.target.value;
        localStorage.setItem("userCall", userCall);
        setUserCall(userCall);
        setFlipped(true);
        const tossOutcome = handleTossOutcome();
        localStorage.setItem("tossOutcome", tossOutcome);
        setTossOutcome(tossOutcome);
        if (tossOutcome != userCall) {
            const optionOutcome = handleOptionOutcome();
            localStorage.setItem("optionOutcome", optionOutcome);
            setOptionOutcome(optionOutcome);
            let tossResult;
            if (optionOutcome == "Bat") {
                tossResult = "Opponent opt to Bat";
            }
            else {
                tossResult = "Opponent opt to Ball";
            }
            localStorage.setItem("tossResult", tossResult);
            setTossResult(tossResult);
        }
    }
    return (
        <>
            <div>
                <p>{matchId == 71 ? "Qualifier 1" : matchId == 72 ? "Eliminator" : matchId == 73 ? "Qualifier 2" : matchId == 74 ? "Final" : "Match #" + matchId}: {teams && teams[fixture[matchId - 1].homeTeamId - 1].shortName} vs {teams && teams[fixture[matchId - 1].awayTeamId - 1].shortName}</p>
            </div>
            {(userTeamId == homeTeamId) ?
                <div>
                    <button onClick={(!flipped) ? handleFlip : undefined}>{(!flipped) ? "Flip" : "Flipped"}</button>
                    {flipped ? <p>{fixture && teams[fixture[matchId - 1].awayTeamId - 1].name} ask for {opponentCall}</p> : <p></p>}
                    {flipped && <p>It's {tossOutcome}</p>}
                    {flipped ? (tossResult) ? <p>Toss Result: {tossResult}</p> :
                        <>
                            <p>You won the toss</p>
                            <button value="Bat" onClick={handleOptionChange}>Bat</button>
                            <button value="Ball" onClick={handleOptionChange}>Ball</button>
                        </> : <></>}
                    {optionOutcome ? <button>Next</button> : <></>}
                </div> :
                <div>
                    <p>{(!flipped) ? "Flipping..." : "Flipped"}</p>
                    <>
                        <button value="Heads" onClick={(!flipped) ? handleTossCallChange : undefined}>Heads</button>
                        <button value="Tails" onClick={(!flipped) ? handleTossCallChange : undefined}>Tails</button>
                    </>
                    {flipped && <p>TO: {tossOutcome}</p>}
                    {(flipped) ? (tossOutcome == userCall) ?
                        <div>
                            <p>You won the toss</p>
                            <button value="Bat" onClick={handleOptionChange}>Bat</button>
                            <button value="Ball" onClick={handleOptionChange}>Ball</button>
                        </div> : <p>Opponent opt to {optionOutcome}</p> : <></>}
                    {optionOutcome ? <button>Next</button> : <></>}
                </div>}
        </>
    );
}
export default Toss;