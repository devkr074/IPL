import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import setMatchData from "../../utils/handleMatchData.js";
function Toss() {
    const [fixture, setFixture] = useState([]);
    const [userTeamId, setUserTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [call, setCall] = useState(null);
    const [result, setResult] = useState(null);
    const [opt, setOpt] = useState(null);
    const { matchId } = useParams();
    useEffect(() => {
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const userTeamId = Number(localStorage.getItem("userTeamId"));
        const opt = localStorage.getItem("opt");
        const call = localStorage.getItem("call");
        const result = localStorage.getItem("result");
        setFixture(fixture);
        setUserTeamId(userTeamId);
        setTeams(teams);
        setCall(call);
        setOpt(opt);
        setResult(result);
    }, []);
    const navigate = useNavigate();

    function handleCall(call) {
        setCall(call);
        localStorage.setItem("call", call);
        checkResult(call);
    }

    function checkResult(call) {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        setResult(result);
        localStorage.setItem("result", result);
        if (call != result) {
            localStorage.setItem("won", "no");
            getOpt();
        }
        else {
            localStorage.setItem("won", "yes");
        }
        fixture[matchId - 1].tossStatus = "not completed";
        localStorage.setItem("fixture", JSON.stringify(fixture));
    }

    function handleOpt(opt) {
        setOpt(opt);
        localStorage.setItem("opt", opt);
    }

    function getOpt() {
        const opt = Math.random() < 0.5 ? "Bat" : "Bowl";
        setOpt(opt);
        localStorage.setItem("opt", opt);
    }

    function handleNext() {
        if (opt == null) {
            console.log("Please Select");
        }
        else {
            fixture[matchId - 1].tossStatus = "completed";
            const won = localStorage.getItem("won");
            if (won == "yes") {
                if (fixture[matchId - 1].homeTeamId == userTeamId) {
                    if (opt == "Bat") {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].teamShortName} opt to Bat first`;
                        setMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
                    }
                    else {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].teamShortName} opt to Bowl first`;
                        setMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
                    }
                }
                else {
                    if (opt == "Bat") {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].teamShortName} opt to Bat first`;
                        setMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
                    }
                    else {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].teamShortName} opt to Bowl first`;
                        setMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
                    }
                }
            }
            else {
                if (fixture[matchId - 1].homeTeamId == userTeamId) {
                    if (opt == "Bat") {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].teamShortName} opt to Bat first`;
                        setMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
                    }
                    else {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].awayTeamId - 1].teamShortName} opt to Bowl first`;
                        setMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
                    }
                }
                else {
                    if (opt == "Bat") {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].teamShortName} opt to Bat first`;
                        setMatchData(fixture[matchId - 1].homeTeamId, fixture[matchId - 1].awayTeamId, fixture[matchId - 1]);
                    }
                    else {
                        fixture[matchId - 1].tossResult = `${teams[fixture[matchId - 1].homeTeamId - 1].teamShortName} opt to Bowl first`;
                        setMatchData(fixture[matchId - 1].awayTeamId, fixture[matchId - 1].homeTeamId, fixture[matchId - 1]);
                    }
                }

            }
            fixture[matchId - 1].matchStatus = "not completed";
            localStorage.setItem("fixture", JSON.stringify(fixture));

           
        }
        const keysToRemove = ['opt', 'call', 'result', 'won'];
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });
            navigate(`/match/${matchId}`);
    }

    return (
        <>
            {teams[fixture[matchId - 1]?.homeTeamId - 1]?.teamId === userTeamId ?
                <button >Flip</button> :

                (call == null) ?

                    <div>
                        <p>Coin Flipping...</p>
                        <button onClick={() => handleCall("Heads")}>Heads</button>
                        <button onClick={() => handleCall("Tails")}>Tails</button>
                    </div>

                    :
                    (call == result) ?
                        <div>
                            <p>You won the toss</p>
                            <button onClick={() => handleOpt("Bat")}>Bat</button>
                            <button onClick={() => handleOpt("Bowl")}>Bowl</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                        :
                        <div> <p>Opponent won the toss and elected to {opt}</p>
                            <button onClick={handleNext}>Next</button> </div>

            }
        </>
    );
}
export default Toss