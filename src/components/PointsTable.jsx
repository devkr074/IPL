import { useState, useEffect } from 'react';
function PointsTable() {
    const [pointsTable, setPointsTable] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Points Table";
        const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        pointsTable.sort((a, b) => ((a.points == b.points) ? (b.netRunRate - a.netRunRate) : (b.points - a.points)));
        setPointsTable(pointsTable);
        setTeams(teams);
    }, []);
    return (
        <>
            <div className="row sticky-top shadow">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Points Table</p>
            </div>
            <div className='row'>
                <table>
                    <thead className='bg-gray'>
                        <tr className='bg-gray'>
                            <th className='bg-gray py-2 px-2'>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>L</th>
                            <th>T</th>
                            <th className='col-1 px-1 text-center'>PTS</th>
                            <th className='col-1 px-1 text-center'>NRR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pointsTable && pointsTable.map((t) => (
                            <tr key={t.teamId}>
                                <td className='col-6 px-1 py-2'><img className='col-2 me-1' src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} />{teams[t.teamId - 1].shortName}</td>
                                <td className='col-1 px-1 py-2'>{t.played}</td>
                                <td className='col-1'>{t.won}</td>
                                <td className='col-1'>{t.lost}</td>
                                <td className='col-1'>{t.tied}</td>
                                <th className='col-1 px-1 text-center'>{t.points}</th>
                                <td className='col-1 px-1 text-center'>{(t.netRunRate > 0) ? ("+" + t.netRunRate.toFixed(3)) : (t.netRunRate.toFixed(3))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default PointsTable;