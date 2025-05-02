import { useState, useEffect } from "react";
function PointsTable() {
    const [status, setStatus] = useState();
    const [pointsTable, setPointsTable] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Points Table";
        setStatus(localStorage.getItem("status"));
        setPointsTable(JSON.parse(localStorage.getItem("pointsTable")));
        setTeams(JSON.parse(localStorage.getItem("teams")));
    }, []);
    return (
        <>
            <div className="row border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Points Table</p>
            </div>
            {(status) ?
                <div className="row">
                    <div className="row fs-8 fw-bold bg-gray px-0 py-1 m-0">
                        <p className="col-3 m-0">Teams</p>
                        <div className="col-9 d-flex">
                            <p className="col-2 text-center m-0">P</p>
                            <p className="col-2 text-center m-0">W</p>
                            <p className="col-2 text-center m-0">L</p>
                            <p className="col-2 text-center m-0">T</p>
                            <p className="col-2 text-center m-0">PTS</p>
                            <p className="col-2 text-end m-0">NRR</p>
                        </div>
                    </div>
                    {(pointsTable) && pointsTable.map((t) => (
                        <div key={t.teamId} className="row fs-8 border-bottom px-0 py-1 m-0">
                            <p className="col-3 d-flex align-items-center fw-semibold text-truncate m-0"><img src={teams[t.teamId - 1].logo} alt={teams[t.teamId - 1].name} className="img" />{teams[t.teamId - 1].shortName}</p>
                            <div className="col-9 d-flex align-items-center">
                                <p className="col-2 text-center m-0">{t.played}</p>
                                <p className="col-2 text-center m-0">{t.won}</p>
                                <p className="col-2 text-center m-0">{t.lost}</p>
                                <p className="col-2 text-center m-0">{t.tied}</p>
                                <p className="col-2 fw-bold text-center m-0">{t.points}</p>
                                <p className="col-2 text-end m-0">{(t.netRunRate > 0) ? `+${t.netRunRate.toFixed(3)}` : `${t.netRunRate.toFixed(3)}`}</p>
                            </div>
                        </div>
                    ))}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default PointsTable;