import { useState, useEffect } from 'react';
import style from "./Fixture.module.css"
function Fixture() {
    const [fixture, setFixture] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Fixture";
        const fixture = JSON.parse(localStorage.getItem("fixture"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        setFixture(fixture);
        setTeams(teams);
    }, []);
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <p>IPL - Fixture</p>
            </div>
            <div className={style.containerContent}>
                {fixture && fixture.map((m) => {
                    return (
                        <div className={style.card}>
                            <div className={style.teamContainer}>
                                <div className={style.homeTeamContainer}>
                                    <img src={teams[m.homeTeamId - 1].logo} alt="" />
                                    <p>{teams[m.homeTeamId - 1].name}</p>
                                </div>
                                <div className={style.awayTeamContainer}>
                                    <img src={teams[m.awayTeamId - 1].logo} alt="" />
                                    <p>{teams[m.awayTeamId - 1].name}</p>
                                </div>
                            </div>
                            {(m.matchStatus == "Completed") ? <p className={style.discription} title={m.matchResult}>{m.matchResult}</p> : (m.tossStatus == "Completed") ? <p className={`${style.discription} ${style.toss}`} title={m.tossResult}>{m.tossResult}</p> : <p className={`${style.discription} ${style.upcoming}`}>Upcoming</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Fixture;