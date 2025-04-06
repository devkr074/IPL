import { useState, useEffect } from 'react';
import style from './PointsTable.module.css';
function PointsTable() {
    const [pointsTable, setPointsTable] = useState([]);
    const [team, setTeam] = useState([]);
    useEffect(() => {
        document.title = "IPL - Points Table";
        const pointsTable = JSON.parse(localStorage.getItem('pointsTable'));
        const team = JSON.parse(localStorage.getItem('team'));
        setPointsTable(pointsTable);
        setTeam(team);
        const sortedData = sortData(pointsTable, 'points', 'netRunRate');
        console.log(sortedData);
    }, []);
    function sortData(arr, primaryKey, secondaryKey) {
        return arr.sort((a, b) => {
            if (a[primaryKey] === b[primaryKey]) {
                return b[secondaryKey] - a[secondaryKey];
            }
            return b[primaryKey] - a[primaryKey];
        });
    }
    return (
        <h2>PointsTable</h2>
    );
}
export default PointsTable;