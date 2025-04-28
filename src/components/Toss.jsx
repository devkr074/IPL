import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleTossCall from "../utils/handleTossCall.js";
import handleMatchData from "../utils/handleMatchData.js";

function Toss() {
    const { matchId } = useParams();
    const [fixture, setFixture] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [homeTeamId, setHomeTeamId] = useState(null);
    const [awayTeamId, setAwayTeamId] = useState(null);
    const [tossCallByUser, setTossCallByUser] = useState(localStorage.getItem("tossCallByUser") || null);
    const [opponentCall, setOpponentCall] = useState(localStorage.getItem("opponentCall") || null);
    const [tossResult, setTossResult] = useState(localStorage.getItem("tossResult") || null);
    const [userWonToss, setUserWonToss] = useState(localStorage.getItem("userWonToss") === "true" || null);
    const [userChoice, setUserChoice] = useState(localStorage.getItem("userChoice") || null);
    const [opponentChoice, setOpponentChoice] = useState(localStorage.getItem("opponentChoice") || null);
    const [isUserFlipping, setIsUserFlipping] = useState(false);
    const [canNavigate, setCanNavigate] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedFixture = localStorage.getItem("fixture");
        const storedUserTeamId = localStorage.getItem("userTeamId");

        if (storedFixture) {
            setFixture(JSON.parse(storedFixture));
        }
        if (storedUserTeamId) {
            setUserTeamId(Number(storedUserTeamId));
        }
    }, []);

    useEffect(() => {
        if (fixture && matchId) {
            const currentMatch = fixture[Number(matchId) - 1];
            setHomeTeamId(currentMatch?.homeTeamId);
            setAwayTeamId(currentMatch?.awayTeamId);
        }
    }, [fixture, matchId]);

    useEffect(() => {
        if (tossResult && tossCallByUser && opponentCall) {
            const didUserWin = tossResult === tossCallByUser;
            setUserWonToss(didUserWin);
            localStorage.setItem("userWonToss", didUserWin);
        }
    }, [tossResult, tossCallByUser, opponentCall]);

    useEffect(() => {
        if (
            (userTeamId === homeTeamId && tossResult && opponentCall && ((userWonToss !== null && userWonToss && userChoice) || (userWonToss !== null && !userWonToss && opponentChoice))) ||
            (userTeamId === awayTeamId && tossCallByUser && tossResult && ((userWonToss !== null && userWonToss && userChoice) || (userWonToss !== null && !userWonToss && opponentChoice)))
        ) {
            setCanNavigate(true);
        } else {
            setCanNavigate(false);
        }
    }, [userTeamId, homeTeamId, awayTeamId, tossResult, opponentCall, tossCallByUser, userWonToss, userChoice, opponentChoice]);

    const handleTossFlip = () => {
        setIsUserFlipping(true);
        setTimeout(() => {
            const result = Math.random() < 0.5 ? "heads" : "tails";
            setTossResult(result);
            localStorage.setItem("tossResult", result);
            setIsUserFlipping(false);
        }, 1000);
    };

    const handleOpponentCall = () => {
        if (!opponentCall) {
            const call = handleTossCall();
            setOpponentCall(call);
            localStorage.setItem("opponentCall", call);
        }
    };

    const handleUserCall = (call) => {
        if (!tossCallByUser) {
            setTossCallByUser(call);
            localStorage.setItem("tossCallByUser", call);
        }
    };

    const handleUserChoiceSelection = (choice) => {
        if (userWonToss && !userChoice) {
            setUserChoice(choice);
            localStorage.setItem("userChoice", choice);
        }
    };

    const handleOpponentChoiceSelection = (choice) => {
        if (!userWonToss && !opponentChoice) {
            setOpponentChoice(choice);
            localStorage.setItem("opponentChoice", choice);
        }
    };

    const handleNavigateToMatch = () => {
        if (canNavigate) {
            handleMatchData(homeTeamId, awayTeamId, fixture[Number(matchId) - 1]);
            navigate(`/match/${matchId}`);
        } else {
            alert("Toss and choice selection not completed yet.");
        }
    };

    return (
        <>
            {userTeamId === homeTeamId ? (
                <div>
                    <h2>Toss</h2>
                    {!tossResult ? (
                        <button onClick={handleTossFlip} disabled={isUserFlipping}>
                            {isUserFlipping ? "Flipping..." : "Flip Coin"}
                        </button>
                    ) : (
                        <p>Coin landed on: {tossResult}</p>
                    )}

                    {!opponentCall && tossResult && (
                        <>
                            <p>Opponent is calling...</p>
                            <button onClick={handleOpponentCall}>Wait for Opponent's Call</button>
                        </>
                    )}

                    {opponentCall && <p>Opponent called: {opponentCall}</p>}

                    {tossResult && opponentCall && userWonToss === null && (
                        <p>Determining winner...</p>
                    )}

                    {userWonToss !== null && (
                        <div>
                            <p>You {userWonToss ? "won" : "lost"} the toss.</p>
                            {userWonToss ? (
                                !userChoice ? (
                                    <div>
                                        <p>Choose what to do:</p>
                                        <button onClick={() => handleUserChoiceSelection("bat")}>Bat</button>
                                        <button onClick={() => handleUserChoiceSelection("bowl")}>Bowl</button>
                                    </div>
                                ) : (
                                    <p>You chose to: {userChoice}</p>
                                )
                            ) : (
                                !opponentChoice ? (
                                    <p>Waiting for opponent to choose...</p>
                                ) : (
                                    <p>Opponent chose to: {opponentChoice}</p>
                                )
                            )}
                        </div>
                    )}

                    {canNavigate && (
                        <button onClick={handleNavigateToMatch}>Next</button>
                    )}
                </div>
            ) : userTeamId === awayTeamId ? (
                <div>
                    <h2>Toss</h2>
                    {!tossCallByUser ? (
                        <div>
                            <p>Call the toss:</p>
                            <button onClick={() => handleUserCall("heads")}>Heads</button>
                            <button onClick={() => handleUserCall("tails")}>Tails</button>
                        </div>
                    ) : (
                        <p>You called: {tossCallByUser}</p>
                    )}

                    {tossResult && <p>Coin landed on: {tossResult}</p>}

                    {tossCallByUser && tossResult && userWonToss === null && (
                        <p>Determining winner...</p>
                    )}

                    {userWonToss !== null && (
                        <div>
                            <p>You {userWonToss ? "won" : "lost"} the toss.</p>
                            {userWonToss ? (
                                !userChoice ? (
                                    <div>
                                        <p>Choose what to do:</p>
                                        <button onClick={() => handleUserChoiceSelection("bat")}>Bat</button>
                                        <button onClick={() => handleUserChoiceSelection("bowl")}>Bowl</button>
                                    </div>
                                ) : (
                                    <p>You chose to: {userChoice}</p>
                                )
                            ) : (
                                !opponentChoice ? (
                                    <p>Opponent will choose...</p>
                                ) : (
                                    <p>Opponent chose to: {opponentChoice}</p>
                                )
                            )}
                        </div>
                    )}

                    {canNavigate && (
                        <button onClick={handleNavigateToMatch}>Next</button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Toss;

// const keysToRemove = ['opt', 'call', 'result', 'won'];
//             keysToRemove.forEach(key => {
//                 localStorage.removeItem(key);
//             });
//             navigate(`/match/${matchId}`);