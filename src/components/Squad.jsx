import { useState, useEffect } from 'react';
function Squad() {
    const [squad, setSquad] = useState();
    const [tab, setTab] = useState(0);
    useEffect(() => {
        document.title = "IPL - Squad";
        const squad = JSON.parse(localStorage.getItem("squad"));
        setSquad(squad);
    }, []);
    function handleTabChange(e) {
        setTab(e.target.value);
    }
    return (
        <>
            <div className="row p-0 sticky-top" style={{ backgroundColor: "#009270" }}>
                <p className="col-12 text-light fs-5 fw-bolder m-0 sticky-top p-2 text-center">IPL - Squad</p>
                <div className='col-12 overflow-auto d-flex' style={{ scrollbarWidth: "none" }}>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 0 ? "border-bottom border-4 " : ""}`} value={0} onClick={handleTabChange}>MI</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 1 ? "border-bottom border-4 " : ""}`} value={1} onClick={handleTabChange}>CSK</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 2 ? "border-bottom border-4 " : ""}`} value={2} onClick={handleTabChange}>RCB</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 3 ? "border-bottom border-4 " : ""}`} value={3} onClick={handleTabChange}>KKR</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 4 ? "border-bottom border-4 " : ""}`} value={4} onClick={handleTabChange}>DC</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 5 ? "border-bottom border-4 " : ""}`} value={5} onClick={handleTabChange}>PBKS</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 6 ? "border-bottom border-4 " : ""}`} value={6} onClick={handleTabChange}>RR</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 7 ? "border-bottom border-4 " : ""}`} value={7} onClick={handleTabChange}>SRH</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 8 ? "border-bottom border-4 " : ""}`} value={8} onClick={handleTabChange}>LSG</button>
                    <button className={`mw-c btn border-0 text-light fw-semibold rounded-0 ${tab == 9 ? "border-bottom border-4 " : ""}`} value={9} onClick={handleTabChange}>GT</button>
                </div>
            </div>
            <div className='row p-2'>
                <p className='m-0 p-3 fs-5 fw-bold'>Batsman</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 1)).map((p) => (
                    <div className="col-6 col-md-4 col-lg-4 p-0 p-1" key={p.playerId}>
                        <div className='card'>
                            <img className='card-img-top' src={p.profile} alt={p.name} />
                            <div className="card-body border-top border-2">
                                <h6 className='card-title text-center m-0 text-truncate'>{p.name}</h6>
                                {(p.captain && p.foreigner) ? <div className='position-absolute top-0 start-0 m-2'><img className='me-1' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" /></div> : (p.captain) ? <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /> : (p.foreigner) && <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" />}
                                {(p.wicketKeeper) && <img className='position-absolute top-0 end-0 m-2' src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="" />}
                            </div>
                        </div>
                    </div>))}
                <p className='m-0 p-3 fs-5 fw-bold'>All Rounder</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 2)).map((p) => (
                    <div className="col-6 col-md-4 col-lg-4 p-0 p-1" key={p.playerId}>
                        <div className='card'>
                            <img className='card-img-top' src={p.profile} alt={p.name} />
                            <div className="card-body border-top border-2">
                                <h6 className='card-title text-center m-0 text-truncate'>{p.name}</h6>
                                {(p.captain && p.foreigner) ? <div className='position-absolute top-0 start-0 m-2'><img className='me-1' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" /></div> : (p.captain) ? <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /> : (p.foreigner) && <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" />}
                                {(p.wicketKeeper) && <img className='position-absolute top-0 end-0 m-2' src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="" />}
                            </div>
                        </div>
                    </div>))}
                <p className='m-0 p-3 fs-5 fw-bold'>Bowler</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 3)).map((p) => (
                    <div className="col-6 col-md-4 col-lg-4 p-0 p-1" key={p.playerId}>
                        <div className='card'>
                            <img className='card-img-top' src={p.profile} alt={p.name} />
                            <div className="card-body border-top border-2">
                                <h6 className='card-title text-center m-0 text-truncate'>{p.name}</h6>
                                {(p.captain && p.foreigner) ? <div className='position-absolute top-0 start-0 m-2'><img className='me-1' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /><img src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" /></div> : (p.captain) ? <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-captain-icon.svg" alt="" /> : (p.foreigner) && <img className='position-absolute top-0 start-0 m-2' src="https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg" alt="" />}
                                {(p.wicketKeeper) && <img className='position-absolute top-0 end-0 m-2' src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" alt="" />}
                            </div>
                        </div>
                    </div>))}
            </div >
        </>
    );
}
export default Squad;