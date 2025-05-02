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
            <div className='row p-0'>
                <div className="row m-0 p-0 py-2 px-2 fw-bold bg-gray">
                    <p className='col-3 m-0 p-0 fs-7'>Team</p>
                    <div className="col-9 m-0 p-0 d-flex fs-7">
                        <p className='col-2 text-center m-0 p-0'>P</p>
                        <p className='col-2 text-center m-0 p-0'>W</p>
                        <p className='col-2 text-center m-0 p-0'>L</p>
                        <p className='col-2 text-center m-0 p-0'>T</p>
                        <p className='col-2 text-center m-0 p-0'>PTS</p>
                        <p className='col-2 text-center m-0 p-0'>NRR</p>
                    </div>
                </div>
                {pointsTable && pointsTable.map((t) => (
                    <div className="row m-0 p-0 py-2 px-2 border-bottom border-2">
                        <p className='col-3 fw-semibold m-0 p-0 text-truncate fs-7 d-flex align-items-center'><img className='me-1' style={{ height: "2rem" }} src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} />{teams[t.teamId - 1].shortName}</p>
                        <div className="col-9 m-0 p-0 d-flex align-items-center">
                            <p className='col-2 p-0 text-center m-0'>{t.played}</p>
                            <p className='col-2 p-0 text-center m-0'>{t.won}</p>
                            <p className='col-2 p-0 text-center m-0'>{t.lost}</p>
                            <p className='col-2 p-0 text-center m-0'>{t.tied}</p>
                            <p className='col-2 p-0 text-center m-0 fw-bold'>{t.points}</p>
                            <p className='col-2 p-0 text-center m-0'>{(t.netRunRate > 0) ? ("+" + t.netRunRate.toFixed(3)) : (t.netRunRate.toFixed(3))}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default PointsTable;