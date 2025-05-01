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
            <div>
                <p>IPL - Squad</p>
            </div>
            <div>
                <button value={0} onClick={handleTabChange}>MI</button>
                <button value={1} onClick={handleTabChange}>CSK</button>
                <button value={2} onClick={handleTabChange}>RCB</button>
                <button value={3} onClick={handleTabChange}>KKR</button>
                <button value={4} onClick={handleTabChange}>DC</button>
                <button value={5} onClick={handleTabChange}>PBKS</button>
                <button value={6} onClick={handleTabChange}>RR</button>
                <button value={7} onClick={handleTabChange}>SRH</button>
                <button value={8} onClick={handleTabChange}>LSG</button>
                <button value={9} onClick={handleTabChange}>GT</button>
            </div>
            <div>
                <p>Batsman</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 1)).map((p) => (
                    //     <div class="card" style="width: 18rem;">
                    //     <img src="..." class="card-img-top" alt="...">
                    //     <div class="card-body">
                    //       <h5 class="card-title">Card title</h5>
                    //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    //       <a href="#" class="btn btn-primary">Go somewhere</a>
                    //     </div>
                    //   </div>
                    <div className='card' style={{ width: "18rem" }} key={p.playerId}>
                        <img className='card-img-top' src={p.profile} alt={p.name} />
                        <div className="card-body">
                            <h5 className='card-title text-center'>{p.name}</h5>
                            {(p.captain && p.wicketKeeper) ? <><img src='https://www.iplt20.com/assets/images/teams-captain-icon.svg' className='position-absolute top-0 p-3' /> <img src="https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg" className='position-absolute top-0 end-0 p-3' alt="" /></> : (p.captain) ? <img className='position-absolute' src='https://www.iplt20.com/assets/images/teams-captain-icon.svg' /> : (p.wicketKeeper) && <img  className='position-absolute top-0 p-3' src='https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg'/>}
                            {(p.foreigner) && <img src='https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg'  className='position-absolute top-0 end-0 p-3'/>}
                        </div>
                    </div>))}
                <p>All Rounder</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 2)).map((p) => (
                    <div key={p.playerId}>
                        <img src={p.profile} alt={p.name} />
                        <p>{p.name}</p>
                        {(p.captain && p.wicketKeeper) ? <p>C & WK</p> : (p.captain) ? <p>C</p> : (p.wicketKeeper) && <p>WK</p>}
                        {(p.foreigner) && <p>F</p>}
                    </div>))}
                <p>Bowler</p>
                {squad && squad.filter((p) => (p.playerId >= (tab * 11 + 1) && p.playerId <= (tab * 11 + 11) && p.roleId == 3)).map((p) => (
                    <div key={p.playerId}>
                        <img src={p.profile} alt={p.name} />
                        <p>{p.name}</p>
                        {(p.captain && p.wicketKeeper) ? <p>C & WK</p> : (p.captain) ? <p>C</p> : (p.wicketKeeper) && <p>WK</p>}
                        {(p.foreigner) && <p>F</p>}
                    </div>))}
            </div >
        </>
    );
}
export default Squad;