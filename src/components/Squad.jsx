import { useState, useEffect } from "react";
function Squad() {
    const [status, setStatus] = useState();
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState(0);
    useEffect(() => {
        document.title = "IPL - Squad";
        setStatus(localStorage.getItem("status"));
        setSquad(JSON.parse(localStorage.getItem("squad")));
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row bg-green border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center p-2 m-0">IPL - Squad</p>
                <div className="col-12 d-flex overflow-auto sw-none">
                    <button value={0} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 0) && "border-bottom border-4"}`} onClick={handleTabChange}>MI</button>
                    <button value={1} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 1) && "border-bottom border-4"}`} onClick={handleTabChange}>CSK</button>
                    <button value={2} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 2) && "border-bottom border-4"}`} onClick={handleTabChange}>RCB</button>
                    <button value={3} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 3) && "border-bottom border-4"}`} onClick={handleTabChange}>KKR</button>
                    <button value={4} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 4) && "border-bottom border-4"}`} onClick={handleTabChange}>DC</button>
                    <button value={5} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 5) && "border-bottom border-4"}`} onClick={handleTabChange}>PBKS</button>
                    <button value={6} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 6) && "border-bottom border-4"}`} onClick={handleTabChange}>RR</button>
                    <button value={7} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 7) && "border-bottom border-4"}`} onClick={handleTabChange}>SRH</button>
                    <button value={8} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 8) && "border-bottom border-4"}`} onClick={handleTabChange}>LSG</button>
                    <button value={9} className={`btn mw-c fw-semibold text-light border-0 rounded-0 ${(tab == 9) && "border-bottom border-4"}`} onClick={handleTabChange}>GT</button>
                </div>
            </div>
            {(status) ?
                <div className="row">
                    <p className="fs-5 fw-bold m-0 py-1">Batsman</p>
                    {(squad) && squad.filter((p) => (((p.playerId) >= (tab * 11 + 1)) && ((p.playerId) <= (tab * 11 + 11)) && (p.roleId == 1))).map((p) => (
                        <div key={p.playerId} className="col-6 col-md-4 col-lg-4 p-0 p-1">
                            <div className="card">
                                <img src={p.profile} alt={p.name} title={p.name} className="card-img-top" />
                                <div className="card-body border-top border-2 py-2">
                                    <p className="card-title fw-semibold text-center text-truncate m-0">{p.name}</p>
                                    {(p.captain && p.foreigner) ? <div className="m-2 position-absolute top-0 start-0"><img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="me-1" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" /></div> : ((p.captain) ? <img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="m-2 position-absolute top-0 start-0" /> : ((p.foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" className="m-2 position-absolute top-0 start-0" />))}
                                    {(p.wicketKeeper) && <img src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="Wicket Keeper Icon" className="m-2 position-absolute top-0 end-0" />}
                                </div>
                            </div>
                        </div>))}
                    <p className="fs-5 fw-bold m-0 py-1">All Rounder</p>
                    {(squad) && squad.filter((p) => (((p.playerId) >= (tab * 11 + 1)) && ((p.playerId) <= (tab * 11 + 11)) && (p.roleId == 2))).map((p) => (
                        <div key={p.playerId} className="col-6 col-md-4 col-lg-4 p-0 p-1">
                            <div className="card">
                                <img src={p.profile} alt={p.name} title={p.name} className="card-img-top" />
                                <div className="card-body border-top border-2 py-2">
                                    <p className="card-title fw-semibold text-center text-truncate m-0">{p.name}</p>
                                    {(p.captain && p.foreigner) ? <div className="m-2 position-absolute top-0 start-0"><img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="me-1" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" /></div> : ((p.captain) ? <img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="m-2 position-absolute top-0 start-0" /> : ((p.foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" className="m-2 position-absolute top-0 start-0" />))}
                                    {(p.wicketKeeper) && <img src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="Wicket Keeper Icon" className="m-2 position-absolute top-0 end-0" />}
                                </div>
                            </div>
                        </div>))}
                    <p className="fs-5 fw-bold m-0 py-1">Bowler</p>
                    {(squad) && squad.filter((p) => (((p.playerId) >= (tab * 11 + 1)) && ((p.playerId) <= (tab * 11 + 11)) && (p.roleId == 3))).map((p) => (
                        <div key={p.playerId} className="col-6 col-md-4 col-lg-4 p-0 p-1">
                            <div className="card">
                                <img src={p.profile} alt={p.name} title={p.name} className="card-img-top" />
                                <div className="card-body border-top border-2 py-2">
                                    <p className="card-title fw-semibold text-center text-truncate m-0">{p.name}</p>
                                    {(p.captain && p.foreigner) ? <div className="m-2 position-absolute top-0 start-0"><img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="me-1" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" /></div> : ((p.captain) ? <img src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="Captain Icon" className="m-2 position-absolute top-0 start-0" /> : ((p.foreigner) && <img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="Foreign Player Icon" className="m-2 position-absolute top-0 start-0" />))}
                                    {(p.wicketKeeper) && <img src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="Wicket Keeper Icon" className="m-2 position-absolute top-0 end-0" />}
                                </div>
                            </div>
                        </div>))}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default Squad;