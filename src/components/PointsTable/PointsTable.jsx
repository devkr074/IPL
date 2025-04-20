import { useState, useEffect } from 'react';
import style from "./PointsTable.module.css"
function PointsTable() {
    const [pointsTable, setPointsTable] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Points Table";
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        pointsTable.sort((a, b) => a.points == b.points ? b.netRunRate - a.netRunRate : b.points - a.points);
        setPointsTable(pointsTable);
        setTeams(teams);
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL - Points Table</p>
                </div>
                <div className={style.containerContent}>
                    <table>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>P</th>
                                <th>W</th>
                                <th>L</th>
                                <th>T</th>
                                <th>PTS</th>
                                <th>NRR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pointsTable && pointsTable.map((t) =>
                                <tr key={t.teamId}>
                                    <td><img src={teams[t.teamId - 1].logo} height={30} alt="" /> {teams[t.teamId - 1].shortName}</td>
                                    <td>{t.played}</td>
                                    <td>{t.won}</td>
                                    <td>{t.lost}</td>
                                    <td>{t.tied}</td>
                                    <td>{t.points}</td>
                                    <td>{(t.netRunRate > 0) ? "+" + t.netRunRate.toFixed(3) : t.netRunRate.toFixed(3)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default PointsTable;