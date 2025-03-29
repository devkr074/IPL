import { useState, useEffect } from 'react';
import style from './PointsTable.module.css';

function PointsTable() {
    const [pointsTable, setPointsTable] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        document.title = "IPL - Points Table";
        const pointsData = JSON.parse(localStorage.getItem('pointsTable')) || [];
        const teamData = JSON.parse(localStorage.getItem('team')) || [];
        setPointsTable(pointsData);
        setTeams(teamData);
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
                        const teamInfo = teams.find(t => t.teamId === team.teamId) || {};
                        return (
                            <tr key={team.teamId}>
                                <td>{team.position}</td>
                                <td className={style.teamCell}>
                                    {teamInfo.logo && <img src={teamInfo.logo} alt={teamInfo.teamName} height={50} className={style.teamLogo} />}
                                    <span>{teamInfo.teamShortName || team.teamShortName}</span>
                                </td>
                                <td>{team.matchesPlayed}</td>
                                <td>{team.matchesWon}</td>
                                <td>{team.matchesLost}</td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PointsTable;