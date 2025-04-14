import { useState, useEffect } from 'react';
import style from "./PointsTable.module.css"
function PointsTable() {
    const [pointsTable, setPointsTable] = useState([]);
    const [team, setTeam] = useState([]);
    useEffect(() => {
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const team = JSON.parse(localStorage.getItem("teams"));
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
                            {pointsTable.map((teamData, index) =>
                                <tr key={teamData.teamId}>
                                    <td>{team[teamData.teamId - 1].teamShortName}</td>
                                    <td>{teamData.matchesPlayed}</td>
                                    <td>{teamData.matchesWon}</td>
                                    <td>{teamData.matchesLost}</td>
                                    <td>{teamData.matchesTied}</td>
                                    <td>{teamData.points}</td>
                                    <td>{(teamData.netRunRate > 0) ? "+" + teamData.netRunRate.toFixed(3) : teamData.netRunRate.toFixed(3)}</td>
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