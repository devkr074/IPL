import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleTossCall from "../utils/handleTossCall.js";
import handleMatchData from "../utils/handleMatchData.js";
function Toss() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState();
    const [userTeamId, setUserTeamId] = useState();
    const [homeTeamId, setHomeTeamId] = useState();
    const [userCall, setUserCall] = useState();
    const [opponentCall, setOpponentCall] = useState();
    const [tossResult, setTossResult] = useState();
    const [option, setOption] = useState();
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const tossResult = localStorage.getItem("tossResult") || null;
        const option = localStorage.getItem("option") || null;
        setFixture(fixture);
        setUserTeamId(userTeamId);
        setHomeTeamId(fixture[matchId - 1].homeTeamId);
        setTossResult(tossResult);
        setOption(option);
        const opponentCall = localStorage.getItem("opponentCall") || null;
        setOpponentCall(opponentCall);
        const userCall = localStorage.getItem("userCall") || null;
        setUserCall(userCall);
    }, []);
    const navigate = useNavigate();
    function getOpponentCall() {
        const call = handleTossCall();
        localStorage.setItem("opponentCall", call);
        setOpponentCall(call);
        return call;
    }
    return (
        <>
            {(userTeamId == homeTeamId) ?
                <div>
                    <p>You are Flipping Coin...</p>
                    <p>Opponent Call: {(opponentCall == null) ? getOpponentCall() : (opponentCall)}</p>
                </div> : <p>Calling</p>}
        </>
    );
}
export default Toss;

// const keysToRemove = ['opt', 'call', 'result', 'won'];
//             keysToRemove.forEach(key => {
//                 localStorage.removeItem(key);
//             });
//             navigate(`/match/${matchId}`);