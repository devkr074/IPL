import { useState, useEffect } from 'react';
import style from './PointsTable.module.css';
function PointsTable() {
    const [pointsTable, setPointsTable] = useState([]);
    const [teams, setTeam] = useState([]);
    useEffect(() => {
        document.title = "IPL - Points Table";
        const pointsData = JSON.parse(localStorage.getItem('pointsTable')) || [];
        const team = JSON.parse(localStorage.getItem('team')) || [];
        setPointsTable(pointsData);
        setTeam(team);
    }, []);
    return (
        <div className={style.container}>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {pointsTable.map((team) => {
                        const teamName = teams[team.teamId - 1].teamName;
                        const teamShortName = teams[team.teamId - 1].teamShortName;
                        const teamLogo = teams[team.teamId - 1].logo;
                        return (
                            <tr key={team.teamId}>
                                <td></td>
                                <td>
                                    <span>{teamShortName}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default PointsTable;