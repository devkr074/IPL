import { useState, useEffect } from 'react';
import style from "./PointsTable.module.css"
function PointsTable() {
    const [pointsTable, setPointsTable] = useState([]);
    const [team, setTeam] = useState([]);
    useEffect(() => {
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const team = JSON.parse(localStorage.getItem("team"));
        pointsTable.sort((a, b) => a.points == b.points ? b.netRunRate - a.netRunRate : b.points - a.points);
        setPointsTable(pointsTable);
        setTeam(team);
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className={style.containerHeader}>
                    <p>IPL 2025 - Points Table</p>
                </div>
                <div className={style.containerContent}>
                    <div className={style.section}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>P</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>NR</th>
                                    <th>PTS</th>
                                    <th>NRR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointsTable.map((teamData, index) =>
                                    <tr key={teamData.teamId}>
                                        <td><span>{index + 1}</span><img height={30} src={team[teamData.teamId - 1].logo} alt={team[teamData.teamId - 1].name} title={team[teamData.teamId - 1].name} /><span>{team[teamData.teamId - 1].teamShortName}</span></td>
                                        <td><span>{teamData.matchesPlayed}</span></td>
                                        <td><span>{teamData.matchesWon}</span></td>
                                        <td><span>{teamData.matchesLost}</span></td>
                                        <td><span>{teamData.matchesTied}</span></td>
                                        <td><span>{teamData.points}</span></td>
                                        <td><span>{(teamData.netRunRate > 0) ? "+" + teamData.netRunRate.toFixed(3) : teamData.netRunRate.toFixed(3)}</span></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PointsTable;