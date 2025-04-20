import style from "./Match.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Match() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState([]);
    const [fixture, setFixture] = useState([]);
    const [teams, setTeams] = useState([]);
    const [squad, setSquad] = useState([]);
    useEffect(() => {
        const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
        const teams = JSON.parse(localStorage.getItem("teams"));
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const squad = JSON.parse(localStorage.getItem("squad"));
        setTeams(teams);
        setMatchData(matchData);
        setFixture(fixture);
        setSquad(squad);
        document.title = `Match ${matchId}`;
    }, []);
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <p>Match {matchId}: {teams[fixture[matchId - 1]?.homeTeamId - 1]?.shortName} vs {teams[fixture[matchId - 1]?.awayTeamId - 1]?.shortName}</p>
            </div>
            <div className={style.containerContent}>
                <h2>{teams[matchData?.inning1?.teamId - 1]?.shortName} {matchData?.inning1?.runs}{(matchData?.inning1?.wickets != 10) && -matchData?.inning1?.wickets}</h2>
                <h2>{teams[matchData?.inning2?.teamId - 1]?.shortName} {matchData?.inning2?.runs}{(matchData?.inning2?.wickets != 10) && -matchData?.inning2?.wickets}</h2>
                <h3> <img src={squad[fixture[matchId - 1]?.playerOfTheMatch - 1]?.profile} height={60} style={{ borderRadius: "50%" }} alt="" />{squad[fixture[matchId - 1]?.playerOfTheMatch - 1]?.name}</h3>
                {/* <div>
                    <h1>Commentary</h1>
                    {matchData.commentary?.slice()?.reverse()?.map((c) => {
                        return (
                            <>
                                <p>{Math.floor(c.ball / 6) + "." + (c.ball % 6)} {(c.outcome == "SIX") ? <div style={{ background: "#0a858e", height: "30px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: "30px", color: "#fff", fontWeight: "bold" }}>6</div> : (c.outcome == "FOUR") ? <div style={{ background:"rgb(187, 110, 235)", height: "30px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: "30px", color: "#fff", fontWeight: "bold" }}>4</div>:(c.outcome=="OUT")?<div style={{background:"red",height:"30px",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",width:"30px",color:"#fff",fontWeight: "bold"}}>W</div>:""} {c.bowler} to {c.batsman}, <b>{c.outcome}</b>, {c.comment}</p>
                            </>
                        )
                    })}
                </div> */}
                <div>
                    <h2>{teams[matchData?.inning1?.teamId - 1]?.shortName} {matchData?.inning1?.runs}-{matchData?.inning1?.wickets} ({Math.floor(matchData?.inning1?.balls / 6)}{((matchData?.inning1?.balls % 6 > 0) ? matchData?.inning1?.balls % 6 : "")})</h2>
                    <h1>Batsman</h1>
                    {(matchData.inning1Batsman?.filter((b) => b.didNotBat == false)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | <b>{b.runs}</b> | {b.balls} | {b.fours} | {b.sixes} | {Math.floor(b.runs / b.balls * 100).toFixed(2)} |</p>
                                <p>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1]?.name) + ")"}</p>
                            </>
                        )
                    }))}
                    <span>Did not Bat: </span>
                    {(matchData.inning1Batsman?.filter((b) => b.didNotBat == true)?.map((b) => {
                        return (
                            <>
                                <span>{squad[b?.playerId - 1]?.name}, </span>
                            </>
                        )
                    }))}
                    <p>Extras: {matchData.inning1?.extras} w {matchData.inning1?.wides} nb {matchData.inning1?.noBalls} lb {matchData.inning1?.legByes} b {matchData.inning1?.byes}</p>
                </div>
                <div>
                    <h2>{teams[matchData?.inning2?.teamId - 1]?.shortName} {matchData?.inning2?.runs}-{matchData?.inning2?.wickets} ({Math.floor(matchData?.inning2?.balls / 6)}{((matchData?.inning2?.balls % 6 > 0) ? matchData?.inning2?.balls % 6 : "")})</h2>
                    <h1>Batsman</h1>
                    {(matchData.inning2Batsman?.filter((b) => b.didNotBat == false)?.map((b) => {
                        return (
                            <>
                                <p>{squad[b?.playerId - 1]?.name} | <b>{b.runs}</b> | {b.balls} | {b.fours} | {b.sixes} | {Math.floor(b.runs / b.balls * 100).toFixed(2)} |</p>
                                <p>{(b.notOut == true) ? "not out" : (b.wicketTypeId == 1) ? "c " + (squad[b.caughtById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 2) ? "lbw " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 3) ? "b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 4) ? "st " + (squad[b.stumpedById - 1]?.name) + " b " + (squad[b.wicketById - 1]?.name) : (b.wicketTypeId == 5) && "run out (" + (squad[b.runOutById - 1]?.name) + ")"}</p>
                            </>
                        )
                    }))}
                    <span>Did not Bat: </span>
                    {(matchData.inning2Batsman?.filter((b) => b.didNotBat == true)?.map((b) => {
                        return (
                            <>
                                <span>{squad[b?.playerId - 1]?.name}, </span>
                            </>
                        )
                    }))}
                    <p>Extras: {matchData.inning2?.extras} w {matchData.inning2?.wides} nb {matchData.inning2?.noBalls} lb {matchData.inning2?.legByes} b {matchData.inning2?.byes}</p>
                
                </div>
            </div>
        </div>
    );
}

export default Match;