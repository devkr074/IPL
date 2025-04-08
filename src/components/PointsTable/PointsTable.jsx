import { useState, useEffect } from 'react';
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
            {pointsTable.map((teamData) => <img key={teamData.teamId} src={team[teamData.teamId - 1].logo} alt={team[teamData.teamId - 1].name} title={team[teamData.teamId - 1].name} />)}
        </>
    );
}
export default PointsTable;